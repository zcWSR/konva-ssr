import {Image, Canvas} from 'canvas'
import Konva from 'konva/lib/Core'
import {SceneCanvas, HitCanvas} from 'konva/lib/Canvas'
import {SceneContext, HitContext} from 'konva/lib/Context'

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

  const fakeCanvas = new Canvas(1, 1);
  // create fake canvas in Node env
  // @ts-ignore
  fakeCanvas.style = {}
  // @ts-ignore
  Konva.Util.createCanvasElement = () => fakeCanvas;

  // create image in Node env
  // @ts-ignore
  // Konva.Util.createImageElement = () => {
  //   const node = new Image();
  //   return node;
  // };

  // _checkVisibility use dom element, in node we can skip it
  Konva.Stage.prototype._checkVisibility = () => {};

    // replace setHeight setWidth methods
  // skip width = 0 and height = 0
  SceneCanvas.prototype.setSize = function (width, height) {
    width = width || 1;
    height = height || 1;
    this.height = height * this.pixelRatio;
    this.width = width * this.pixelRatio;
    this._canvas = new Canvas(this.width, this.height) as unknown as HTMLCanvasElement;
    // @ts-ignore
    this._canvas.style = {};
    this.context = new SceneContext(this);
    this.getContext()._context.scale(this.pixelRatio, this.pixelRatio);
  }
  HitCanvas.prototype.setSize = function (width, height) {
    width = width || 1;
    height = height || 1;
    this.height = height * this.pixelRatio;
    this.width = width * this.pixelRatio;
    this._canvas = new Canvas(this.width, this.height) as unknown as HTMLCanvasElement;
    // @ts-ignore
    this._canvas.style = {};
    this.context = new HitContext(this);
    this.getContext()._context.scale(this.pixelRatio, this.pixelRatio);
  }
}

export default makeKonvaServer