import React, { useState, useEffect } from 'react';
import GameScene from './GameScene';

const Game = () => {
  const [basketPosition, setBasketPosition] = useState(0);
  const [fallingObjects, setFallingObjects] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const x = (Math.random() - 0.5) * 10;
      setFallingObjects((prev) => [...prev, { id: Date.now(), x }]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <GameScene
      basketPosition={basketPosition}
      setBasketPosition={setBasketPosition}
      fallingObjects={fallingObjects}
      setFallingObjects={setFallingObjects}
    />
  );
};

export default Game;
