// Serviço de persistência local para o carrinho e preferências
const CART_STORAGE_KEY = "teen_variedades_cart_v1";
const SETTINGS_STORAGE_KEY = "teen_variedades_settings_v1";

const StorageService = {
  getCart() {
    try {
      const data = localStorage.getItem(CART_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("Erro ao carregar carrinho do localStorage:", e);
      return [];
    }
  },

  saveCart(cartItems) {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error("Erro ao salvar carrinho no localStorage:", e);
    }
  },

  clearCart() {
    try {
      localStorage.removeItem(CART_STORAGE_KEY);
    } catch (e) {
      console.error("Erro ao limpar carrinho do localStorage:", e);
    }
  },

  getCustomSettings() {
    try {
      const data = localStorage.getItem(SETTINGS_STORAGE_KEY);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      return {};
    }
  },

  saveCustomSettings(settings) {
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    } catch (e) {
      console.error("Erro ao salvar configurações no localStorage:", e);
    }
  }
};

window.StorageService = StorageService;
