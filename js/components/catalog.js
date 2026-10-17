// Componente de Catálogo de Produtos
class CatalogComponent {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.currentCategory = "all";
    this.searchQuery = "";
    this.sortBy = "default";
    this.onAddToCart = options.onAddToCart || null;
    this.onQuickView = options.onQuickView || null;
  }

  // Define categoria ativa
  setCategory(category) {
    this.currentCategory = category;
    this.render();
  }

  // Define termo de busca
  setSearch(query) {
    this.searchQuery = query.toLowerCase().trim();
    this.render();
  }

  // Define ordenação
  setSort(sortBy) {
    this.sortBy = sortBy;
    this.render();
  }

  // Filtra e ordena a lista
  getFilteredProducts() {
    const productsList = window.PRODUCTS || [];
    let filtered = productsList.filter((product) => {
      const matchCategory = this.currentCategory === "all" || product.category === this.currentCategory;
      const matchSearch = !this.searchQuery || 
        product.name.toLowerCase().includes(this.searchQuery) ||
        product.description.toLowerCase().includes(this.searchQuery) ||
        product.category.toLowerCase().includes(this.searchQuery);

      return matchCategory && matchSearch;
    });

    if (this.sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (this.sortBy === "name-asc") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (this.sortBy === "reviews") {
      filtered.sort((a, b) => b.reviewsCount - a.reviewsCount);
    }

    return filtered;
  }

  // Retorna o nome amigável da categoria
  getCategoryName(catId) {
    const categories = window.CONFIG ? window.CONFIG.categories : [];
    const found = categories.find(c => c.id === catId);
    return found ? found.name : catId;
  }

  // Renderiza a grade de produtos
  render() {
    if (!this.container) return;

    const products = this.getFilteredProducts();

    if (products.length === 0) {
      this.container.innerHTML = `
        <div class="empty-catalog-state">
          <div class="empty-icon">🔍</div>
          <h3>Nenhum produto encontrado</h3>
          <p>Não encontramos produtos para "<strong>${this.searchQuery}</strong>". Tente buscar por outro termo ou selecione outra categoria.</p>
          <button class="btn btn-secondary" id="btn-reset-filters">Ver todos os produtos</button>
        </div>
      `;

      const resetBtn = this.container.querySelector("#btn-reset-filters");
      if (resetBtn) {
        resetBtn.addEventListener("click", () => {
          window.dispatchEvent(new CustomEvent("reset-filters"));
        });
      }
      return;
    }

    this.container.innerHTML = products.map((product) => {
      const categoryName = this.getCategoryName(product.category);

      return `
        <article class="product-card" data-id="${product.id}">
          <div class="product-badge-group">
            ${product.badge ? `<span class="badge badge-promo">${product.badge}</span>` : ""}
            <span class="badge badge-fixed-price">R$ 5,00</span>
          </div>

          <div class="product-image-wrap" data-quickview-id="${product.id}">
            <img 
              src="${product.image}" 
              alt="${product.name}" 
              loading="lazy" 
              class="product-image"
              onerror="this.src='https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80'"
            />
            <button class="btn-quickview-overlay" title="Ver detalhes rápidos" data-quickview-id="${product.id}">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              Espiar
            </button>
          </div>

          <div class="product-info">
            <div class="product-category-tag">${categoryName}</div>
            <h3 class="product-title" title="${product.name}">${product.name}</h3>

            <div class="product-rating">
              <span class="stars">★★★★★</span>
              <span class="rating-score">${product.rating}</span>
              <span class="reviews-count">(${product.reviewsCount})</span>
            </div>

            <div class="product-pricing">
              <div class="price-box">
                <span class="price-from">De R$ ${product.originalPrice.toFixed(2).replace(".", ",")}</span>
                <span class="price-current">R$ 5,00</span>
              </div>
              <span class="price-pill-discount">PROMO</span>
            </div>

            <button class="btn btn-add-cart" data-add-id="${product.id}" aria-label="Adicionar ${product.name} ao carrinho">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
              Adicionar por R$ 5
            </button>
          </div>
        </article>
      `;
    }).join("");

    // Adiciona listeners para os botões de adicionar ao carrinho
    this.container.querySelectorAll("[data-add-id]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = e.currentTarget.getAttribute("data-add-id");
        const product = (window.PRODUCTS || []).find((p) => p.id === id);
        if (product && this.onAddToCart) {
          this.onAddToCart(product, btn);
        }
      });
    });

    // Adiciona listeners para Quickview
    this.container.querySelectorAll("[data-quickview-id]").forEach((elem) => {
      elem.addEventListener("click", (e) => {
        if (e.target.closest("[data-add-id]")) return;
        const id = elem.getAttribute("data-quickview-id");
        const product = (window.PRODUCTS || []).find((p) => p.id === id);
        if (product && this.onQuickView) {
          this.onQuickView(product);
        }
      });
    });
  }
}

window.CatalogComponent = CatalogComponent;
