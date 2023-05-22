import {Image} from 'canvas'
import Konva from 'konva'
import {readFileSync} from 'fs'

// 假装是 ImageElement
type ImageType = HTMLImageElement

const ImageCache: {[k: string]: ImageType} = {}

const useImage = (path: string) => {
  if (ImageCache[path]) {
    return ImageCache[path]
  }
  const buffer = readFileSync(path)
  const image = new Image()
  image.src = buffer
  console.log(image.width, image.height)
  ImageCache[path] = image as unknown as ImageType
  return image as unknown as ImageType
}

export default useImage