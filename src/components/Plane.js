

const Plane = ({position = [0, 0, 0,], scale=0, args = [0,0,0], color='#51bdc4'}) => {
    return (
      <mesh position={position}>
        <boxGeometry attach="geometry" args={args}>
        </boxGeometry>
          <meshLambertMaterial attach="material" color={color}></meshLambertMaterial>
      </mesh>
    )
}

export default Plane;