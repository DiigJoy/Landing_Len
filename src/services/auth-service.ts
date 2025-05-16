// src/services/auth-service.ts
// Servicio de autenticación con Auth0

// Configuración de Auth0
// Obtener valores de las variables de entorno
const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const redirectUri = `${window.location.origin}/admin`;

// Verificar que las variables de entorno estén definidas
if (!domain || !clientId) {
  console.error('Error: Variables de entorno de Auth0 no definidas. Asegúrate de configurar VITE_AUTH0_DOMAIN y VITE_AUTH0_CLIENT_ID en el archivo .env');
}

// Función para generar un estado aleatorio
const generateRandomState = (): string => {
  const array = new Uint8Array(16);
  window.crypto.getRandomValues(array);
  return Array.from(array, byte => ('0' + (byte & 0xFF).toString(16)).slice(-2)).join('');
};

// Guardar el estado en localStorage para verificarlo después
const saveAuthState = (state: string): void => {
  localStorage.setItem('auth_state', state);
  localStorage.setItem('auth_state_timestamp', Date.now().toString());
};

// Verificar el estado recibido
const verifyAuthState = (receivedState: string): boolean => {
  const savedState = localStorage.getItem('auth_state');
  const timestamp = localStorage.getItem('auth_state_timestamp');

  // Limpiar el estado guardado
  localStorage.removeItem('auth_state');
  localStorage.removeItem('auth_state_timestamp');

  // Verificar que el estado no haya expirado (10 minutos)
  if (timestamp && (Date.now() - parseInt(timestamp)) > 10 * 60 * 1000) {
    console.error('Estado de autenticación expirado');
    return false;
  }

  return savedState === receivedState;
};

export const authService = {
  // Inicializar Auth0
  async init(): Promise<void> {
    try {
      console.log('Inicializando Auth0 con:');
      console.log('Domain:', domain);
      console.log('Client ID:', clientId);
      console.log('Redirect URI:', redirectUri);

      // Verificar si hay un código de autorización en la URL
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const state = urlParams.get('state');

      // Importar el store de carga para poder ocultar la pantalla si es necesario
      let loadingStore;
      try {
        const { useLoadingStore } = await import('../stores/loadingStore');
        loadingStore = useLoadingStore();
      } catch (e) {
        console.error('Error al importar loadingStore:', e);
      }

      if (code && state) {
        console.log('Código de autorización detectado, procesando callback');

        // Mostrar pantalla de carga durante el procesamiento del callback
        if (loadingStore) {
          loadingStore.showLoading('Completando inicio de sesión...');
        }

        // Verificar el estado
        if (!verifyAuthState(state)) {
          console.error('Error: Estado de autenticación inválido');
          window.history.replaceState({}, document.title, window.location.pathname);

          // Ocultar pantalla de carga
          if (loadingStore) {
            loadingStore.hideLoading();
          }
          return;
        }

        // Intercambiar el código por un token (esto normalmente se haría en el backend)
        // En este caso, simplemente marcamos al usuario como autenticado
        localStorage.setItem('auth_is_authenticated', 'true');
        localStorage.setItem('auth_timestamp', Date.now().toString());

        // Limpiar URL
        window.history.replaceState({}, document.title, window.location.pathname);
        console.log('Autenticación completada correctamente');

        // Ocultar pantalla de carga después de un breve retraso
        setTimeout(() => {
          if (loadingStore) {
            loadingStore.hideLoading();
          }
        }, 500);
      } else {
        // Si no hay código de autorización, asegurarse de que la pantalla de carga esté oculta
        if (loadingStore) {
          loadingStore.hideLoading();
        }
      }
    } catch (error) {
      console.error("Error al inicializar Auth0:", error);

      // Intentar limpiar el estado para evitar bucles
      window.history.replaceState({}, document.title, window.location.pathname);

      // Ocultar pantalla de carga en caso de error
      try {
        const { useLoadingStore } = await import('../stores/loadingStore');
        useLoadingStore().hideLoading();
      } catch (e) {
        console.error('Error al ocultar pantalla de carga:', e);
      }
    }
  },

  // Iniciar sesión
  async login(): Promise<void> {
    console.log('Iniciando login con Auth0');
    try {
      // Importar el store de carga dinámicamente para evitar dependencias circulares
      const { useLoadingStore } = await import('../stores/loadingStore');
      const loadingStore = useLoadingStore();

      // Mostrar pantalla de carga
      loadingStore.showLoading('Redirigiendo a la página de inicio de sesión...');

      // Generar y guardar estado
      const state = generateRandomState();
      saveAuthState(state);

      // Construir URL de autenticación
      const authUrl = new URL(`https://${domain}/authorize`);
      authUrl.searchParams.append('client_id', clientId);
      authUrl.searchParams.append('redirect_uri', redirectUri);
      authUrl.searchParams.append('response_type', 'code');
      authUrl.searchParams.append('scope', 'openid profile email');
      authUrl.searchParams.append('state', state);

      console.log('URL de autenticación:', authUrl.toString());

      // Pequeño retraso para asegurar que la pantalla de carga se muestre
      setTimeout(() => {
        // Redirigir a la URL de autenticación
        window.location.href = authUrl.toString();
      }, 500);
    } catch (error) {
      console.error('Error en login:', error);

      // Ocultar pantalla de carga en caso de error
      try {
        const { useLoadingStore } = await import('../stores/loadingStore');
        useLoadingStore().hideLoading();
      } catch (e) {
        console.error('Error al ocultar pantalla de carga:', e);
      }

      alert('Error al iniciar sesión. Por favor, intenta de nuevo.');
    }
  },

  // Verificar si el usuario está autenticado
  async isAuthenticated(): Promise<boolean> {
    try {
      const isAuthenticated = localStorage.getItem('auth_is_authenticated') === 'true';
      const timestamp = localStorage.getItem('auth_timestamp');

      // Verificar si la autenticación ha expirado (1 hora)
      if (isAuthenticated && timestamp) {
        const expirationTime = parseInt(timestamp) + (60 * 60 * 1000); // 1 hora
        if (Date.now() > expirationTime) {
          console.log('Sesión expirada');
          localStorage.removeItem('auth_is_authenticated');
          localStorage.removeItem('auth_timestamp');
          return false;
        }
      }

      console.log('¿Usuario autenticado?', isAuthenticated);
      return isAuthenticated;
    } catch (error) {
      console.error('Error al verificar autenticación:', error);
      return false;
    }
  },

  // Obtener el perfil del usuario (simulado)
  async getUser(): Promise<any> {
    try {
      const isAuth = await this.isAuthenticated();

      if (!isAuth) {
        console.log('Usuario no autenticado, no se puede obtener perfil');
        return null;
      }

      // Simulamos un usuario
      return {
        name: 'Usuario de Prueba',
        email: 'usuario@ejemplo.com'
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
      localStorage.removeItem('auth_is_authenticated');
      localStorage.removeItem('auth_timestamp');

      // Construir URL de logout
      const logoutUrl = new URL(`https://${domain}/v2/logout`);
      logoutUrl.searchParams.append('client_id', clientId);
      logoutUrl.searchParams.append('returnTo', window.location.origin);

      // Redirigir a la URL de logout
      window.location.href = logoutUrl.toString();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      // Redirección manual en caso de error
      window.location.href = '/';
    }
  }
};
