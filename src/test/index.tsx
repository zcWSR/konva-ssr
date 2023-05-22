import fs from 'fs'
import App from './App';
import { konvaSSR, getCanvas } from '..'

const run = async () => {
  const stage = await konvaSSR(App, 1000, 500);
  if (!stage) return
  
  const canvas = getCanvas(stage)
  fs.writeFileSync(process.cwd() + '/out.png', canvas.toBuffer('image/png'))
}

console.time()
run()
console.timeEnd()
