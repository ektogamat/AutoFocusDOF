import { useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { DepthOfField } from "@react-three/postprocessing"
import { Raycaster, Vector2, Vector3 } from "three"

export default function AutoFocusDOF({ bokehScale = 10, focalLength = 0.001, focusSpeed = 0.05, mouseFocus = false, resolution = 512 }) {
  const { camera, mouse, scene } = useThree()

  const ref = useRef()
  const raycaster = new Raycaster()
  const finalVector = new Vector3()

  raycaster.firstHitOnly = true

  useFrame((state) => {
    if (mouseFocus) {
      raycaster.setFromCamera(mouse, camera)
    } else {
      raycaster.setFromCamera(new Vector2(0, 0), camera)
    }

    const intersects = raycaster.intersectObjects(scene.children)

    if (intersects.length > 0) {
      finalVector.lerp(intersects[0].point, focusSpeed)
      ref.current.target = finalVector
    }
  })

  return <DepthOfField focalLength={focalLength} bokehScale={bokehScale} height={resolution} ref={ref} />
}
