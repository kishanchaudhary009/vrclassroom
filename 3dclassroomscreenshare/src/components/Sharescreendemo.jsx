import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000"); // Change to your Flask server IP if needed

const ScreenShare = () => {
    const videoRef = useRef(null);
    const [streaming, setStreaming] = useState(false);

    useEffect(() => {
        if (!streaming) return;

        navigator.mediaDevices.getDisplayMedia({ video: true }).then((stream) => {
            videoRef.current.srcObject = stream;
            const videoTrack = stream.getVideoTracks()[0];
            const imageCapture = new ImageCapture(videoTrack);

            const sendFrame = async () => {
                try {
                    const bitmap = await imageCapture.grabFrame();
                    const canvas = document.createElement("canvas");
                    canvas.width = bitmap.width;
                    canvas.height = bitmap.height;
                    const ctx = canvas.getContext("2d");
                    ctx.drawImage(bitmap, 0, 0);
                    const imageData = canvas.toDataURL("image/jpeg", 0.5); // Compressing
                    socket.emit("send_frame", imageData);
                } catch (error) {
                    console.error("Error capturing frame: ", error);
                }
            };

            const interval = setInterval(sendFrame, 100); // 10 FPS
            videoTrack.onended = () => {
                clearInterval(interval);
                setStreaming(false);
            };
        });
    }, [streaming]);

    return (
        <div>
            <video ref={videoRef} autoPlay playsInline style={{ width: "100%" }} />
            <button onClick={() => setStreaming(!streaming)}>
                {streaming ? "Stop Sharing" : "Start Sharing"}
            </button>
        </div>
    );
};

export default ScreenShare;
