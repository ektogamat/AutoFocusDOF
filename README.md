# AutoFocusDOF Component for React Three Fiber

<p align="center">
    <a href="https://autofocusdof.vercel.app/" target="_blank"><img src="https://autofocusdof.vercel.app/autofocus.jpg" width="100%"/></a>
</p>

Live link with the demo of the component <a href="https://autofocusdof.vercel.app" target="_blank">https://autofocusdof.vercel.app</a>

Download link for the component: [Click here](https://gist.github.com/ektogamat/1b3a609051fe128762fd086d385ddf55)

# Introduction
This component was created to make your life easier when creating a scene using React Three Fiber and the post processing effect to obtain an auto focus. It depends on @react-three/postprocessing to work, in addition to <Bvh> to be able to scan objects on Canvas using a RayCaster to calculate the distance.

There are some options you can use:
- bokehScale={10} //blur scale
- resolution={1024} //resolution (might affect the performance)
- mouseFocus //if false, the center of the screen will be the focus
- focusSpeed={0.05} //milliseconds to focus a newly detected mesh
- focalLength={0.01} //how far the focus should go


# HOW TO USE?
```
import AutoFocusDOF from './AutoFocusDOF'
```

## You can also create a file to hold the component yourself. Just copy and paste these lines.
```
import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { DepthOfField } from '@react-three/postprocessing'
import { Raycaster, Vector2, Vector3 } from 'three'

export default function AutoFocusDOF(
    { bokehScale = 10, 
    focalLength = 0.001, 
    focusSpeed = 0.05, 
    mouseFocus = false, 
    resolution = 512 
    }) 
{
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
    });

    return (
        <DepthOfField
            focalLength={focalLength}
            bokehScale={bokehScale}
            height={resolution}
            ref={ref}
        />
    );

};

```
## And add this component inside the EffectsComposer...
```
<EffectComposer>
 <AutoFocusDOF
   bokehScale={10} //blur scale
   resolution={1024} //resolution (decrease for performance)
   mouseFocus //if false, the center of the screen will be the focus
   focusSpeed={0.05} // milliseconds to focus a new detected mesh
   focalLength={0.01} //how far the focus should go
 />
</EffectComposer>
```

Resources: [Threejs](https://threejs.org/), [WebGL](https://github.com/KhronosGroup/WebGL), [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/), [React three post processing](https://github.com/pmndrs/react-postprocessing)

# Show, don't tell 
Here you can see a video with it in action and some options
<a href="https://www.youtube.com/watch?v=vFlXcEGGtGs" target="_blank">https://www.youtube.com/watch?v=vFlXcEGGtGs</a>

# Getting Started using this demo project
Download and install Node.js on your computer (https://nodejs.org/en/download/).

Then, open VSCODE, drag the project folder to it. Open VSCODE terminal and install dependencies (you need to do this only in the first time)
```
npm install
```

Run this command in your terminal to open a local server at localhost:8080
```
npm run dev
```
<hr/>

# Very Important!
This component is always searching for points on meshes and can have an impact on the performance if you are not using <Bvh>. Using <Bvh> is a must to use this component. Be sure to import <Bvh> and to embrace all your scene with it

### Example
``` 
<Canvas>
  <Bvh firstHitOnly>
    <----Your Model />
  </Bvh>
</Canvas>
```

### KNOWN ISSUES
If you add components that covers the entire screen, like the Sparkles, the AutoFocus will see them and will not be able to focus in the objects behind them. Also, there is a problem preventing the Autofocus to work after a resize on the Canvas. I'm still working on this and plan to fix it soon.

# Can you leave a star please?
Would be really appreciated if you are willing to give me a star here on GitHub 🎉 or buy me a coffee ☕ https://www.buymeacoffee.com/andersonmancini. The money will be used to produce more content about threejs or to buy new courses.
