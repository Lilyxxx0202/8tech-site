// Catálogo de Produtos da Loja 8º Tech
// Todos os produtos com valor promocional fixo de R$ 5,00

const PRODUCTS = [
  // ==================== PAPELARIA ====================
  {
    id: "pap-01",
    name: "Caneta Gel Ponta Fina Kawaii Patinha de Gato",
    category: "papelaria",
    price: 5.00,
    originalPrice: 12.90,
    badge: "Mais Vendido",
    rating: 4.9,
    reviewsCount: 142,
    image: "https://images.unsplash.com/photo-1585336261026-75f8507c34b1?w=600&auto=format&fit=crop&q=80",
    description: "Caneta de tinta gel preta 0.5mm com corpo macio e design fofo em formato de patinha. Escrita ultra macia e secagem rápida."
  },
  {
    id: "pap-02",
    name: "Kit Marcador de Página Holográfico & Sticky Notes",
    category: "papelaria",
    price: 5.00,
    originalPrice: 14.00,
    badge: "✨ Kawaii",
    rating: 4.8,
    reviewsCount: 98,
    image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600&auto=format&fit=crop&q=80",
    description: "Cartela com marcadores translúcidos pastel e holográficos. Perfeitos para estudos, bullet journal e livros."
  },
  {
    id: "pap-03",
    name: "Fita Washi Tape Decorativa Estética Pastel",
    category: "papelaria",
    price: 5.00,
    originalPrice: 10.00,
    badge: "🌸 Fofo",
    rating: 4.7,
    reviewsCount: 65,
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop&q=80",
    description: "Rolo de fita adesiva decorativa washi tape de papel japonês com estampas suaves. Fácil de colar e descolar sem rasgar."
  },
  {
    id: "pap-04",
    name: "Mini Caderno Pocket Espiral Pautado Candy Color",
    category: "papelaria",
    price: 5.00,
    originalPrice: 11.50,
    badge: "⭐ Destaque",
    rating: 4.9,
    reviewsCount: 88,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80",
    description: "Bloquinho de anotações tamanho de bolso com capa dura colorida e folhas pautadas de alta gramatura."
  },
  {
    id: "pap-05",
    name: "Borracha Retrátil Tipo Caneta Estilo Macaron",
    category: "papelaria",
    price: 5.00,
    originalPrice: 9.90,
    badge: "✨ Prático",
    rating: 4.8,
    reviewsCount: 52,
    image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=600&auto=format&fit=crop&q=80",
    description: "Borracha em formato de caneta retrátil que não suja a mão e apaga com extrema precisão."
  },
  {
    id: "pap-06",
    name: "Kit 50 Adesivos Aesthetic Vintage & Flores",
    category: "papelaria",
    price: 5.00,
    originalPrice: 15.00,
    badge: "🔥 Sucesso",
    rating: 5.0,
    reviewsCount: 110,
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80",
    description: "Pack impermeável com 50 adesivos vinílicos de alta qualidade para personalizar notebook, garrafas e cadernos."
  },

  // ==================== BELEZA E CUIDADOS ====================
  {
    id: "bel-01",
    name: "Lip Tint Frutas Vermelhas Longa Duração",
    category: "beleza",
    price: 5.00,
    originalPrice: 16.90,
    badge: "🔥 Mais Vendido",
    rating: 4.9,
    reviewsCount: 205,
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&auto=format&fit=crop&q=80",
    description: "Coradinho natural para lábios e bochechas com aroma delicioso de frutas e efeito stain que dura horas."
  },
  {
    id: "bel-02",
    name: "Máscara Facial Coreana Sheet Mask Ácido Hialurônico",
    category: "beleza",
    price: 5.00,
    originalPrice: 14.50,
    badge: "💧 Hidratação",
    rating: 4.8,
    reviewsCount: 173,
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&auto=format&fit=crop&q=80",
    description: "Máscara de tecido de hidratação profunda no melhor estilo K-Beauty para um viço iluminado e radiante."
  },
  {
    id: "bel-03",
    name: "Esponja Gota Soft Blender para Maquiagem",
    category: "beleza",
    price: 5.00,
    originalPrice: 12.00,
    badge: "⭐ Essencial",
    rating: 4.9,
    reviewsCount: 130,
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80",
    description: "Esponja anatômica ultra macia que expande na água, garantindo acabamento uniforme e sem marcas de base."
  },
  {
    id: "bel-04",
    name: "Scrunchie de Cetim Anti-Frizz Velvet Soft",
    category: "beleza",
    price: 5.00,
    originalPrice: 10.90,
    badge: "🌸 Cabelos",
    rating: 4.8,
    reviewsCount: 92,
    image: "https://images.unsplash.com/photo-1590439471364-192aa70c0b53?w=600&auto=format&fit=crop&q=80",
    description: "Xuxinha elástica em tecido acetinado premium que previne quebra e reduz o frizz dos fios."
  },
  {
    id: "bel-05",
    name: "Lip Balm Hidratante de Morango com Brilho Suave",
    category: "beleza",
    price: 5.00,
    originalPrice: 11.00,
    badge: "🍓 Doce",
    rating: 4.7,
    reviewsCount: 78,
    image: "https://images.unsplash.com/photo-1617897903246-719242758050?w=600&auto=format&fit=crop&q=80",
    description: "Bálsamo labial com manteiga nutritiva e cheirinho irresistível que deixa os lábios macios o dia todo."
  },
  {
    id: "bel-06",
    name: "Mini Espelho Duplo de Bolsa Retrátil Estampado",
    category: "beleza",
    price: 5.00,
    originalPrice: 13.00,
    badge: "✨ Prático",
    rating: 4.9,
    reviewsCount: 64,
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&auto=format&fit=crop&q=80",
    description: "Espelhinho compacto com duas faces (uma normal e outra com lente de aumento) ideal para retoques rápidos."
  },

  // ==================== ZONA OTAKU & K-POP ====================
  {
    id: "ota-01",
    name: "Adesivos HunterxHunter ",
    category: "otaku-kpop",
    price: 5.00,
    originalPrice: 18.00,
    badge: "🔥 Mais Vendido",
    rating: 5.0,
    reviewsCount: 220,
    image: "images/hunxhun.PNG",
    description: "Adesivos em papel colante no tema hunterxhunter."
  },
  {
    id: "ota-02",
    name: "Adesivos Jujutsu Kaisen",
    category: "otaku-kpop",
    price: 5.00,
    originalPrice: 20.00,
    badge: "⚡ Anime",
    rating: 4.9,
    reviewsCount: 185,
    image: "images/jujutsuk01.jpg",
    description: "Adesivos em papel colante no tema Jujutsu Kaisen."
  },
  {
    id: "ota-03",
    name: "Poster One Piece",
    category: "otaku-kpop",
    price: 5.00,
    originalPrice: 14.00,
    badge: "⭐ Anime",
    rating: 4.8,
    reviewsCount: 94,
    image: "images/onepieceposter.jpg",
    description: "Poster One Piece em alta qualidade, tamanho 21cmx29cm."
  },
  {
    id: "ota-04",
    name: "Adesivo BTS",
    category: "otaku-kpop",
    price: 5.00,
    originalPrice: 16.50,
    badge: "✨ K-pop",
    rating: 4.9,
    reviewsCount: 140,
    image: "images/bts_stickers01.png",
    description: "Lindos adesivos em papel colante no tema BTS."
  },
  {
    id: "ota-05",
    name: "Adesivo BTS 02",
    category: "otaku-kpop",
    price: 5.00,
    originalPrice: 15.00,
    badge: "🔥 K-pop",
    rating: 4.9,
    reviewsCount: 162,
    image: "images/bts_stickers02.jpg",
    description: "Variação linda adesivos em papel colante no tema BTS."
  },
  {
    id: "ota-06",
    name: "Adesivo BlackPink",
    category: "otaku-kpop",
    price: 5.00,
    originalPrice: 12.00,
    badge: "🌸 K-pop",
    rating: 4.8,
    reviewsCount: 77,
    image: "images/blackpink_stickers02.jpg",
    description: "Lindos adesivos em papel colante no tema Blackpink."
  }
];

window.PRODUCTS = PRODUCTS;
