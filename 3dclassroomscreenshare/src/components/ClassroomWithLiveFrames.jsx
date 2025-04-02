import React, { useState, useEffect } from "react";
import { Canvas } from '@react-three/fiber';
import { Final_Classroom } from './Final_Classroom';
import io from "socket.io-client";

const socket = io("http://localhost:5000");

export function ClassroomWithLiveFrames() {
    const [frame, setFrame] = useState(null);

    useEffect(() => {
        socket.on("receive_frame", (data) => {
            setFrame(data);
        });

        return () => socket.off("receive_frame");
    }, []);

    return (
        <Canvas>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Final_Classroom frame={frame} />
        </Canvas>
    );
}