import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Decal, OrbitControls, useTexture } from '@react-three/drei';

const LightBamboo = (props) => {
  const poleHeight = props?.poleHeight || 5;
  const poleRadius = props?.poleRadius || 0.1;
  const lampRadius = props?.lampRadius || 0.2;

  return (
    <group position={props?.position}>
      {/* Pole */}
      <mesh position={[0, poleHeight / 2, 0]}>
        <cylinderGeometry args={[poleRadius, poleRadius, poleHeight, 32]} />
        <meshStandardMaterial color={'gray'} />
      </mesh>

      {/* Lamp */}
      <mesh position={[0, poleHeight + lampRadius, 0]}>
        <sphereGeometry args={[lampRadius, 32, 32]} />
        <meshStandardMaterial emissive={'yellow'} emissiveIntensity={1} color={'white'} />
      </mesh>

      {/* Light */}
      <pointLight position={[0, poleHeight + lampRadius, 0]} intensity={1} />
    </group>
  );
};

export default LightBamboo;
