from flask import Flask,request, render_template
from flask_socketio import SocketIO, emit, join_room, leave_room
import uuid
import os
import numpy as np
from io import BytesIO
import time
app = Flask(__name__)
app.config['SECRET_KEY'] = os.urandom(24) 
socketio = SocketIO(app, cors_allowed_origins="*")

# In-memory storage for rooms and participants
rooms = {}  # Format: {room_id: {'participants': [socket_id1, socket_id2]}}


@app.route('/')
def index():
    return "Flask-SocketIO Server Running"

@socketio.on('connect')
def handle_connect():
    print(f'Client connected: {request.sid}')

@socketio.on('disconnect')
def handle_disconnect():
    print(f'Client disconnected: {request.sid}')
    # Remove participant from all rooms
    for room_id, room_data in rooms.items():
        if request.sid in room_data['participants']:
            room_data['participants'].remove(request.sid)
            emit('participant-left', {'participant_id': request.sid}, room=room_id)
            if not room_data['participants']:
                del rooms[room_id]

@socketio.on('create_room')
def handle_create_room():
    room_id = str(uuid.uuid4())[:6]
    rooms[room_id] = {'participants': [request.sid]}
    join_room(room_id)
    emit('room_created', {'room_id': room_id})

@socketio.on('join_room')
def handle_join_room(data):
    room_id = data.get('room_id')
    if room_id not in rooms:
        emit('error', {'message': 'Room not found'})
        return
    
    rooms[room_id]['participants'].append(request.sid)
    join_room(room_id)
    
    # Notify existing participants
    emit('new_participant', {'participant_id': request.sid}, room=room_id, include_self=False)
    
    # Send list of existing participants to the new joiner
    existing_participants = [pid for pid in rooms[room_id]['participants'] if pid != request.sid]
    emit('room_joined', {
        'room_id': room_id,
        'participants': existing_participants
    })

@socketio.on('leave_room')
def handle_leave_room(data):
    room_id = data.get('room_id')
    if room_id in rooms and request.sid in rooms[room_id]['participants']:
        rooms[room_id]['participants'].remove(request.sid)
        leave_room(room_id)
        emit('participant_left', {'participant_id': request.sid}, room=room_id)
        
        # Clean up empty rooms
        if not rooms[room_id]['participants']:
            del rooms[room_id]

@socketio.on('audio_data')
def handle_audio_data(data):
    room_id = data.get('room_id')
    if room_id not in rooms:
        return
    
    # Simple rate limiting (max 50 packets per second per client)
    now = time.time()
    sender = request.sid
    if hasattr(request, 'last_audio_time'):
        elapsed = now - request.last_audio_time
        if elapsed < 0.02:  # 50 packets/sec
            return
    request.last_audio_time = now
    
    # Validate audio data size
    audio_data = data.get('audio_data')
    if not audio_data or len(audio_data) > 4096:  # Max 4096 bytes
        return
    
    print(f"Received audio packet of size: {len(audio_data)} bytes from {sender[:6]}")
    
    # Broadcast to all other participants in the room
    emit('audio_data', {
        'sender_id': sender,
        'audio_data': audio_data,
        'timestamp': now
    }, room=room_id, include_self=False)
if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)