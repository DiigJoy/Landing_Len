// src/services/auth-service.ts
// Servicio simplificado de autenticación con Auth0

// Configuración de Auth0
const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const redirectUri = `${window.location.origin}/admin`;

// Lista de emails autorizados para acceder al panel de administración
const AUTHORIZED_EMAILS = [
  'jlbarriossouza@gmail.com',
  // Añade aquí más emails autorizados si es necesario
];

// Verificar que las variables de entorno estén definidas
if (!domain || !clientId) {
  console.error('Error: Variables de entorno de Auth0 no definidas');
}

// Función para generar un string aleatorio para state
const generateRandomString = (): string => {
  const array = new Uint8Array(16);
  window.crypto.getRandomValues(array);
  return Array.from(array, byte => ('0' + (byte & 0xFF).toString(16)).slice(-2)).join('');
};

export const authService = {
  // Inicializar Auth0 - Procesar callback
  async init(): Promise<void> {
    let loadingStore;
    try {
      // Importar el store de carga
      try {
        const { useLoadingStore } = await import('../stores/loadingStore');
        loadingStore = useLoadingStore();
      } catch (e) {
        console.error('Error al importar loadingStore:', e);
      }

      // Verificar si hay un código de autorización en la URL
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const state = urlParams.get('state');

      if (code && state) {
        // Mostrar pantalla de carga
        if (loadingStore) {
          loadingStore.showLoading('Completando inicio de sesión...');
        }

        // Verificar el state
        const savedState = localStorage.getItem('auth_state');
        if (state !== savedState) {
          console.error('Estado de autenticación inválido');
          window.history.replaceState({}, document.title, window.location.pathname);

          // Ocultar pantalla de carga
          if (loadingStore) {
            loadingStore.hideLoading();
          }
          return;
        }

        // Limpiar el state
        localStorage.removeItem('auth_state');

        try {
          // Intercambiar el código por tokens
          const tokenResponse = await this.getTokens(code);

          // Guardar token de acceso
          localStorage.setItem('auth_access_token', tokenResponse.access_token);
          localStorage.setItem('auth_expires_at', (Date.now() + tokenResponse.expires_in * 1000).toString());
          localStorage.setItem('auth_is_authenticated', 'true');

          // Obtener información del usuario
          const userProfile = await this.getUserInfo(tokenResponse.access_token);

          // Verificar si el usuario está autorizado
          if (!AUTHORIZED_EMAILS.includes(userProfile.email)) {
            // Si no está autorizado, cerrar sesión
            await this.logout();

            // Ocultar pantalla de carga
            if (loadingStore) {
              loadingStore.hideLoading();
            }

            alert('No tienes autorización para acceder al panel de administración.');
            window.location.href = '/';
            return;
          }

          // Guardar información del usuario
          localStorage.setItem('auth_user_email', userProfile.email);
          localStorage.setItem('auth_user_name', userProfile.name || '');

          // Limpiar URL
          window.history.replaceState({}, document.title, window.location.pathname);

          // Ocultar pantalla de carga después de un breve retraso
          setTimeout(() => {
            if (loadingStore) {
              loadingStore.hideLoading();
            }
          }, 500);
        } catch (error) {
          console.error('Error al procesar autenticación:', error);
          localStorage.removeItem('auth_is_authenticated');

          // Ocultar pantalla de carga
          if (loadingStore) {
            loadingStore.hideLoading();
          }
        }
      } else {
        // Si no hay código de autorización, asegurarse de que la pantalla de carga esté oculta
        if (loadingStore) {
          loadingStore.hideLoading();
        }
      }
    } catch (error) {
      console.error("Error al inicializar Auth0:", error);
      window.history.replaceState({}, document.title, window.location.pathname);

      // Ocultar pantalla de carga en caso de error
      if (loadingStore) {
        loadingStore.hideLoading();
      }
    }
  },

  // Obtener tokens usando el código de autorización
  async getTokens(code: string): Promise<any> {
    const response = await fetch(`https://${domain}/oauth/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        grant_type: 'authorization_code',
        client_id: clientId,
        code: code,
        redirect_uri: redirectUri
      })
    });

    if (!response.ok) {
      throw new Error('Error al obtener tokens');
    }

    return await response.json();
  },

  // Obtener información del usuario
  async getUserInfo(accessToken: string): Promise<any> {
    const response = await fetch(`https://${domain}/userinfo`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    if (!response.ok) {
      throw new Error('Error al obtener información del usuario');
    }

    return await response.json();
  },

  // Iniciar sesión
  async login(): Promise<void> {
    let loadingStore;
    try {
      // Importar el store de carga
      try {
        const { useLoadingStore } = await import('../stores/loadingStore');
        loadingStore = useLoadingStore();
      } catch (e) {
        console.error('Error al importar loadingStore:', e);
      }

      // Mostrar pantalla de carga
      if (loadingStore) {
        loadingStore.showLoading('Redirigiendo a la página de inicio de sesión...');
      }

      // Generar y guardar state
      const state = generateRandomString();
      localStorage.setItem('auth_state', state);

      // Construir URL de autenticación
      const authUrl = new URL(`https://${domain}/authorize`);
      authUrl.searchParams.append('client_id', clientId);
      authUrl.searchParams.append('redirect_uri', redirectUri);
      authUrl.searchParams.append('response_type', 'code');
      authUrl.searchParams.append('scope', 'openid profile email');
      authUrl.searchParams.append('state', state);

      // Pequeño retraso para asegurar que la pantalla de carga se muestre
      setTimeout(() => {
        // Redirigir a Auth0
        window.location.href = authUrl.toString();
      }, 500);
    } catch (error) {
      console.error('Error en login:', error);

      // Ocultar pantalla de carga
      if (loadingStore) {
        loadingStore.hideLoading();
      }

      alert('Error al iniciar sesión. Por favor, intenta de nuevo.');
    }
  },

  // Verificar si el usuario está autenticado
  async isAuthenticated(): Promise<boolean> {
    try {
      const isAuthenticated = localStorage.getItem('auth_is_authenticated') === 'true';
      const expiresAt = localStorage.getItem('auth_expires_at');

      // Verificar si la autenticación ha expirado
      if (isAuthenticated && expiresAt) {
        const expirationTime = parseInt(expiresAt);
        if (Date.now() > expirationTime) {
          // Sesión expirada, limpiar datos
          this.clearAuthData();
          return false;
        }
      }

      return isAuthenticated;
    } catch (error) {
      console.error('Error al verificar autenticación:', error);
      return false;
    }
  },

  // Limpiar datos de autenticación
  clearAuthData(): void {
    localStorage.removeItem('auth_access_token');
    localStorage.removeItem('auth_expires_at');
    localStorage.removeItem('auth_is_authenticated');
    localStorage.removeItem('auth_user_email');
    localStorage.removeItem('auth_user_name');
    localStorage.removeItem('auth_state');
  },

  // Obtener el perfil del usuario
  async getUser(): Promise<any> {
    try {
      const isAuth = await this.isAuthenticated();

      if (!isAuth) {
        return null;
      }

      // Obtener datos del usuario desde localStorage
      const email = localStorage.getItem('auth_user_email');
      const name = localStorage.getItem('auth_user_name');

      if (!email) {
        return null;
      }

      return {
        name: name || email.split('@')[0],
        email: email
      };
    } catch (error) {
      console.error('Error al obtener usuario:', error);
      return null;
    }
  },

  // Cerrar sesión
  async logout(): Promise<void> {
    try {
      // Limpiar estado de autenticación local
      this.clearAuthData();

      // Construir URL de logout
      const logoutUrl = new URL(`https://${domain}/v2/logout`);
      logoutUrl.searchParams.append('client_id', clientId);
      logoutUrl.searchParams.append('returnTo', window.location.origin);

      // Redirigir a la URL de logout
      window.location.href = logoutUrl.toString();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      window.location.href = '/';
    }
  }
};
