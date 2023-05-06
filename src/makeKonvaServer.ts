import {Image, Canvas} from 'canvas'
import Konva from 'konva/lib/Core'

const makeKonvaServer = () => {
  // mock window
  // @ts-ignore
  Konva.window = {
    Image,
    devicePixelRatio: 1,
  };

  // mock document
  Konva.document = {
    createElement: function () {},
    documentElement: {
      addEventListener: function () {},
    },
  };

  // make some global injections
  // @ts-ignore
  global.requestAnimationFrame = cb => cb();

  // create canvas in Node env
  // @ts-ignore
  Konva.Util.createCanvasElement = (width = 1, height = 1) => {
    console.log(width, height)
    // @ts-ignore
    const node = new Canvas(width, height);
    // @ts-ignore
    node.style = {};
    return node;
  };

  // create image in Node env
  // @ts-ignore
  Konva.Util.createImageElement = () => {
    const node = new Image();
    return node;
  };

  // _checkVisibility use dom element, in node we can skip it
  Konva.Stage.prototype._checkVisibility = () => {};
}

export default makeKonvaServer