// Catálogo de Produtos da Loja 8º Tech
// Todos os produtos com valor promocional fixo de R$ 5,00

const PRODUCTS = [
  // ==================== PAPELARIA E VARIEDADES ====================
  {
    id: "pap-01",
    name: "Necessaire Verde Transparente com Zíper",
    category: "papelaria",
    price: 5.00,
    originalPrice: 14.90,
    badge: "✨ Prático",
    rating: 4.9,
    reviewsCount: 48,
    image: "images/necessaire_verde.jpg",
    description: "Necessaire retangular em material transparente verde neon com zíper reforçado e alça lateral. Ideal para organizar maquiagem, itens de papelaria ou viagem."
  },
  {
    id: "pap-02",
    name: "Caneca Temática Feliz Natal Papai Noel",
    category: "papelaria",
    price: 5.00,
    originalPrice: 18.00,
    badge: "🎄 Especial",
    rating: 5.0,
    reviewsCount: 35,
    image: "images/caneca_natal.jpg",
    description: "Caneca branca estampada com arte festiva de Papai Noel e mensagem 'Feliz Natal' em fundo verde. Perfeita para presentear ou entrar no clima natalino."
  },
  {
    id: "pap-03",
    name: "Areia Mágica com Forminhas Art Brink 120g",
    category: "papelaria",
    price: 5.00,
    originalPrice: 12.90,
    badge: "🎨 Diversão",
    rating: 4.8,
    reviewsCount: 62,
    image: "images/areia_forminhas.jpg",
    description: "Pote com 120g de areia modelável super macia acompanhada de forminha para criar esculturas divertidas. Recomendado para crianças a partir de 5 anos."
  },

  // ==================== BELEZA E CUIDADOS ====================
  {
    id: "bel-01",
    name: "Body Splash Soul Beauty Lumina Aura Shimmer 200ml",
    category: "beleza",
    price: 5.00,
    originalPrice: 19.90,
    badge: "✨ Shimmer",
    rating: 4.9,
    reviewsCount: 84,
    image: "images/body_splash_lumina_aura.webp",
    description: "Desodorante colônia Body Splash Lumina Aura com partículas de brilho (shimmer) que oferecem perfumação refrescante, brilho e cuidado para todo o corpo."
  },
  {
    id: "bel-02",
    name: "Esfoliante Corporal Nelô Doce de Leite 200g",
    category: "beleza",
    price: 5.00,
    originalPrice: 16.90,
    badge: "🔥 Destaque",
    rating: 5.0,
    reviewsCount: 91,
    image: "images/esfoliante_doce_de_leite.jpg",
    description: "Esfoliante corporal com proteínas do leite e delicioso aroma de doce de leite. Esfolia e hidrata profundamente com textura leve e rápida absorção."
  },
  {
    id: "bel-03",
    name: "Algodão Demaquilante Miamake 40 Unidades",
    category: "beleza",
    price: 5.00,
    originalPrice: 12.00,
    badge: "💧 Skincare",
    rating: 4.8,
    reviewsCount: 73,
    image: "images/algodao_demaquilante_miamake.jpg",
    description: "Pote com 40 discos de algodão 100% puro já umedecidos (70g) para remover a maquiagem e limpar a pele com praticidade no dia a dia."
  },
  {
    id: "bel-04",
    name: "Body Splash Nelô Bebê da Mamãe 130ml",
    category: "beleza",
    price: 5.00,
    originalPrice: 15.90,
    badge: "🌸 Suave",
    rating: 4.9,
    reviewsCount: 67,
    image: "images/body_splash_bebe_mamae.jpg",
    description: "Deo colônia Body Splash Bebê da Mamãe com fragrância suave, delicada e aconchegante de 130ml para uma sensação de frescor o dia todo."
  }
];

window.PRODUCTS = PRODUCTS;
