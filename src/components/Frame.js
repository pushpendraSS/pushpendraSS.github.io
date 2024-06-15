import { MeshDiscardMaterial, MeshDistortMaterial, MeshPortalMaterial, MeshReflectorMaterial, MeshRefractionMaterial, MeshTransmissionMaterial, MeshWobbleMaterial } from "@react-three/drei";

const Frame = ({position = [0, 0, 0,], scale=0, args = [0,0,0], color='white', roomLight, updateStateFunction}) => {
    function clickCheck() {
        console.log("hello", roomLight)
        if(roomLight) {
            updateStateFunction();
        }
    }
    return (
        <mesh position={position} onClick={() => clickCheck()} >
        <boxGeometry attach="geometry" args={args}>
        </boxGeometry>
          <meshLambertMaterial color={color}/>
      </mesh>
    )
}

export default Frame;