// Configurações gerais da loja 8º Tech
const CONFIG = {
  storeName: "8º Tech - tudo por R$5",
  storeTagline: "O melhor da tecnologia, papelaria e universo geek por apenas R$ 5,00",
  fixedPrice: 5.0,
  currencySymbol: "R$",
  
  // Número de WhatsApp para onde os pedidos serão direcionados (formato internacional com DDD, ex: 5511999999999)
  whatsappNumber: "5598981935210", 
  
  categories: [
    { id: "all", name: "Todos os Itens", icon: "✨" },
    { id: "papelaria", name: "Papelaria", icon: "✏️" },
    { id: "beleza", name: "Beleza e Cuidados", icon: "💄" },
    { id: "otaku-kpop", name: "Zona Otaku & K-Pop", icon: "⚡" }
  ]
};

// Disponibiliza globalmente
window.CONFIG = CONFIG;
