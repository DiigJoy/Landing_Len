// Script para probar el build localmente
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

try {
  // Ejecutar el build
  console.log('Ejecutando build...');
  execSync('vite build', { stdio: 'inherit' });
  
  // Copiar archivos de admin
  console.log('Copiando archivos de admin...');
  
  // Asegurarse de que el directorio dist/admin existe
  if (!fs.existsSync(path.resolve('dist/admin'))) {
    fs.mkdirSync(path.resolve('dist/admin'), { recursive: true });
  }
  
  // Copiar archivos de public/admin a dist/admin
  if (fs.existsSync(path.resolve('public/admin'))) {
    const files = fs.readdirSync(path.resolve('public/admin'));
    files.forEach(file => {
      const sourcePath = path.resolve(`public/admin/${file}`);
      const destPath = path.resolve(`dist/admin/${file}`);
      fs.copyFileSync(sourcePath, destPath);
      console.log(`Copiado: ${file}`);
    });
  } else {
    console.log('No se encontró el directorio public/admin');
  }
  
  console.log('Build completado con éxito!');
} catch (error) {
  console.error('Error durante el build:', error);
  process.exit(1);
}
