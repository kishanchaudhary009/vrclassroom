import {
  CameraControls,
  ContactShadows,
  Environment,
  Text,
} from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import { useChat } from "../hooks/useChat";
//import { Avatar } from "./Avatar";
import { Final_Classroom } from "./Final_Classroom";
import { VideoClassroom } from "./Video_Classroom";

import io from "socket.io-client";
const socket = io("http://localhost:5000"); // Change to your Flask server IP if needed

const Dots = (props) => {
  const { loading } = useChat();
  const [loadingText, setLoadingText] = useState("");
  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setLoadingText((loadingText) => {
          if (loadingText.length > 2) {
            return ".";
          }
          return loadingText + ".";
        });
      }, 800);
      return () => clearInterval(interval);
    } else {
      setLoadingText("");
    }
  }, [loading]);
  if (!loading) return null;
  return (
    <group {...props}>
      <Text fontSize={0.14} anchorX={"left"} anchorY={"bottom"}>
        {loadingText}
        <meshBasicMaterial attach="material" color="black" />
      </Text>
    </group>
  );
};

export const Experience = () => {

  const [currentFrame, setCurrentFrame] = useState(null);

  useEffect(() => {
    // Set up socket event listener for receiving frames
    socket.on('receive_frame', (data) => {
      setCurrentFrame(data); // Assuming data contains the frame information
    });

    // Clean up the socket connection when component unmounts
    return () => {
      socket.off('receive_frame');
    };
  }, []);

  return (
    <>
      <Environment preset="sunset" />
      {/* Wrapping Dots into Suspense to prevent Blink when Troika/Font is loaded */}
      <Suspense>
        <Dots position-y={1.75} position-x={-0.02} />
      </Suspense>
      <Final_Classroom frame={currentFrame} />
    </>
  );
};
