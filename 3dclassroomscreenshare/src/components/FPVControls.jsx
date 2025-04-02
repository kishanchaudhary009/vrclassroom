// import React, { useEffect, useRef } from 'react';
// import { useThree, useFrame } from '@react-three/fiber';
// import { PointerLockControls } from '@react-three/drei';
// import * as THREE from 'three';

// const FPVControls = () => {
//   const { camera } = useThree();
//   const moveForward = useRef(false);
//   const moveBackward = useRef(false);
//   const moveLeft = useRef(false);
//   const moveRight = useRef(false);
//   const velocity = new THREE.Vector3();
//   const direction = new THREE.Vector3();
//   const moveSpeed = 0.1;



//   // Update camera position based on movement
//   useFrame(() => {
//     direction.z = Number(moveForward.current) - Number(moveBackward.current);
//     direction.x = Number(moveRight.current) - Number(moveLeft.current);
//     direction.normalize(); // Ensure consistent movement in all directions

//     velocity.x -= velocity.x * 0.1;
//     velocity.z -= velocity.z * 0.1;
//     velocity.y = 0; // Disable vertical movement

//     if (moveForward.current || moveBackward.current) velocity.z -= direction.z * moveSpeed;
//     if (moveLeft.current || moveRight.current) velocity.x -= direction.x * moveSpeed;

//     camera.translateX(velocity.x);
//     camera.translateZ(velocity.z);
//   });

//   return <PointerLockControls />;
// };

// export default FPVControls;

import React, { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { PointerLockControls } from '@react-three/drei';
import * as THREE from 'three';

const FPVControls = () => {
  const { camera } = useThree();
  const movement = useRef({ forward: false, backward: false, left: false, right: false });

  const velocity = new THREE.Vector3();
  const direction = new THREE.Vector3();
  const moveSpeed = 1;

  // Handle key press events
  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case "w": movement.current.forward = true; break;
        case "s": movement.current.backward = true; break;
        case "d": movement.current.left = true; break;
        case "a": movement.current.right = true; break;
      }
      console.log([camera.position.x,camera.position.y,camera.position.z]);
      
    };

    const handleKeyUp = (event) => {
      switch (event.key) {
        case "w": movement.current.forward = false; break;
        case "s": movement.current.backward = false; break;
        case "d": movement.current.left = false; break;
        case "a": movement.current.right = false; break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Camera movement logic
  useFrame(() => {
    direction.z = Number(movement.current.forward) - Number(movement.current.backward);
    direction.x = Number(movement.current.right) - Number(movement.current.left);
    direction.normalize(); // Smooth movement in diagonal directions

    velocity.x -= velocity.x * 0.1; // Damping for smoother stop
    velocity.z -= velocity.z * 0.1;
    velocity.y = 0; // Disable vertical movement

    if (movement.current.forward || movement.current.backward) {
      velocity.z -= direction.z * moveSpeed;
    }
    if (movement.current.left || movement.current.right) {
      velocity.x -= direction.x * moveSpeed;
    }

    camera.translateX(velocity.x);
    camera.translateZ(velocity.z);
  });

  return <PointerLockControls />;
};

export default FPVControls;