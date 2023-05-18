import React from 'react';
import fs from 'fs'
import App from './App';
import KonvaServerRender, { getImageBuffer } from './render'

const run = async () => {
  const stage = await KonvaServerRender(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    1000,
    500
  );
  if (!stage) return
  
  const buffer = getImageBuffer(stage)
  fs.writeFileSync(process.cwd() + '/out.png', buffer)
}

console.time()
run()
console.timeEnd()
