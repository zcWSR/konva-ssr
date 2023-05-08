import { KonvaRenderer } from "react-konva/lib/ReactKonvaCore";
import makeKonvaServer from "./makeKonvaServer";
import Konva from "konva";
import {Canvas} from 'canvas'

makeKonvaServer();
const KonvaServerRender = (container: React.ReactNode, width: number, height: number): Promise<Konva.Stage> => {
  // @ts-ignore
  const stage = new Konva.Stage({width,height});
  // @ts-ignore
  const fiber = KonvaRenderer.createContainer(stage);
  return new Promise((resolve) => {
    KonvaRenderer.updateContainer(container, fiber, null, () => {
      resolve(stage);
    });
  });
}

export const getImageBuffer = (stage: Konva.Stage) => {
  const canvas = stage.toCanvas() as unknown as Canvas;
  return canvas.toBuffer('image/png')
}
export default KonvaServerRender
