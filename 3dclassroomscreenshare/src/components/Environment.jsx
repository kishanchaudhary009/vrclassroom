import React from 'react';
import { useGLTF } from '@react-three/drei';

const Environment = () => {
  // Load the GLB/GLTF model
  const { scene } = useGLTF('/models/classroom.glb');

  return (
    <primitive 
      object={scene} 
      position={[0, 0, 0]} // Adjust position if needed
      scale={[1, 1, 1]} // Adjust scale if needed
    />
  );
};

export default Environment;