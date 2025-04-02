import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import SimplePeer from 'simple-peer';

const AudioConferenceTest = () => {
  const [roomId, setRoomId] = useState('');
  const [isInRoom, setIsInRoom] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [isMuted, setIsMuted] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [localIP, setLocalIP] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  const socket = useRef(null);
  const localStream = useRef(null);
  const audioContext = useRef(null);
  const peers = useRef({});
  const audioChunks = useRef([]);
  const lastSentTime = useRef(0);
  const audioQueue = useRef([]);
  const isProcessingQueue = useRef(false);

  // Get local IP address
  useEffect(() => {
    const getLocalIP = async () => {
      try {
        window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
        const pc = new RTCPeerConnection({ iceServers: [] });
        pc.createDataChannel('');
        
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        
        pc.onicecandidate = (ice) => {
          if (ice && ice.candidate && ice.candidate.candidate) {
            const ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/;
            const match = ipRegex.exec(ice.candidate.candidate);
            if (match) {
              setLocalIP(match[1]);
              pc.onicecandidate = () => {};
            }
          }
        };
      } catch (err) {
        console.error("Failed to get local IP:", err);
      }
    };

    getLocalIP();
  }, []);

  // Check microphone permissions
  useEffect(() => {
    const checkMicPermission = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        console.log("Mic access granted");
      } catch (err) {
        console.error("Mic error:", err);
      }
    };

    checkMicPermission();
  }, []);

  // Initialize Socket.IO connection
  useEffect(() => {
    const serverUrl = 'http://192.168.227.4:5003';
    socket.current = io(serverUrl, {
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      transports: ['websocket']
    });
    
    const handleConnect = () => {
      console.log('Connected to server');
      setIsConnected(true);
    };
    
    const handleDisconnect = () => {
      console.log('Disconnected from server');
      setIsConnected(false);
    };
    
    const handleRoomCreated = (data) => {
      setRoomId(data.room_id);
      setIsInRoom(true);
      setParticipants([]);
    };
    
    const handleRoomJoined = (data) => {
      setRoomId(data.room_id);
      setIsInRoom(true);
      setParticipants(data.participants || []);
    };
    
    const handleNewParticipant = (data) => {
      setParticipants(prev => [...prev, data.participant_id]);
      initiatePeerConnection(data.participant_id);
    };
    
    const handleParticipantLeft = (data) => {
      setParticipants(prev => prev.filter(id => id !== data.participant_id));
      if (peers.current[data.participant_id]) {
        peers.current[data.participant_id].destroy();
        delete peers.current[data.participant_id];
      }
    };
    
    socket.current.on('connect', handleConnect);
    socket.current.on('disconnect', handleDisconnect);
    socket.current.on('room_created', handleRoomCreated);
    socket.current.on('room_joined', handleRoomJoined);
    socket.current.on('new_participant', handleNewParticipant);
    socket.current.on('participant_left', handleParticipantLeft);
    
    return () => {
      if (socket.current) {
        socket.current.off('connect', handleConnect);
        socket.current.off('disconnect', handleDisconnect);
        socket.current.off('room_created', handleRoomCreated);
        socket.current.off('room_joined', handleRoomJoined);
        socket.current.off('new_participant', handleNewParticipant);
        socket.current.off('participant_left', handleParticipantLeft);
        socket.current.disconnect();
      }
    };
  }, []);

  // Initialize audio context and processing
  useEffect(() => {
    if (!isInRoom) return;

    const initAudio = async () => {
      try {
        // Get user media with optimal settings
        const stream = await navigator.mediaDevices.getUserMedia({ 
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            sampleRate: 16000,
            channelCount: 1,
            autoGainControl: true
          },
          video: false
        });

        localStream.current = stream;
        
        try {
          // Initialize audio context
          audioContext.current = new (window.AudioContext || window.webkitAudioContext)({
            sampleRate: 16000,
            latencyHint: 'interactive'
          });
          
          // Some browsers start with context suspended
          if (audioContext.current.state === 'suspended') {
            await audioContext.current.resume();
          }

          // Create audio processing pipeline
          const source = audioContext.current.createMediaStreamSource(stream);
          const processor = audioContext.current.createScriptProcessor(1024, 1, 1);
          
          source.connect(processor);
          processor.connect(audioContext.current.destination);
          
          processor.onaudioprocess = (e) => {
            if (isMuted || !isInRoom || !socket.current) return;
            
            const inputData = e.inputBuffer.getChannelData(0);
            const volume = calculateVolume(inputData);
            setIsSpeaking(volume > 0.01);
            
            // Throttle audio sending to ~50 packets/sec
            const now = Date.now();
            if (now - lastSentTime.current < 20) return;
            lastSentTime.current = now;
            
            // Convert and send audio data
            const int16Data = floatTo16BitPCM(inputData);
            socket.current.emit('audio_data', {
              room_id: roomId,
              audio_data: Array.from(int16Data),
              timestamp: now
            });
          };
        } catch (err) {
          console.error("AudioContext error:", err);
          if (audioContext.current) {
            audioContext.current.close().catch(() => {});
          }
          audioContext.current = null;
        }
      } catch (err) {
        console.error("Audio initialization failed:", err);
      }
    };

    initAudio();

    return () => {
      // Cleanup audio resources
      if (localStream.current) {
        localStream.current.getTracks().forEach(track => track.stop());
      }
      if (audioContext.current && audioContext.current.state !== 'closed') {
        audioContext.current.close().catch(() => {});
      }
    };
  }, [isInRoom, isMuted, roomId]);

  // Handle incoming audio data
  useEffect(() => {
    if (!socket.current) return;

    const processAudioQueue = async () => {
      if (isProcessingQueue.current || audioQueue.current.length === 0) return;
      
      isProcessingQueue.current = true;
      const data = audioQueue.current.shift();
      
      try {
        if (!audioContext.current) {
          audioContext.current = new (window.AudioContext || window.webkitAudioContext)({
            sampleRate: 16000
          });
        }
        
        // Convert Int16 back to Float32
        const float32Data = new Float32Array(data.audio_data.length);
        for (let i = 0; i < data.audio_data.length; i++) {
          float32Data[i] = data.audio_data[i] / 32768.0;
        }

        // Create and play audio buffer
        const buffer = audioContext.current.createBuffer(1, float32Data.length, 16000);
        buffer.getChannelData(0).set(float32Data);
        
        const source = audioContext.current.createBufferSource();
        source.buffer = buffer;
        source.connect(audioContext.current.destination);
        source.start();
        
      } catch (err) {
        console.error("Audio playback error:", err);
      } finally {
        isProcessingQueue.current = false;
        if (audioQueue.current.length > 0) {
          setTimeout(processAudioQueue, 0);
        }
      }
    };

    const handleAudioData = (data) => {
      if (!data.audio_data || !Array.isArray(data.audio_data)) return;
      
      // Queue the audio data for processing
      audioQueue.current.push(data);
      
      if (!isProcessingQueue.current) {
        processAudioQueue();
      }
    };

    socket.current.on('audio_data', handleAudioData);
    
    return () => {
      if (socket.current) {
        socket.current.off('audio_data', handleAudioData);
      }
    };
  }, []);

  // Helper functions
  const calculateVolume = (input) => {
    let sum = 0;
    for (let i = 0; i < input.length; i++) {
      sum += Math.abs(input[i]);
    }
    return sum / input.length;
  };

  const floatTo16BitPCM = (input) => {
    const output = new Int16Array(input.length);
    for (let i = 0; i < input.length; i++) {
      const s = Math.max(-1, Math.min(1, input[i]));
      output[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
    }
    return output;
  };

  const initiatePeerConnection = (participantId) => {
    if (!localStream.current) return;
    
    const peer = new SimplePeer({
      initiator: true,
      trickle: false,
      stream: localStream.current
    });
    
    peer.on('signal', data => {
      if (socket.current) {
        socket.current.emit('audio_data', {
          room_id: roomId,
          audio_data: data,
          target: participantId
        });
      }
    });
    
    peer.on('stream', stream => {
      const audio = new Audio();
      audio.srcObject = stream;
      audio.play().catch(err => console.error("Audio play failed:", err));
    });
    
    peer.on('error', err => console.error("WebRTC error:", err));
    
    peers.current[participantId] = peer;
  };

  // Room management functions
  const handleCreateRoom = () => {
    if (socket.current) {
      socket.current.emit('create_room');
    }
  };

  const handleJoinRoom = () => {
    const roomId = prompt('Enter room ID:');
    if (roomId && socket.current) {
      socket.current.emit('join_room', { room_id: roomId });
    }
  };

  const handleLeaveRoom = () => {
    if (socket.current && roomId) {
      socket.current.emit('leave_room', { room_id: roomId });
    }
    setIsInRoom(false);
    setRoomId('');
    setParticipants([]);
    
    // Cleanup WebRTC connections
    Object.values(peers.current).forEach(peer => {
      try {
        peer.destroy();
      } catch (err) {
        console.error("Error destroying peer:", err);
      }
    });
    peers.current = {};
  };

  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };

  return (
    <div style={{ 
      padding: '20px', 
      maxWidth: '600px', 
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ color: '#2c3e50', textAlign: 'center' }}>Audio Conference</h1>
      
      <div style={{ 
        backgroundColor: '#f8f9fa',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginBottom: '20px'
      }}>
        <p style={{ marginBottom: '10px' }}>
          <strong>Status:</strong> 
          <span style={{ color: isConnected ? '#27ae60' : '#e74c3c', marginLeft: '5px' }}>
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </p>
        <p style={{ marginBottom: '20px' }}>
          <strong>Local IP:</strong> {localIP || 'Detecting...'}
        </p>

        {!isInRoom ? (
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={handleCreateRoom}
              disabled={!isConnected}
              style={{
                padding: '10px 15px',
                backgroundColor: '#3498db',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                flex: 1,
                opacity: isConnected ? 1 : 0.6
              }}
            >
              Create Room
            </button>
            <button
              onClick={handleJoinRoom}
              disabled={!isConnected}
              style={{
                padding: '10px 15px',
                backgroundColor: '#2ecc71',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                flex: 1,
                opacity: isConnected ? 1 : 0.6
              }}
            >
              Join Room
            </button>
          </div>
        ) : (
          <div>
            <h2 style={{ color: '#2c3e50', marginTop: '0' }}>Room: {roomId}</h2>
            <p><strong>Participants:</strong> {participants.length + 1}</p>
            
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '15px',
              margin: '20px 0'
            }}>
              <button
                onClick={toggleMute}
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: isMuted ? '#e74c3c' : '#2ecc71',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px'
                }}
              >
                {isMuted ? '🔇' : '🎤'}
              </button>
              
              <div style={{ flex: 1 }}>
                <div style={{
                  height: '10px',
                  backgroundColor: '#ecf0f1',
                  borderRadius: '5px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${isSpeaking ? '100%' : '0%'}`,
                    height: '100%',
                    backgroundColor: '#27ae60',
                    transition: 'width 0.1s ease'
                  }} />
                </div>
                <p style={{ 
                  marginTop: '5px', 
                  color: isMuted ? '#e74c3c' : '#27ae60',
                  fontWeight: 'bold'
                }}>
                  {isMuted ? 'Microphone Muted' : 'Microphone Active'}
                </p>
              </div>
            </div>
            
            <button
              onClick={handleLeaveRoom}
              style={{
                padding: '10px 15px',
                backgroundColor: '#e74c3c',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                width: '100%'
              }}
            >
              Leave Room
            </button>
          </div>
        )}
      </div>

      <div style={{ 
        backgroundColor: '#f8f9fa',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ marginTop: '0', color: '#2c3e50' }}>How to Use</h3>
        <ol style={{ paddingLeft: '20px' }}>
          <li style={{ marginBottom: '8px' }}>Make sure the server is running</li>
          <li style={{ marginBottom: '8px' }}>On one device, click "Create Room"</li>
          <li style={{ marginBottom: '8px' }}>On another device, click "Join Room" and enter the room ID</li>
          <li style={{ marginBottom: '8px' }}>Speak into your microphone - audio should come from the other device</li>
          <li>Use the mute button to toggle your microphone</li>
        </ol>
      </div>
    </div>
  );
};

export default AudioConferenceTest;