export const WeaponModel = (props) => {
  return (
    <group {...props} dispose={null}>
      <mesh castShadow={true} receiveShadow={true} scale={.25}>
        <meshStandardMaterial color="red" />
        <boxGeometry />
      </mesh>
    </group>
  )
}
