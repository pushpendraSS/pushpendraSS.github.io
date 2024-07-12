import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const Basket = ({ position, onUpdate }) => {
  const basketRef = useRef();

  useFrame(() => {
    const basket = basketRef.current;
    if (basket) {
      basket.position.x = position;
      onUpdate(basket.position);
    }
  });

  return (
    <mesh ref={basketRef} position={[position, -3, 0]}>
      <boxGeometry args={[2, 1, 1]} />
      <meshStandardMaterial color='orange' />
    </mesh>
  );
};

export default Basket;
