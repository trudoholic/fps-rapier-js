import {useFrame} from "@react-three/fiber"
import {PointerLockControls, Sky} from "@react-three/drei"
import {Physics} from "@react-three/rapier"
import * as TWEEN from "@tweenjs/tween.js"
import {Ground} from "./Ground.jsx"
import {Player} from "./Player.jsx"
import {Cubes} from "./Cube.jsx"

const shadowOffset = 50

const App = () => {
  useFrame(() => {
    TWEEN.update()
  })

  return (
    <>
      <PointerLockControls />
      <Sky sunPosition={[100, 20, 100]} />
      <ambientLight intensity={1.5} />
      <directionalLight
        castShadow={true}
        intensity={1.5}
        position={[100, 100, 0]}
        shadow-mapSize={4096}
        shadow-camera-top={shadowOffset}
        shadow-camera-bottom={-shadowOffset}
        shadow-camera-left={shadowOffset}
        shadow-camera-right={-shadowOffset}
      />

      <Physics gravity={[0, -20, 0]}>
        <Ground />
        <Player />
        <Cubes />
      </Physics>
    </>
  )
}

export default App
