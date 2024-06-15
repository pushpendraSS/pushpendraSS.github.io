import * as THREE from 'three'
import { useMemo, useContext, createContext, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, Merged, RenderTexture, PerspectiveCamera, Text } from '@react-three/drei';
THREE.ColorManagement.legacyMode = false

const context = createContext()
export function Instances({ children, ...props }) {
  const { nodes } = useGLTF('/computers_1-transformed.glb')
  const instances = useMemo(() => ({}), [nodes])
  return (
    <Merged castShadow receiveShadow meshes={instances} {...props}>
      {(instances) => <context.Provider value={instances} children={children} />}
    </Merged>
  )
}

export function Computers(props) {
  const { nodes: n, materials: m } = useGLTF('/computers_1-transformed.glb')
  const instances = useContext(context)
  return (
    <group {...props} dispose={null}>
      <ScreenText invert frame="Object_212" panel="Object_213" x={-5} y={5} position={[-2.73, 0.63, -0.52]} rotation={[0, 1.09, 0]} />
    </group>
  )
}

/* This component renders a monitor (taken out of the gltf model)
   It renders a custom scene into a texture and projects it onto monitors screen */
function Screen({ frame, panel, children, ...props }) {
  const { nodes, materials } = useGLTF('/computers_1-transformed.glb')
  return (
    <group {...props}>
      <mesh castShadow receiveShadow geometry={nodes[frame].geometry} material={materials.Texture} />
      <mesh geometry={nodes[panel].geometry}>
        <meshBasicMaterial toneMapped={false}>
          <RenderTexture width={512} height={512} attach="map" anisotropy={16}>
            {children}
          </RenderTexture>
        </meshBasicMaterial>
      </mesh>
    </group>
  )
}

/* Renders a monitor with some text */
function ScreenText({ invert, x = 0, y = 1.2, ...props }) {
  const textRef = useRef()
  const rand = Math.random() * 10000
  useFrame((state) => (textRef.current.position.x = x + Math.sin(rand + state.clock.elapsedTime / 4) * 8))
  return (
    <Screen {...props}>
      <PerspectiveCamera makeDefault manual aspect={1 / 1} position={[0, 0, 15]} />
      <color attach="background" args={[invert ? 'black' : '#35c19f']} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} />
      <Text font="/Inter-Medium.woff" position={[x, y, 0]} ref={textRef} fontSize={4} letterSpacing={-0.1} color={!invert ? 'black' : '#35c19f'}>
        Poimandres.
      </Text>
    </Screen>
  )
}
