import React from 'react';
import fs from 'fs'
import App from './App';
import KonvaServerRender, { getImageBuffer } from './render'

const stage = KonvaServerRender(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  500,
  500
);

const buffer = getImageBuffer(stage)
fs.writeFileSync(process.cwd() + '/out.png', buffer)
