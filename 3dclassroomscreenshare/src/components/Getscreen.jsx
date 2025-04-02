import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000"); // Change to your Flask server IP if needed

const FrameReceiver = () => {
    const [frame, setFrame] = useState(null);

    useEffect(() => {
        socket.on("receive_frame", (data) => {
            setFrame(data);
        });

        return () => socket.off("receive_frame");
    }, []);

    return (
        <div>
            <h2>Live Screen Share</h2>
            {frame ? (
                <img src={frame} alt="Live Frame" style={{ width: "100%", border: "1px solid #ccc" }} />
            ) : (
                <p>Waiting for frames...</p>
            )}
        </div>
    );
};

export default FrameReceiver;
