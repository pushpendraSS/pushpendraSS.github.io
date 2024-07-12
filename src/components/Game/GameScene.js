import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Basket from './Basket';
import FallingObject from './FallingObject';

const GameScene = ({ basketPosition, setBasketPosition, fallingObjects, setFallingObjects }) => {
  const handleCatch = (position) => {
    setFallingObjects((prev) =>
      prev.filter((obj) => obj.id !== position.id)
    );
  };

  const handleMouseMove = (event) => {
    const x = (event.clientX / window.innerWidth) * 10 - 5;
    setBasketPosition(x);
  };

  return (
    <Canvas onMouseMove={handleMouseMove}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Basket position={basketPosition} onUpdate={() => {}} />
      {fallingObjects.map((obj) => (
        <FallingObject
          key={obj.id}
          position={[obj.x, 5, 0]}
          onCatch={handleCatch}
        />
      ))}
      <OrbitControls />
    </Canvas>
  );
};

export default GameScene;
