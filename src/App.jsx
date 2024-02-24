import {PointerLockControls, Sky} from "@react-three/drei"
import {Physics} from "@react-three/rapier"
import {Ground} from "./Ground.jsx"
import {Player} from "./Player.jsx"
import {Cubes} from "./Cube.jsx"
import {WeaponModel} from "./WeaponModel.jsx"

const App = () => {

  return (
    <>
      <PointerLockControls />
      <Sky sunPosition={[100, 20, 100]} />
      <ambientLight intensity={1.5} />

      <Physics gravity={[0, -20, 0]}>
        <Ground />
        <Player />
        <Cubes />
      </Physics>

      <group position={[0, 3, 0]}>
        <WeaponModel />
      </group>
    </>
  )
}

export default App
