// // import React, { useState, useEffect } from "react";
// // import { Canvas, useFrame } from "@react-three/fiber";
// // import io from "socket.io-client";
// // import FPVControls from "./FPVControls";
// // import { Experience } from "./Experience";
// // import { Students3dmodel } from "./Students3dmodel";

// // // Connect to WebSocket server
// // const socket = io("http://localhost:5001");

// // function Classroomsinglecomponent() {
// //   const [cameraPosition, setCameraPosition] = useState([-15.59545429923497, 6.208550439204139, 16.367395684855122]);
// //   const fov = 50;
// //   const [students, setStudents] = useState([]);

// //   useEffect(() => {
// //     let studentId = localStorage.getItem("student_id");
// //     if (!studentId) {
// //       studentId = `student_${Math.floor(Math.random() * 10000)}`;
// //       localStorage.setItem("student_id", studentId);
// //     }

// //     socket.emit("join", { student_id: studentId });

// //     socket.on("all_students", (data) => {
// //       setStudents(
// //         Object.keys(data.students).map((id) => ({
// //           student_id: id,
// //           ...data.students[id],
// //         }))
// //       );
// //     });

// //     socket.on("update", (data) => {
// //       setStudents((prevStudents) => {
// //         const exists = prevStudents.find((s) => s.student_id === data.student_id);
// //         if (exists) {
// //           return prevStudents.map((s) =>
// //             s.student_id === data.student_id ? { ...s, ...data.position } : s
// //           );
// //         }
// //         return [...prevStudents, { student_id: data.student_id, ...data.position }];
// //       });
// //     });

// //     return () => {
// //       socket.off("update");
// //       socket.off("all_students");
// //     };
// //   }, []);

// //   function MovingStudents() {
// //     const currentStudentId = localStorage.getItem("student_id");
  
// //     return (
// //       <>
// //         {students
// //           .filter((student) => student.student_id !== currentStudentId) // Exclude current student
// //           .map((student) => (
// //             <Students3dmodel
// //               key={student.student_id}
// //               position={[student.x, student.y, student.z]}
              
// //             />
// //           ))}
// //       </>
// //     );
// //   }
  
// //   function CameraUpdater() {
// //     useFrame(({ camera }) => {
// //       const newPosition = [camera.position.x, camera.position.y, camera.position.z];

// //       if (
// //         newPosition[0] !== cameraPosition[0] ||
// //         newPosition[1] !== cameraPosition[1] ||
// //         newPosition[2] !== cameraPosition[2]
// //       ) {
// //         setCameraPosition(newPosition);
// //         socket.emit("update_camera_position", {
// //           student_id: localStorage.getItem("student_id"),
// //           x: newPosition[0],
// //           y: 1,
// //           z: newPosition[2],
// //         });
// //       }
// //     });

// //     return null;
// //   }

// //   return (
// //     <>
// //       <Canvas
// //         camera={{ position: cameraPosition, fov: fov }}
// //         gl={{ alpha: false }}
// //         onCreated={({ gl }) => {
// //           gl.setClearColor("#fbfae1");
// //         }}
// //       >
// //         <ambientLight intensity={1.1} />
// //         <pointLight position={[10, 10, 10]} intensity={0.6} />

// //         <Experience />
// //         <MovingStudents />
// //         <CameraUpdater />

// //         <FPVControls />
// //       </Canvas>
// //     </>
// //   );
// // }

// // export default Classroomsinglecomponent;


// import React, { useState, useEffect } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import io from "socket.io-client";
// import FPVControls from "./FPVControls";
// import { Experience } from "./Experience";
// import { Students3dmodel } from "./Students3dmodel";

// // Connect to WebSocket servers
// const movementSocket = io("http://localhost:5001");
// const audioSocket = io("http://localhost:5002");

// function Classroomsinglecomponent() {
//   const [cameraPosition, setCameraPosition] = useState([-15.59545429923497, 6.208550439204139, 16.367395684855122]);
//   const fov = 50;
//   const [students, setStudents] = useState([]);
//   const [isRecording, setIsRecording] = useState(false);
//   let mediaRecorder;

//   useEffect(() => {
//     let studentId = localStorage.getItem("student_id");
//     if (!studentId) {
//       studentId = `student_${Math.floor(Math.random() * 10000)}`;
//       localStorage.setItem("student_id", studentId);
//     }

//     movementSocket.emit("join", { student_id: studentId });

//     movementSocket.on("all_students", (data) => {
//       setStudents(
//         Object.keys(data.students).map((id) => ({
//           student_id: id,
//           ...data.students[id],
//         }))
//       );
//     });

//     movementSocket.on("update", (data) => {
//       setStudents((prevStudents) => {
//         const exists = prevStudents.find((s) => s.student_id === data.student_id);
//         if (exists) {
//           return prevStudents.map((s) =>
//             s.student_id === data.student_id ? { ...s, ...data.position } : s
//           );
//         }
//         return [...prevStudents, { student_id: data.student_id, ...data.position }];
//       });
//     });

//     return () => {
//       movementSocket.off("update");
//       movementSocket.off("all_students");
//     };
//   }, []);

//   function MovingStudents() {
//     const currentStudentId = localStorage.getItem("student_id");

//     return (
//       <>
//         {students
//           .filter((student) => student.student_id !== currentStudentId) // Exclude current student
//           .map((student) => (
//             <Students3dmodel
//               key={student.student_id}
//               position={[student.x, student.y, student.z]}
//             />
//           ))}
//       </>
//     );
//   }

//   function CameraUpdater() {
//     useFrame(({ camera }) => {
//       const newPosition = [camera.position.x, camera.position.y, camera.position.z];

//       if (
//         newPosition[0] !== cameraPosition[0] ||
//         newPosition[1] !== cameraPosition[1] ||
//         newPosition[2] !== cameraPosition[2]
//       ) {
//         setCameraPosition(newPosition);
//         movementSocket.emit("update_camera_position", {
//           student_id: localStorage.getItem("student_id"),
//           x: newPosition[0],
//           y: 1,
//           z: newPosition[2],
//         });
//       }
//     });
//     return null;
//   }

//   const startRecording = async () => {
//     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//     mediaRecorder = new MediaRecorder(stream);
//     mediaRecorder.ondataavailable = (event) => {
//       if (event.data.size > 0) {
//         audioSocket.emit("audio_data", { audio_data: event.data });
//       }
//     };
//     mediaRecorder.start(100); // Send data every 100ms
//     setIsRecording(true);
//   };

//   const stopRecording = () => {
//     if (mediaRecorder) {
//       mediaRecorder.stop();
//       setIsRecording(false);
//     }
//   };

//   return (
//     <>
//       <button onClick={startRecording} disabled={isRecording}>Start Mic</button>
//       <button onClick={stopRecording} disabled={!isRecording}>Stop Mic</button>

//       <Canvas
//         camera={{ position: cameraPosition, fov: fov }}
//         gl={{ alpha: false }}
//         onCreated={({ gl }) => {
//           gl.setClearColor("#fbfae1");
//         }}
//       >
//         <ambientLight intensity={1.1} />
//         <pointLight position={[10, 10, 10]} intensity={0.6} />

//         <Experience />
//         <MovingStudents />
//         <CameraUpdater />

//         <FPVControls />
//       </Canvas>
//     </>
//   );
// }

// export default Classroomsinglecomponent;


import React, { useState, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import io from "socket.io-client";
import FPVControls from "./FPVControls";
import { Experience } from "./Experience";
import { Students3dmodel } from "./Students3dmodel";

// Connect to WebSocket servers
const movementSocket = io("http://localhost:5001");
const audioSocket = io("http://localhost:5002");

function Classroomsinglecomponent() {
  const [cameraPosition, setCameraPosition] = useState([-15.59545429923497, 6.208550439204139, 16.367395684855122]);
  const fov = 50;
  const [students, setStudents] = useState([]);
  const [isMicOn, setIsMicOn] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  const audioContextRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const audioProcessorRef = useRef(null);
  const lastSentTimeRef = useRef(0);
  const audioQueueRef = useRef([]);
  const isProcessingQueueRef = useRef(false);

  useEffect(() => {
    let studentId = localStorage.getItem("student_id");
    if (!studentId) {
      studentId = `student_${Math.floor(Math.random() * 10000)}`;
      localStorage.setItem("student_id", studentId);
    }

    movementSocket.emit("join", { student_id: studentId });

    movementSocket.on("all_students", (data) => {
      setStudents(
        Object.keys(data.students).map((id) => ({
          student_id: id,
          ...data.students[id],
        }))
      );
    });

    movementSocket.on("update", (data) => {
      setStudents((prevStudents) => {
        const exists = prevStudents.find((s) => s.student_id === data.student_id);
        if (exists) {
          return prevStudents.map((s) =>
            s.student_id === data.student_id ? { ...s, ...data.position } : s
          );
        }
        return [...prevStudents, { student_id: data.student_id, ...data.position }];
      });
    });

    // Audio socket handlers
    audioSocket.on("audio_data", handleIncomingAudio);
    audioSocket.on("new_participant", handleNewParticipant);
    audioSocket.on("participant_left", handleParticipantLeft);

    return () => {
      movementSocket.off("update");
      movementSocket.off("all_students");
      audioSocket.off("audio_data", handleIncomingAudio);
      audioSocket.off("new_participant", handleNewParticipant);
      audioSocket.off("participant_left", handleParticipantLeft);
      
      // Clean up audio resources
      stopAudioProcessing();
    };
  }, []);

  const handleNewParticipant = (data) => {
    console.log("New participant joined:", data.participant_id);
  };

  const handleParticipantLeft = (data) => {
    console.log("Participant left:", data.participant_id);
  };

  const handleIncomingAudio = async (data) => {
    if (!data.audio_data || !Array.isArray(data.audio_data)) return;
    
    // Queue the audio data for processing
    audioQueueRef.current.push(data);
    
    if (!isProcessingQueueRef.current) {
      processAudioQueue();
    }
  };

  const processAudioQueue = async () => {
    if (isProcessingQueueRef.current || audioQueueRef.current.length === 0) return;
    
    isProcessingQueueRef.current = true;
    const data = audioQueueRef.current.shift();
    
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)({
          sampleRate: 16000
        });
      }
      
      // Convert Int16 back to Float32
      const float32Data = new Float32Array(data.audio_data.length);
      for (let i = 0; i < data.audio_data.length; i++) {
        float32Data[i] = data.audio_data[i] / 32768.0;
      }

      // Create and play audio buffer
      const buffer = audioContextRef.current.createBuffer(1, float32Data.length, 16000);
      buffer.getChannelData(0).set(float32Data);
      
      const source = audioContextRef.current.createBufferSource();
      source.buffer = buffer;
      source.connect(audioContextRef.current.destination);
      source.start();
      
    } catch (err) {
      console.error("Audio playback error:", err);
    } finally {
      isProcessingQueueRef.current = false;
      if (audioQueueRef.current.length > 0) {
        setTimeout(processAudioQueue, 0);
      }
    }
  };

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

  const startAudioProcessing = async () => {
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

      mediaStreamRef.current = stream;
      
      try {
        // Initialize audio context
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)({
          sampleRate: 16000,
          latencyHint: 'interactive'
        });
        
        // Some browsers start with context suspended
        if (audioContextRef.current.state === 'suspended') {
          await audioContextRef.current.resume();
        }

        // Create audio processing pipeline
        const source = audioContextRef.current.createMediaStreamSource(stream);
        const processor = audioContextRef.current.createScriptProcessor(1024, 1, 1);
        
        source.connect(processor);
        processor.connect(audioContextRef.current.destination);
        
        processor.onaudioprocess = (e) => {
          if (!isMicOn || !audioSocket.connected) return;
          
          const inputData = e.inputBuffer.getChannelData(0);
          const volume = calculateVolume(inputData);
          setIsSpeaking(volume > 0.01);
          
          // Throttle audio sending to ~50 packets/sec
          const now = Date.now();
          if (now - lastSentTimeRef.current < 20) return;
          lastSentTimeRef.current = now;
          
          // Convert and send audio data
          const int16Data = floatTo16BitPCM(inputData);
          audioSocket.emit('audio_data', {
            audio_data: Array.from(int16Data),
            timestamp: now
          });
        };

        audioProcessorRef.current = processor;
      } catch (err) {
        console.error("AudioContext error:", err);
        stopAudioProcessing();
      }
    } catch (err) {
      console.error("Audio initialization failed:", err);
      stopAudioProcessing();
    }
  };

  const stopAudioProcessing = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    
    if (audioProcessorRef.current) {
      audioProcessorRef.current.disconnect();
      audioProcessorRef.current = null;
    }
    
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
    
    setIsSpeaking(false);
  };

  const toggleMicrophone = async () => {
    if (isMicOn) {
      stopAudioProcessing();
      setIsMicOn(false);
    } else {
      setIsMicOn(true);
      await startAudioProcessing();
    }
  };

  function MovingStudents() {
    const currentStudentId = localStorage.getItem("student_id");

    return (
      <>
        {students
          .filter((student) => student.student_id !== currentStudentId) // Exclude current student
          .map((student) => (
            <Students3dmodel
              key={student.student_id}
              position={[student.x, student.y, student.z]}
            />
          ))}
      </>
    );
  }

  function CameraUpdater() {
    useFrame(({ camera }) => {
      const newPosition = [camera.position.x, camera.position.y, camera.position.z];

      if (
        newPosition[0] !== cameraPosition[0] ||
        newPosition[1] !== cameraPosition[1] ||
        newPosition[2] !== cameraPosition[2]
      ) {
        setCameraPosition(newPosition);
        movementSocket.emit("update_camera_position", {
          student_id: localStorage.getItem("student_id"),
          x: newPosition[0],
          y: 1,
          z: newPosition[2],
        });
      }
    });
    return null;
  }

  return (
    <>
      <button 
        onClick={toggleMicrophone} 
        style={{
          backgroundColor: isMicOn ? (isSpeaking ? '#27ae60' : '#ff4444') : '#4CAF50',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '16px',
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 1000
        }}
      >
        {isMicOn ? (isSpeaking ? 'Speaking...' : 'Mic On') : 'Mic Off'}
      </button>

      <Canvas
        camera={{ position: cameraPosition, fov: fov }}
        gl={{ alpha: false }}
        onCreated={({ gl }) => {
          gl.setClearColor("#fbfae1");
        }}
      >
        <ambientLight intensity={1.1} />
        <pointLight position={[10, 10, 10]} intensity={0.6} />

        <Experience />
        <MovingStudents />
        <CameraUpdater />

        <FPVControls />
      </Canvas>
    </>
  );
}

export default Classroomsinglecomponent;