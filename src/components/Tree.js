const Tree = () => {
    return (
      <>
        {/* Tree trunk */}
        <mesh position={[0, 1, 0]}>
          <cylinderBufferGeometry args={[0.5, 0.5, 2, 32]} />
          <meshBasicMaterial color={0x8B4513} />
        </mesh>
  
        {/* Tree leaves */}
        <mesh position={[0, 3, 0]}>
          <coneBufferGeometry args={[1.5, 3, 32]} />
          <meshBasicMaterial color={0x00FF00} />
        </mesh>
      </>
    );
}

export default Tree;