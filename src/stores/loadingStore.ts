// src/stores/loadingStore.ts
import { reactive, readonly } from 'vue';

// Estado inicial
const state = reactive({
  isLoading: false,
  message: 'Cargando...'
});

// Acciones para modificar el estado
const actions = {
  showLoading(message = 'Cargando...') {
    state.isLoading = true;
    state.message = message;
  },
  
  hideLoading() {
    state.isLoading = false;
  }
};

// Exportar un store readonly para evitar modificaciones directas
export const useLoadingStore = () => {
  return {
    state: readonly(state),
    ...actions
  };
};
