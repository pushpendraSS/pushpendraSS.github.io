import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';

const FallingObject = ({ position, onCatch }) => {
  const objectRef = useRef();
  const [isCaught, setIsCaught] = useState(false);

  useFrame(() => {
    const object = objectRef.current;
    if (object && !isCaught) {
      object.position.y -= 0.1;

      if (object.position.y < -3.5) {
        onCatch(object.position);
        setIsCaught(true);
      }
    }
  });

  return (
    !isCaught && (
      <mesh ref={objectRef} position={position}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color='red' />
      </mesh>
    )
  );
};

export default FallingObject;
