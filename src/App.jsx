import {PointerLockControls, Sky} from "@react-three/drei"
import {Physics, RigidBody} from "@react-three/rapier"
import {Ground} from "./Ground.jsx"

const App = () => {

  return (
    <>
      <PointerLockControls />
      <Sky sunPosition={[100, 20, 100]} />
      <ambientLight intensity={1.5} />
      <Physics gravity={[0, -20, 0]}>
        <Ground />
        <RigidBody>
          <mesh position={[0, 3, -5]}>
            <boxGeometry />
          </mesh>
        </RigidBody>
      </Physics>
    </>
  )
}

export default App
