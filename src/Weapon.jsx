import * as THREE from "three"
import * as TWEEN from "@tweenjs/tween.js"
import {useCallback, useEffect, useRef, useState} from "react"
import {useFrame} from "@react-three/fiber"
import {WeaponModel} from "./WeaponModel.jsx"

const recoilAmount = 0.03
const recoilDuration = 100
const easing = TWEEN.Easing.Quadratic.Out

export const Weapon = (props) => {
  const weaponRef = useRef()
  const [isShooting, setIsShooting] = useState(false)
  const [recoilAnimation, setRecoilAnimation] = useState(null)
  const [, setRecoilBackAnimation] = useState(null)

  useEffect(() => {
    document.addEventListener('mousedown', () => {
      setIsShooting(true);
    })

    document.addEventListener('mouseup', () => {
      setIsShooting(false);
    })
  }, [])

  const generateRecoilOffset = () => {
    return new THREE.Vector3(
      Math.random() * recoilAmount,
      Math.random() * recoilAmount,
      Math.random() * recoilAmount,
    )
  }

  const initRecoilAnimation = useCallback(() => {
    const generateNewPositionOfRecoil = (currentPosition) => {
      const recoilOffset = generateRecoilOffset()
      return currentPosition.clone().add(recoilOffset)
    }

    const currentPosition = new THREE.Vector3(0, 0, 0)
    const initialPosition = new THREE.Vector3(0, 0, 0)
    const newPosition = generateNewPositionOfRecoil(currentPosition)

    const twRecoilAnimation = new TWEEN.Tween(currentPosition)
      .to(newPosition, recoilDuration)
      .easing(easing)
      .onUpdate(() => {
        weaponRef.current?.position.copy(currentPosition)
      })

    const twRecoilBackAnimation = new TWEEN.Tween(currentPosition)
      .to(initialPosition, recoilDuration)
      .easing(easing)
      .onUpdate(() => {
        weaponRef.current?.position.copy(currentPosition);
      })

    twRecoilAnimation.chain(twRecoilBackAnimation)

    setRecoilAnimation(twRecoilAnimation)
    setRecoilBackAnimation(twRecoilBackAnimation)
  }, [])

  const startShooting = useCallback(() => {
    recoilAnimation.start()
  }, [recoilAnimation])

  useEffect(() => {
    initRecoilAnimation()

    if (isShooting) {
      startShooting()
    }
  }, [initRecoilAnimation, isShooting, startShooting])

  useFrame(() => {
    TWEEN.update()

    if (isShooting) {
      startShooting()
    }
  })

  return (
    <group {...props}>
      <group ref={weaponRef}>
        <WeaponModel />
      </group>
    </group>
  )
}
