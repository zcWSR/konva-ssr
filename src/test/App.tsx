import React from 'react';
import { Image, Layer, Rect } from "react-konva";
import {resolve} from 'path'
import {useImage} from '..';

const App: React.FC<{width: number, height: number}> = ({width, height}) => {
  const image = useImage(resolve(process.cwd(), 'res/imgs', 'panda.jpg'))
  return (
    <Layer>
      <Rect x={0} y={0} width={width} height={height} fill="white" />
      <Rect x={20} y={20} width={100} height={100} fill="red" />
      <Image image={image} width={image.width * 3} height={image.height * 3} x={200} y={200} />
    </Layer>
  )
}

export default App;
