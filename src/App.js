import React, { useState, useRef, useEffect } from 'react';
import Game from './components/Game/Game';
import GroundPlane from './components/GroundPlane';
import ModalScene from './components/ModalScene';


function App() {

  const containerRef = useRef(null);

  useEffect(() => {
      if (containerRef.current) {
          new ModalScene(containerRef.current);
      }
  }, []);

  return (
    <>
      <div ref={containerRef} style={{ width: '100vw', height: '100vh' }}></div>
      {/* <GroundPlane /> */}
      {/* <div>
        <Game />
      </div> */}
    </>
  );
}

export default App;