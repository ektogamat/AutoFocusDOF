import React, { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import LightSource from "./Lightsource"
import Effects from "./Effects"
import { Bvh, Loader, OrbitControls } from "@react-three/drei"

import "./styles.css"
import Overlay from "./Overlay"
import ForestModel from "./Model"

export default function App() {
  return (
    <>
      <Canvas
        id="my-canvas"
        gl={{
          powerPreference: "high-performance",
          alpha: false,
          antialias: false,
          stencil: false,
          depth: false
        }}
        dpr={1}
        shadows
        camera={{
          fov: 45,
          near: 0.1,
          far: 100,
          position: [80, 4.8, 28]
        }}
      >
        <color attach="background" args={["#b1dbfc"]} />
        <fog attach="fog" args={["#f2d830", 35, 60]} />

        <Suspense fallback={null}>
          {/* IT IS CRUCIAL TO HAVE BVH FOR AUTOFOCUS */}
          <Bvh>
            <ForestModel />
          </Bvh>

          <LightSource />
          <Effects />
        </Suspense>

        <OrbitControls autoRotate maxPolarAngle={Math.PI / 2.18} autoRotateSpeed={0.3} maxDistance={33} minDistance={8} />
      </Canvas>
      <Loader />
      <Overlay />
    </>
  )
}
