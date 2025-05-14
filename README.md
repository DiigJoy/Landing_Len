# Landing Page con Vue 3, Tailwind CSS y Netlify CMS

![Vue 3](https://img.shields.io/badge/Vue%203-42b883?style=for-the-badge&logo=vue.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38b2ac?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646cff?style=for-the-badge&logo=vite&logoColor=white)
![Netlify](https://img.shields.io/badge/Netlify-00c7b7?style=for-the-badge&logo=netlify&logoColor=white)

Una landing page moderna y responsive desarrollada con Vue 3, Tailwind CSS y Netlify CMS. Incluye formulario de descarga, blog dinámico y panel de administración.

## 🚀 Características

- **Formulario de Contacto**: Captura leads con un formulario integrado con Netlify Forms
- **Descarga de PDF**: Ofrece recursos gratuitos descargables a los usuarios
- **Blog Dinámico**: Muestra artículos con vista detallada y categorías
- **Panel de Administración**: Gestiona contenidos a través de Netlify CMS
- **Responsive Design**: Completamente adaptable a dispositivos móviles y escritorio
- **SEO Friendly**: Estructura optimizada para motores de búsqueda
- **Envío de Emails**: Administrador puede enviar correos a los contactos registrados

## 📋 Requisitos Previos

- Node.js (v14 o superior)
- npm o yarn
- Git
- Cuenta en Netlify (para despliegue y CMS)

## 🛠️ Configuración Local

### Con Docker (Recomendado)

1. Clona este repositorio:
   ```bash
   git clone <url-del-repositorio>
   cd landing-page-vue
   ```

2. Inicia el contenedor Docker:
   ```bash
   docker-compose up
   ```

3. Abre tu navegador en `http://localhost:3000`

4. Para ejecutar el proxy local de Netlify CMS (en otra terminal):
   ```bash
   npm run netlify-cms-proxy
   ```

### Sin Docker

1. Clona este repositorio:
   ```bash
   git clone <url-del-repositorio>
   cd landing-page-vue
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

4. Para ejecutar el proxy local de Netlify CMS (en otra terminal):
   ```bash
   npm run netlify-cms-proxy
   ```

## 🔧 Estructura del Proyecto

```
landing-page-vue/
├── public/               # Archivos estáticos
│   ├── admin/            # Panel de administración (Netlify CMS)
│   ├── images/           # Imágenes estáticas
│   └── recursos/         # PDFs y recursos descargables
├── src/
│   ├── assets/           # Assets del proyecto (CSS, imágenes, etc.)
│   ├── components/       # Componentes Vue reutilizables
│   ├── services/         # Servicios para manejar datos
│   ├── views/            # Vistas/páginas principales
│   ├── App.vue           # Componente raíz
│   └── main.ts           # Punto de entrada principal
├── content/              # Contenido del CMS
│   ├── blog/             # Artículos del blog
│   ├── pages/            # Páginas adicionales
│   └── resources/        # Recursos descargables
├── .dockerignore
├── docker-compose.yml    # Configuración de Docker
├── Dockerfile
├── netlify.toml          # Configuración de Netlify
├── package.json
├── postcss.config.js     # Configuración de PostCSS para Tailwind
├── tailwind.config.ts    # Configuración de Tailwind CSS
├── tsconfig.json         # Configuración de TypeScript
└── vite.config.ts        # Configuración de Vite
```

## 🚢 Despliegue

### Netlify

1. Crea una nueva site en Netlify conectada a tu repositorio GitHub/GitLab/Bitbucket.
2. Configura los siguientes ajustes de compilación:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
3. Habilita Netlify Identity para gestionar usuarios del CMS.
4. Configura Git Gateway para permitir que Netlify CMS acceda al repositorio.

## 📝 Personalización

### Formulario de Contacto

El formulario de contacto está configurado para funcionar con Netlify Forms. Para personalizar los campos o el comportamiento, edita el componente `DownloadForm.vue`.

### Contenido del Blog

Puedes gestionar los artículos del blog a través del panel de administración en `/admin` una vez desplegado, o manualmente editando los archivos JSON/MD en la carpeta `content/blog/`.

### Estilos

Los estilos están basados en Tailwind CSS. Puedes personalizar los colores, fuentes y otros estilos en el archivo `tailwind.config.ts`.

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir lo que te gustaría cambiar.

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.