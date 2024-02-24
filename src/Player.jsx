import * as THREE from "three"
import * as RAPIER from "@dimforge/rapier3d-compat"
import {useRef} from "react"
import {useFrame} from "@react-three/fiber"
import {RigidBody, useRapier} from "@react-three/rapier"
import {usePersonControls} from "./hooks.js"

const MOVE_SPEED = 5
const direction = new THREE.Vector3()
const frontVector = new THREE.Vector3()
const sideVector = new THREE.Vector3()

export const Player = () => {
  const playerRef = useRef()
  const { forward, backward, left, right, jump } = usePersonControls()
  const rapier = useRapier()

  useFrame((state) => {
    if (!playerRef?.current) return

    // moving player
    const velocity = playerRef.current?.linvel()

    frontVector.set(0, 0, backward - forward)
    sideVector.set(left - right, 0, 0)
    direction.subVectors(frontVector, sideVector).normalize()
      .multiplyScalar(MOVE_SPEED).applyEuler(state.camera.rotation)

    playerRef.current?.wakeUp()
    playerRef.current?.setLinvel({ x: direction.x, y: velocity.y, z: direction.z })

    // jumping
    const world = rapier.world
    const ray = world.castRay(
      new RAPIER.Ray(playerRef.current?.translation(), { x: 0, y: -1, z: 0 }), 4.0, true
    )
    const grounded = ray && ray.collider && Math.abs(ray.toi) <= 1.5

    if (jump && grounded) doJump()

    // moving camera
    const translation = playerRef.current?.translation()
    const {x, y, z} = translation
    state.camera.position.set(x, y, z)
  })

  const doJump = () => {
    playerRef.current?.setLinvel({x: 0, y: 8, z: 0});
  }

  return (
    <>
      <RigidBody position={[0, 1, -2]} ref={playerRef}>
        <mesh>
          <capsuleGeometry args={[0.75, 0.5]}/>
        </mesh>
      </RigidBody>
    </>
  )
}
