import { Octokit } from '@octokit/rest';

// Funciones para codificar/decodificar en base64 en el navegador
function toBase64(str: string): string {
  try {
    // Usar btoa directamente para cadenas ASCII
    return btoa(str);
  } catch (e) {
    // Para cadenas Unicode, necesitamos convertir a UTF-8 primero
    const bytes = new TextEncoder().encode(str);
    const binString = Array.from(bytes).map(byte => String.fromCharCode(byte)).join('');
    return btoa(binString);
  }
}

function fromBase64(str: string): string {
  try {
    // Usar atob directamente para cadenas ASCII
    return atob(str);
  } catch (e) {
    // Para cadenas Unicode, necesitamos convertir desde UTF-8
    const binString = atob(str);
    const bytes = Uint8Array.from(binString, char => char.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  }
}

// Tipos para los posts del blog
export interface BlogPostInput {
  title: string;
  content: string;
  excerpt: string;
  category: string;
  tags?: string[];
  coverImage?: string;
}

export interface BlogPostResponse {
  success: boolean;
  url?: string;
  error?: string;
}

// Función para convertir título a slug
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

// Clase para interactuar con GitHub
export class GitHubService {
  private octokit: Octokit;
  private owner: string;
  private repo: string;
  private branch: string;
  private contentPath: string;

  constructor(token: string, owner: string, repo: string, branch = 'main', contentPath = 'content/blog') {
    this.octokit = new Octokit({ auth: token });
    this.owner = owner;
    this.repo = repo;
    this.branch = branch;
    this.contentPath = contentPath;
  }

  // Crear un nuevo post
  async createPost(post: BlogPostInput): Promise<BlogPostResponse> {
    try {
      const slug = slugify(post.title);
      const fileName = `${slug}.md`;
      const filePath = `${this.contentPath}/${fileName}`;

      // Crear frontmatter
      const frontmatter = `---
title: ${post.title}
slug: ${slug}
publishDate: ${new Date().toISOString().split('T')[0]}
category: ${post.category}
excerpt: ${post.excerpt}
${post.coverImage ? `coverImage: ${post.coverImage}` : ''}
${post.tags && post.tags.length > 0 ? `tags: [${post.tags.map(t => `"${t}"`).join(', ')}]` : ''}
published: true
---

${post.content}`;

      // Crear archivo en GitHub
      const response = await this.octokit.repos.createOrUpdateFileContents({
        owner: this.owner,
        repo: this.repo,
        path: filePath,
        message: `Add blog post: ${post.title}`,
        content: toBase64(frontmatter),
        branch: this.branch
      });

      return {
        success: true,
        url: response.data.content?.html_url
      };
    } catch (error: any) {
      console.error('Error al crear post en GitHub:', error);
      return {
        success: false,
        error: error.message || 'Error al crear post'
      };
    }
  }

  // Actualizar un post existente
  async updatePost(slug: string, post: BlogPostInput): Promise<BlogPostResponse> {
    try {
      const fileName = `${slug}.md`;
      const filePath = `${this.contentPath}/${fileName}`;

      // Primero, obtener el archivo actual para su SHA
      const fileData = await this.octokit.repos.getContent({
        owner: this.owner,
        repo: this.repo,
        path: filePath,
        ref: this.branch
      });

      // Verificar que fileData.data no es un array
      if (Array.isArray(fileData.data)) {
        throw new Error('La ruta especificada es un directorio, no un archivo');
      }

      // Crear frontmatter actualizado
      const frontmatter = `---
title: ${post.title}
slug: ${slug}
publishDate: ${new Date().toISOString().split('T')[0]}
category: ${post.category}
excerpt: ${post.excerpt}
${post.coverImage ? `coverImage: ${post.coverImage}` : ''}
${post.tags && post.tags.length > 0 ? `tags: [${post.tags.map(t => `"${t}"`).join(', ')}]` : ''}
published: true
---

${post.content}`;

      // Actualizar archivo en GitHub
      const response = await this.octokit.repos.createOrUpdateFileContents({
        owner: this.owner,
        repo: this.repo,
        path: filePath,
        message: `Update blog post: ${post.title}`,
        content: toBase64(frontmatter),
        sha: fileData.data.sha,
        branch: this.branch
      });

      return {
        success: true,
        url: response.data.content?.html_url
      };
    } catch (error: any) {
      console.error('Error al actualizar post en GitHub:', error);
      return {
        success: false,
        error: error.message || 'Error al actualizar post'
      };
    }
  }

  // Obtener todos los posts
  async getAllPosts(): Promise<any[]> {
    try {
      // Obtener contenido del directorio
      const response = await this.octokit.repos.getContent({
        owner: this.owner,
        repo: this.repo,
        path: this.contentPath,
        ref: this.branch
      });

      // Verificar que response.data es un array
      if (!Array.isArray(response.data)) {
        throw new Error('La ruta especificada no es un directorio');
      }

      // Filtrar solo archivos .md
      const mdFiles = response.data.filter(file =>
        file.type === 'file' && file.name.endsWith('.md')
      );

      // Obtener contenido de cada archivo
      const posts = await Promise.all(
        mdFiles.map(async file => {
          const content = await this.octokit.repos.getContent({
            owner: this.owner,
            repo: this.repo,
            path: file.path,
            ref: this.branch
          });

          if (Array.isArray(content.data)) {
            throw new Error(`${file.path} es un directorio, no un archivo`);
          }

          // Decodificar contenido
          const fileContent = fromBase64(content.data.content);

          // Parsear frontmatter y contenido
          const frontmatterMatch = fileContent.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);

          if (!frontmatterMatch) {
            return null;
          }

          const frontmatterStr = frontmatterMatch[1];
          const contentStr = frontmatterMatch[2];

          // Parsear frontmatter
          const frontmatter: Record<string, any> = {};
          frontmatterStr.split('\n').forEach(line => {
            const [key, ...valueParts] = line.split(':');
            if (key && valueParts.length) {
              let value = valueParts.join(':').trim();

              // Manejar arrays
              if (value.startsWith('[') && value.endsWith(']')) {
                try {
                  value = JSON.parse(value.replace(/'/g, '"'));
                } catch (e) {
                  // Si falla el parsing, mantener como string
                }
              }

              frontmatter[key.trim()] = value;
            }
          });

          return {
            ...frontmatter,
            content: contentStr.trim(),
            path: file.path,
            sha: content.data.sha
          };
        })
      );

      // Filtrar posts nulos y ordenar por fecha
      return posts
        .filter(post => post !== null)
        .sort((a, b) => {
          const dateA = new Date(a.publishDate);
          const dateB = new Date(b.publishDate);
          return dateB.getTime() - dateA.getTime();
        });
    } catch (error: any) {
      console.error('Error al obtener posts de GitHub:', error);
      return [];
    }
  }

  // Subir una imagen
  async uploadImage(file: File, path = 'public/images/blog'): Promise<{ success: boolean; url?: string; error?: string }> {
    try {
      // Convertir archivo a base64
      const base64 = await this.fileToBase64(file);
      const content = base64.split(',')[1]; // Remover el prefijo data:image/...

      // Crear nombre de archivo único
      const timestamp = new Date().getTime();
      const fileName = `${timestamp}-${file.name.replace(/\s+/g, '-')}`;
      const filePath = `${path}/${fileName}`;

      // Subir archivo a GitHub
      const response = await this.octokit.repos.createOrUpdateFileContents({
        owner: this.owner,
        repo: this.repo,
        path: filePath,
        message: `Upload image: ${fileName}`,
        content,
        branch: this.branch
      });

      // Construir URL de la imagen
      const imageUrl = `/images/blog/${fileName}`;

      return {
        success: true,
        url: imageUrl
      };
    } catch (error: any) {
      console.error('Error al subir imagen a GitHub:', error);
      return {
        success: false,
        error: error.message || 'Error al subir imagen'
      };
    }
  }

  // Convertir File a base64
  private fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }
}

// Función para crear una instancia del servicio
export function createGitHubService(): GitHubService {
  const token = import.meta.env.VITE_GITHUB_TOKEN;
  const owner = import.meta.env.VITE_GITHUB_OWNER;
  const repo = import.meta.env.VITE_GITHUB_REPO;

  if (!token || !owner || !repo) {
    throw new Error('Variables de entorno de GitHub no configuradas');
  }

  return new GitHubService(token, owner, repo);
}