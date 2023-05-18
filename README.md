# Konva-SSR

尝试在 node 侧使用 react-konva 生成图片

```jsx
import React from 'react';
import { Layer, Rect } from "react-konva";
import KonvaServerRender, { getImageBuffer } from './render'

const App = () => {
  return <Layer>
    <Rect x={20} y={20} width={100} height={100} fill="red" />
  </Layer>;
}

const stage = await KonvaServerRender(
    <App />,
    1000,
    500
  );
const buffer = getImageBuffer(stage);
fs.writeFileSync(process.cwd() + '/out.png', buffer);
```

![demo.png](./demo.png)