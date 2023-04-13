import React from "react"
import { EffectComposer, Vignette, Bloom, HueSaturation, SMAA } from "@react-three/postprocessing"

import AutoFocusDOF from "./AutoFocusDOF"

export default function Effects() {
  return (
    <EffectComposer disableNormalPass multisampling={false}>
      <AutoFocusDOF bokehScale={8} focalLength={0.08} focusSpeed={0.03} resolution={1024} />
      <Bloom luminanceThreshold={0.45} radius={0.6} levels={1} intensity={0.3} mipmapBlur />

      <Vignette offset={0.3} darkness={0.55} eskil={false} />
      <HueSaturation hue={0.1} saturation={0.2} />
      <SMAA />
    </EffectComposer>
  )
}
