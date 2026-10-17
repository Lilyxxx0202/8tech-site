// Gerenciador do Carrinho de Compras
class CartManager {
  constructor() {
    this.items = window.StorageService ? window.StorageService.getCart() : [];
    this.listeners = [];
  }

  // Inscreve ouvintes para atualizações de estado do carrinho
  subscribe(callback) {
    this.listeners.push(callback);
  }

  notify() {
    if (window.StorageService) {
      window.StorageService.saveCart(this.items);
    }
    this.listeners.forEach((callback) => callback(this.items));
  }

  // Adiciona produto ao carrinho
  addItem(product, quantity = 1) {
    const existingIndex = this.items.findIndex((item) => item.id === product.id);
    if (existingIndex > -1) {
      this.items[existingIndex].quantity += quantity;
    } else {
      this.items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        quantity: quantity
      });
    }
    this.notify();
  }

  // Atualiza quantidade (+1 ou -1)
  changeQuantity(productId, delta) {
    const index = this.items.findIndex((item) => item.id === productId);
    if (index > -1) {
      const newQty = this.items[index].quantity + delta;
      if (newQty <= 0) {
        this.removeItem(productId);
      } else {
        this.items[index].quantity = newQty;
        this.notify();
      }
    }
  }

  // Remove um item completamente
  removeItem(productId) {
    this.items = this.items.filter((item) => item.id !== productId);
    this.notify();
  }

  // Limpa o carrinho
  clear() {
    this.items = [];
    this.notify();
  }

  // Contagem total de itens
  getTotalCount() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  // Valor total da compra
  getTotalPrice() {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  // Retorna os itens
  getItems() {
    return [...this.items];
  }

  // Gera o link do WhatsApp com mensagem pronta formatada
  generateWhatsAppUrl(customerData = {}) {
    const totalCount = this.getTotalCount();
    const totalPrice = this.getTotalPrice();
    const storeConfig = window.CONFIG || { storeName: "8º Tech - tudo por R$5", whatsappNumber: "5598981935210" };

    if (totalCount === 0) return null;

    let message = `🛍️ *NOVO PEDIDO - 8º TECH*\n`;
    message += `──────────────────────\n`;
    
    if (customerData.name) {
      message += `👤 *Cliente:* ${customerData.name}\n`;
    }
    if (customerData.address) {
      message += `📍 *Endereço/Entrega:* ${customerData.address}\n`;
    }
    if (customerData.notes) {
      message += `📝 *Observação:* ${customerData.notes}\n`;
    }

    message += `──────────────────────\n`;
    message += `🛒 *ITENS DO PEDIDO (Tudo por R$ 5):*\n`;

    this.items.forEach((item, index) => {
      const subtotal = (item.price * item.quantity).toFixed(2);
      message += `${index + 1}. *${item.name}*\n`;
      message += `   ↳ Qtd: ${item.quantity}x de R$ 5,00 = R$ ${subtotal.replace(".", ",")}\n`;
    });

    message += `──────────────────────\n`;
    message += `📦 *Total de Itens:* ${totalCount} produtos\n`;
    message += `💰 *VALOR TOTAL:* R$ ${totalPrice.toFixed(2).replace(".", ",")}\n`;

    message += `──────────────────────\n`;
    message += `Olá! Gostaria de confirmar e finalizar meu pedido com você. Aguardo as informações para entrega! ✨`;

    // Número configurado no config ou sobreposto pelo usuário (exemplo: 5511999999999)
    const phone = customerData.whatsappOverride || storeConfig.whatsappNumber || "5598981935210";
    const cleanPhone = phone.replace(/\D/g, "");

    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  }
}

window.CartManager = CartManager;
window.cart = new CartManager();
