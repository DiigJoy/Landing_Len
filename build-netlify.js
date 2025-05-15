import fs from 'fs-extra';
import path from 'path';

// Asegurarse de que la carpeta admin esté disponible en dist
fs.copySync(
  path.resolve(__dirname, 'public/admin'),
  path.resolve(__dirname, 'dist/admin')
);