import React from 'react';
import 'konva/lib/shapes/Rect';
import { Layer, Rect } from "react-konva";

const App = () => {
  return <Layer>
    <Rect x={20} y={20} width={100} height={100} fill="red" />
  </Layer>;
}

export default App;
