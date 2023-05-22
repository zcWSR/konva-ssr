import React from 'react';
import { KonvaRenderer } from "react-konva/lib/ReactKonvaCore";
import makeKonvaServer from "./makeKonvaServer";
import Konva from "konva";
import { Canvas } from 'canvas'
import { Application } from "./types";

makeKonvaServer();
const konvaSSR = (App: Application, width: number, height: number): Promise<Konva.Stage> => {
  const Wrap: Application = ({ width, height }) => <React.StrictMode><App width={width} height={height} /></React.StrictMode>;
  // @ts-ignore
  const stage = new Konva.Stage({ width, height });
  // @ts-ignore
  const fiber = KonvaRenderer.createContainer(stage);
  return new Promise((resolve) => {
    KonvaRenderer.updateContainer(<Wrap width={width} height={height} />, fiber, null, () => {
      resolve(stage);
    });
  });
}

export const getCanvas = (stage: Konva.Stage) => {
  const canvas = stage.toCanvas() as unknown as Canvas;
  return canvas;
}
export default konvaSSR;
