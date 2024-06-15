
const Window = ({position = [0, 0, 0,], scale=0, args = [0,0,0], color='#51bdc4'}) => {
    return (
        <mesh position={position} transparent opacity={0.1}>
        <boxGeometry attach="geometry" args={args}>
        </boxGeometry>
          <meshPhongMaterial color={'#ff0000'} opacity={0.5}></meshPhongMaterial>
      </mesh>
    )
}

export default Window;