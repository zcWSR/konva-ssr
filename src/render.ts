import { KonvaRenderer } from "react-konva/lib/ReactKonvaCore";
import makeKonvaServer from "./makeKonvaServer";
import Konva from "konva/lib/Core";
import {Canvas} from 'canvas'
import { Stage } from "konva/lib/Stage";

makeKonvaServer();
const KonvaServerRender = (container: React.ReactNode, width: number, height: number) => {
  // @ts-ignore
  const stage = new Konva.Stage({ width,height });
  // @ts-ignore
  const fiber = KonvaRenderer.createContainer(stage);
  KonvaRenderer.updateContainer(container, fiber);
  return stage;
}

export const getImageBuffer = (stage: Stage) => {
  const canvas = stage.toCanvas() as unknown as Canvas;
  return canvas.toBuffer('image/png')
}
export default KonvaServerRender
