import {Image, Canvas} from 'canvas'
import Konva from 'konva/lib/Core'

class CustomCanvas extends Canvas {
  private _width: number
  private _height: number
  style: {}
  constructor(width: number, height: number) {
    super(width, height)
    this._width = width
    this._height = height
    this.style = {}
  }

  // @ts-ignore
  get width() {
    return this._width
  }
  set width(value) {
    // this._width = value || this._width
  }
  // @ts-ignore
  get height() {
    return this._height
  }
  set height(value) {
    // this._height = value || this._height
  }
  
}

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
  Konva.Util.createCanvasElement = () => {
    // @ts-ignore
    const node = new CustomCanvas(300, 300);
    return node;
  };

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
  Konva.Canvas.prototype.setHeight = function (height) {
    this.height = this._canvas.height;
    this._canvas.style.height = height + 'px';
    var pixelRatio = this.pixelRatio, _context = this.getContext()._context;
    _context.scale(pixelRatio, pixelRatio);
  }
  Konva.Canvas.prototype.setWidth = function (width) {
    this.width = this._canvas.width;
    this._canvas.style.width = width + 'px';
    var pixelRatio = this.pixelRatio, _context = this.getContext()._context;
    _context.scale(pixelRatio, pixelRatio);
  }
}

export default makeKonvaServer