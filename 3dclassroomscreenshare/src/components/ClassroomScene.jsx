import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { New_classroom } from "./New_classroom"; // Adjust the import path as needed
import FPVControls from "./FPVControls";
export default function ClassroomScene() {
  return (
    <Canvas
      camera={{ position: [0, 10, 20], fov: 50 }} // Adjust camera position and field of view
      shadows // Enable shadows
    >
      {/* Lighting */}
      <ambientLight intensity={0.5} /> {/* Soft ambient light */}
      <pointLight position={[10, 10, 10]} intensity={0.8} castShadow /> {/* Main light source */}

      {/* Environment */}
      <Environment preset="sunset" /> {/* Add a background environment */}
      <FPVControls />
      {/* Camera Controls */}
      <OrbitControls
        enablePan={true} // Allow panning
        enableZoom={true} // Allow zooming
        enableRotate={true} // Allow rotation
      />

      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#cccccc" />
      </mesh>

      {/* Suspense for loading the classroom model */}
      <Suspense fallback={null}>
        <New_classroom />
      </Suspense>
    </Canvas>
  );
}