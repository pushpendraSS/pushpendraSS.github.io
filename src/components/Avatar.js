import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Decal, useGLTF } from '@react-three/drei';

const Avatar = (props) => {
  const avatarRef = useRef();
  const { scene } = useGLTF(props?.url);
  const [position, setPosition] = useState(props?.position);
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });

  useFrame(() => {
    if (avatarRef.current) {
        // avatarRef.current.rotation.y += 0.01; // Rotate the avatar
        avatarRef.current.position.set(...position);
        avatarRef.current.rotation.x = rotation.x;
        avatarRef.current.rotation.y = rotation.y;
        avatarRef.current.rotation.z = rotation.z;
    }
  });

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleKeyDown = (event) => {
    switch (event.key) {
      case 'ArrowUp':
        setPosition((prev) => [prev[0], prev[1], prev[2] - 0.5]);
        setRotation((prev) => ({ ...prev, x: prev.x - 0.1 }));
        break;
      case 'ArrowDown':
        setPosition((prev) => [prev[0], prev[1], prev[2] + 0.5]);
        setRotation((prev) => ({ ...prev, x: prev.x + 0.1 }));
        break;
      case 'ArrowLeft':
        setPosition((prev) => [prev[0] - 0.5, prev[1], prev[2]]);
        setRotation((prev) => ({ ...prev, y: prev.y - 0.1 }));
        break;
      case 'ArrowRight':
        setPosition((prev) => [prev[0] + 0.5, prev[1], prev[2]]);
        setRotation((prev) => ({ ...prev, y: prev.y + 0.1 }));
        break;
      default:
        break;
    }
  };

  return (
    <mesh ref={avatarRef} scale={props?.scale} position={position}>
        {/* <Decal debug/> */}
      <primitive object={scene} />
    </mesh>
  );
};

export default Avatar;
