import { Environment, Circle, Billboard, useTexture, BakeShadows } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import React, { useRef } from "react"

export default function LightSource() {
  const sunTexture = useTexture("/lensflare0.png")
  const sunLight = useRef()

  useFrame(({ clock }) => {
    sunLight.current.rotation.z += 0.003
  })
  return (
    <>
      <Billboard position={[15, 20, -40]}>
        <Circle ref={sunLight} scale={42}>
          <meshStandardMaterial map={sunTexture} alphaToCoverage emissive="#fff29c" color="yellow" transparent fog={false} />
        </Circle>
      </Billboard>
      <directionalLight castShadow color="orange" position={[7, 25, -20]} intensity={6.2} shadowMapHeight={256} shadowMapWidth={256} shadow-bias={-0.006} shadow-normalBias={0.01}>
        <orthographicCamera attach="shadow-camera" args={[-25, 25, -25, 25, 0.1, 50]} />
      </directionalLight>
      <ambientLight color={"lightblue"} intensity={0.9} />
      <Environment preset="sunset" resolution={256} />

      <BakeShadows />
    </>
  )
}
