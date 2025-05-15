import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Asegurarse de que exista la carpeta admin en dist
try {
  // Crear la carpeta admin si no existe
  fs.ensureDirSync(path.resolve(__dirname, 'dist/admin'));
  
  // Copiar los archivos de admin si existen
  if (fs.existsSync(path.resolve(__dirname, 'public/admin'))) {
    fs.copySync(
      path.resolve(__dirname, 'public/admin'),
      path.resolve(__dirname, 'dist/admin')
    );
    console.log('Archivos de admin copiados con éxito.');
  } else {
    console.log('La carpeta admin no existe en public. Creando estructura básica.');
    
    // Crear estructura básica si no existe
    fs.writeFileSync(
      path.resolve(__dirname, 'dist/admin/index.html'),
      `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Panel de Administración</title>
    <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
  </head>
  <body>
    <script src="https://unpkg.com/netlify-cms@^2.0.0/dist/netlify-cms.js"></script>
  </body>
</html>`
    );
    
    // Crear config.yml básico si no existe
    fs.writeFileSync(
      path.resolve(__dirname, 'dist/admin/config.yml'),
      `backend:
  name: github
  repo: DiigJoy/Landing_Len
  branch: main

media_folder: "public/images/uploads"
public_folder: "/images/uploads"

collections:
  - name: "blog"
    label: "Blog"
    folder: "content/blog"
    create: true
    slug: "{{slug}}"
    fields:
      - { label: "Título", name: "title", widget: "string" }
      - { label: "Contenido", name: "content", widget: "markdown" }
`
    );
  }
  
  console.log('Proceso completado con éxito.');
} catch (error) {
  console.error('Error durante el proceso:', error);
  process.exit(1);
}