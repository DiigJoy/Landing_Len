// Servicio para cargar posts y recursos

/**
 * Interfaz para un post del blog
 */
export interface BlogPost {
  title: string;
  slug: string;
  publishDate: string;
  coverImage: string;
  category: string;
  excerpt: string;
  content?: string;
  tags?: string[];
  published: boolean;
}

/**
 * Interfaz para un recurso descargable
 */
export interface Resource {
  title: string;
  description: string;
  pdfFile: string;
  coverImage?: string;
  published: boolean;
}

/**
 * Obtener todos los posts del blog
 */
export const getAllPosts = async (): Promise<BlogPost[]> => {
  try {
    // En un entorno real, esto haría una llamada a la API
    // Por ahora, simulamos una respuesta con datos de ejemplo

    // Simular retraso de red
    await new Promise(resolve => setTimeout(resolve, 500));

    // Aquí utilizaríamos fetch para obtener los posts desde una API
    // const response = await fetch('/api/posts');
    // const data = await response.json();

    // IMPORTANTE: Estos son datos de ejemplo solo para desarrollo
    // En producción, estos datos deberían venir de una API o CMS
    const posts: BlogPost[] = [
      {
        title: "5 Estrategias para Mejorar tu Productividad",
        slug: "5-estrategias-productividad",
        excerpt: "Descubre cómo organizar mejor tu tiempo y lograr más resultados en menos tiempo...",
        publishDate: "2023-04-15",
        coverImage: "/images/blog/productivity.jpg",
        category: "Productividad",
        published: true,
        tags: ["productividad", "gestión del tiempo", "eficiencia"]
      },
      {
        title: "Guía Completa de Marketing Digital para Principiantes",
        slug: "guia-marketing-digital-principiantes",
        excerpt: "Todo lo que necesitas saber para comenzar a promocionar tu negocio en el mundo digital...",
        publishDate: "2023-04-10",
        coverImage: "/images/blog/marketing.jpg",
        category: "Marketing",
        published: true,
        tags: ["marketing digital", "SEO", "redes sociales"]
      },
      {
        title: "Cómo Crear un Plan de Negocios Efectivo",
        slug: "como-crear-plan-negocios-efectivo",
        excerpt: "Aprende los elementos esenciales para desarrollar un plan de negocios que atraiga inversionistas...",
        publishDate: "2023-04-05",
        coverImage: "/images/blog/business.jpg",
        category: "Negocios",
        published: true,
        tags: ["emprendimiento", "plan de negocios", "inversión"]
      },
      {
        title: "10 Tendencias de Diseño Web para este Año",
        slug: "tendencias-diseno-web",
        excerpt: "Mantente al día con las últimas tendencias en diseño web que marcarán este año...",
        publishDate: "2023-03-28",
        coverImage: "/images/blog/web-design.jpg",
        category: "Diseño",
        published: true,
        tags: ["diseño web", "tendencias", "UX/UI"]
      },
      {
        title: "Finanzas Personales: Cómo Crear un Presupuesto",
        slug: "finanzas-personales-presupuesto",
        excerpt: "Guía paso a paso para organizar tus finanzas y crear un presupuesto que realmente funcione...",
        publishDate: "2023-03-20",
        coverImage: "/images/blog/finance.jpg",
        category: "Finanzas",
        published: true,
        tags: ["finanzas personales", "presupuesto", "ahorro"]
      },
    ];

    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};

/**
 * Obtener un post por su slug
 */
export const getPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  try {
    // En un entorno real, esto haría una llamada a la API
    // Por ahora, simulamos una respuesta con datos de ejemplo

    // Simular retraso de red
    await new Promise(resolve => setTimeout(resolve, 500));

    // Aquí utilizaríamos fetch para obtener un post específico desde una API
    // const response = await fetch(`/api/posts/${slug}`);
    // const data = await response.json();

    // Datos de ejemplo para desarrollo
    const posts = await getAllPosts();
    const post = posts.find(p => p.slug === slug);

    if (!post) {
      return null;
    }

    // Añadir contenido completo (en un entorno real, esto vendría de la API)
    const postWithContent = {
      ...post,
      content: `<p>Este es el contenido completo del artículo "${post.title}". En un entorno real, este contenido se cargaría desde el CMS o la API.</p>
                <h2>Subtítulo del artículo</h2>
                <p>Aquí va más contenido del artículo, con párrafos, listas, etc.</p>
                <ul>
                  <li>Punto clave número uno sobre este tema</li>
                  <li>Otra consideración importante a tener en cuenta</li>
                  <li>Un tercer aspecto que no debes olvidar</li>
                </ul>
                <p>Conclusión del artículo con recomendaciones finales.</p>`
    };

    return postWithContent;
  } catch (error) {
    console.error(`Error fetching post ${slug}:`, error);
    return null;
  }
};

/**
 * Obtener recursos descargables
 */
export const getResources = async (): Promise<Resource[]> => {
  try {
    // En un entorno real, esto haría una llamada a la API
    // Por ahora, simulamos una respuesta con datos de ejemplo

    // Simular retraso de red
    await new Promise(resolve => setTimeout(resolve, 500));

    // IMPORTANTE: Estos son datos de ejemplo solo para desarrollo
    // En producción, estos datos deberían venir de una API o CMS
    const resources: Resource[] = [
      {
        title: "Guía de Productividad PDF",
        description: "Una guía completa con estrategias para aumentar tu productividad personal y profesional.",
        pdfFile: "/recursos/guia-productividad.pdf",
        coverImage: "/images/resources/guia-productividad-cover.jpg",
        published: true
      }
    ];

    return resources;
  } catch (error) {
    console.error('Error fetching resources:', error);
    return [];
  }
};

/**
 * Obtener el recurso principal (el que se ofrece en la landing)
 */
export const getPrimaryResource = async (): Promise<Resource | null> => {
  try {
    const resources = await getResources();
    return resources.length > 0 ? resources[0] : null;
  } catch (error) {
    console.error('Error fetching primary resource:', error);
    return null;
  }
};