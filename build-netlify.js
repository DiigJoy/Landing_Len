const fs = require('fs-extra');
const path = require('path');

// Asegurarse de que la carpeta admin esté disponible en dist
fs.copySync(
  path.resolve(__dirname, 'public/admin'),
  path.resolve(__dirname, 'dist/admin')
);