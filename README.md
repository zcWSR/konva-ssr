# Konva-SSR

generate image on server use react-konva

```jsx
import React from 'react';
import { Layer, Rect } from "react-konva";
import { useImage, konvaSSR, getCanvas} from 'konva-ssr'

const App = ({width, height}) => {
  const image = useImage(resolve(process.cwd(), 'res/imgs', 'panda.jpg'))
  return (
    <Layer>
      <Rect x={0} y={0} width={width} height={height} fill="white" />
      <Rect x={20} y={20} width={100} height={100} fill="red" />
      <Image image={image} width={image.width * 3} height={image.height * 3} x={200} y={200} />
    </Layer>
  )
}

const stage = await konvaSSR(App, 1000, 500);
const canvas = getCanvas(stage);
fs.writeFileSync(process.cwd() + '/out.png', canvas.toBuffer('image/png'))
```

![demo.png](./demo.png)