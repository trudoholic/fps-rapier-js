import {Sky} from "@react-three/drei"
import {Ground} from "./Ground.jsx"

const App = () => {

  return (
    <>
      <Sky sunPosition={[100, 20, 100]} />
      <Ground />
    </>
  )
}

export default App
