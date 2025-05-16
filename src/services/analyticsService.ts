/**
 * Servicio para interactuar con Google Analytics
 */

// Tipos para eventos de Google Analytics
interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
}

interface PageViewParams {
  path: string;
  title?: string;
}

// Verificar si Google Analytics está disponible
const isGtagAvailable = (): boolean => {
  return typeof window !== 'undefined' && typeof (window as any).gtag === 'function';
};

/**
 * Envía un evento a Google Analytics
 */
export const trackEvent = (event: AnalyticsEvent): void => {
  if (!isGtagAvailable()) {
    console.warn('Google Analytics no está disponible');
    return;
  }

  try {
    (window as any).gtag('event', event.action, {
      'event_category': event.category,
      'event_label': event.label,
      'value': event.value
    });
  } catch (error) {
    console.error('Error al enviar evento a Google Analytics:', error);
  }
};

/**
 * Registra una vista de página en Google Analytics
 */
export const trackPageView = (params: PageViewParams): void => {
  if (!isGtagAvailable()) {
    console.warn('Google Analytics no está disponible');
    return;
  }

  try {
    (window as any).gtag('config', 'G-YXFZTTMQCG', {
      'page_path': params.path,
      'page_title': params.title
    });
  } catch (error) {
    console.error('Error al registrar vista de página en Google Analytics:', error);
  }
};

/**
 * Registra una vista de post del blog
 */
export const trackPostView = (slug: string, title: string): void => {
  trackEvent({
    category: 'blog',
    action: 'view_post',
    label: title,
  });
  
  trackPageView({
    path: `/blog/${slug}`,
    title
  });
};

/**
 * Registra una descarga de recurso
 */
export const trackDownload = (resourceId: string): void => {
  trackEvent({
    category: 'resources',
    action: 'download',
    label: resourceId,
    value: 1
  });
};

/**
 * Registra un envío de formulario de contacto
 */
export const trackFormSubmission = (formName: string): void => {
  trackEvent({
    category: 'forms',
    action: 'submit',
    label: formName
  });
};

export default {
  trackEvent,
  trackPageView,
  trackPostView,
  trackDownload,
  trackFormSubmission
};
