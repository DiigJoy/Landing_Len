// Script para copiar archivos necesarios para Netlify después del build
import fs from 'fs-extra';
import path from 'path';

// Función para copiar archivos y directorios
async function copyFiles() {
  try {
    // Copiar admin/index.html a dist/admin/index.html
    await fs.copy(
      path.resolve('public/admin'),
      path.resolve('dist/admin')
    );
    
    console.log('✅ Archivos copiados correctamente para Netlify');
  } catch (err) {
    console.error('❌ Error al copiar archivos:', err);
    process.exit(1);
  }
}

// Ejecutar la función
copyFiles();
