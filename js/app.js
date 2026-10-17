// Estado da Aplicação
let currentQuickviewProduct = null;
let savedSettings = window.StorageService ? window.StorageService.getCustomSettings() : {};
let activeWhatsApp = savedSettings.whatsappNumber || (window.CONFIG ? window.CONFIG.whatsappNumber : "5598981935210");
let catalog = null;

// Inicialização após o carregamento do DOM
document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

function initApp() {
  initCategoryPills();
  initSearch();
  initCatalog();
  initCartDrawer();
  initQuickViewModal();
  initCheckoutModal();
  initSettingsModal();
  updateCartUI();

  // Ouve mudanças no carrinho
  if (window.cart) {
    window.cart.subscribe(() => {
      updateCartUI();
    });
  }

  // Ouve evento de reset de filtros
  window.addEventListener("reset-filters", () => {
    resetFilters();
  });
}

// Toast Notificações Flutuantes
function showToast(message, icon = "🛍️") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `
    <span class="toast-icon">${icon}</span>
    <span class="toast-text">${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

// Inicializa o catálogo
function initCatalog() {
  if (!window.CatalogComponent) return;

  catalog = new window.CatalogComponent("products-grid", {
    onAddToCart: (product, btn) => {
      if (window.cart) {
        window.cart.addItem(product, 1);
      }
      showToast(`${product.name} adicionado ao carrinho!`, "✨");

      // Feedback visual no botão
      if (btn) {
        const originalHtml = btn.innerHTML;
        btn.classList.add("added-success");
        btn.innerHTML = `✓ Adicionado!`;
        setTimeout(() => {
          btn.classList.remove("added-success");
          btn.innerHTML = originalHtml;
        }, 1200);
      }
    },
    onQuickView: (product) => {
      openQuickView(product);
    }
  });

  catalog.render();

  // Ordenação
  const sortSelect = document.getElementById("sort-select");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      catalog.setSort(e.target.value);
    });
  }
}

// Inicializa os botões de categoria
function initCategoryPills() {
  const container = document.getElementById("category-pills");
  const categories = window.CONFIG ? window.CONFIG.categories : [];
  if (!container) return;

  container.innerHTML = categories.map((cat) => `
    <button class="btn-category-pill ${cat.id === "all" ? "active" : ""}" data-category="${cat.id}">
      <span>${cat.icon}</span>
      <span>${cat.name}</span>
    </button>
  `).join("");

  container.querySelectorAll(".btn-category-pill").forEach((btn) => {
    btn.addEventListener("click", () => {
      container.querySelectorAll(".btn-category-pill").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const categoryId = btn.getAttribute("data-category");
      if (catalog) catalog.setCategory(categoryId);
    });
  });
}

// Inicializa a barra de pesquisa
function initSearch() {
  const searchInput = document.getElementById("search-input");
  const clearBtn = document.getElementById("search-clear");

  if (!searchInput) return;

  searchInput.addEventListener("input", (e) => {
    const val = e.target.value;
    if (catalog) catalog.setSearch(val);
    if (clearBtn) {
      if (val.length > 0) {
        clearBtn.classList.add("active");
      } else {
        clearBtn.classList.remove("active");
      }
    }
  });

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      searchInput.value = "";
      clearBtn.classList.remove("active");
      if (catalog) catalog.setSearch("");
      searchInput.focus();
    });
  }
}

// Reseta todos os filtros
function resetFilters() {
  const searchInput = document.getElementById("search-input");
  const clearBtn = document.getElementById("search-clear");
  if (searchInput) searchInput.value = "";
  if (clearBtn) clearBtn.classList.remove("active");

  const pills = document.querySelectorAll(".btn-category-pill");
  pills.forEach((p) => {
    if (p.getAttribute("data-category") === "all") {
      p.classList.add("active");
    } else {
      p.classList.remove("active");
    }
  });

  if (catalog) {
    catalog.setSearch("");
    catalog.setCategory("all");
  }
}

// ==================== CONTROLE DO CARRINHO ====================
function initCartDrawer() {
  const cartTrigger = document.getElementById("cart-trigger-btn");
  const closeDrawerBtn = document.getElementById("btn-close-drawer");
  const drawerOverlay = document.getElementById("cart-drawer-overlay");
  const clearCartLink = document.getElementById("btn-clear-cart");

  if (cartTrigger) {
    cartTrigger.addEventListener("click", () => openCartDrawer());
  }

  if (closeDrawerBtn) {
    closeDrawerBtn.addEventListener("click", () => closeCartDrawer());
  }

  if (drawerOverlay) {
    drawerOverlay.addEventListener("click", (e) => {
      if (e.target === drawerOverlay) {
        closeCartDrawer();
      }
    });
  }

  if (clearCartLink) {
    clearCartLink.addEventListener("click", () => {
      if (confirm("Deseja realmente esvaziar seu carrinho?")) {
        if (window.cart) window.cart.clear();
        showToast("Carrinho esvaziado.", "🗑️");
      }
    });
  }

  // Tecla ESC fecha os modais
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeCartDrawer();
      closeQuickView();
      closeCheckoutModal();
    }
  });
}

function openCartDrawer() {
  const drawerOverlay = document.getElementById("cart-drawer-overlay");
  if (drawerOverlay) {
    drawerOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeCartDrawer() {
  const drawerOverlay = document.getElementById("cart-drawer-overlay");
  if (drawerOverlay) {
    drawerOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }
}

// Atualiza a interface gráfica do carrinho e do header
function updateCartUI() {
  if (!window.cart) return;

  const totalCount = window.cart.getTotalCount();
  const totalPrice = window.cart.getTotalPrice();

  // Atualiza Badge do Header
  const badge = document.getElementById("header-cart-count");
  const totalPill = document.getElementById("header-cart-total");
  const drawerCountBadge = document.getElementById("drawer-cart-count-badge");

  if (badge) {
    badge.textContent = totalCount;
    badge.classList.remove("bounce");
    void badge.offsetWidth;
    badge.classList.add("bounce");
  }

  if (totalPill) {
    totalPill.textContent = `R$ ${totalPrice.toFixed(2).replace(".", ",")}`;
  }

  if (drawerCountBadge) {
    drawerCountBadge.textContent = `${totalCount} ${totalCount === 1 ? "item" : "itens"}`;
  }

  // Renderiza Itens do Carrinho
  renderCartItems();

  // Atualiza Valores do Resumo
  const subtotalEl = document.getElementById("cart-subtotal");
  const totalEl = document.getElementById("cart-total");
  const itemsCountText = document.getElementById("cart-items-count-text");
  const btnCheckoutWhatsapp = document.getElementById("btn-checkout-whatsapp");

  const formattedTotal = `R$ ${totalPrice.toFixed(2).replace(".", ",")}`;

  if (subtotalEl) subtotalEl.textContent = formattedTotal;
  if (totalEl) totalEl.textContent = formattedTotal;
  if (itemsCountText) itemsCountText.textContent = `${totalCount} ${totalCount === 1 ? "item" : "itens"}`;

  const hasItems = totalCount > 0;
  if (btnCheckoutWhatsapp) btnCheckoutWhatsapp.disabled = !hasItems;
}

// Renderiza a lista de itens dentro do drawer
function renderCartItems() {
  const container = document.getElementById("cart-items-container");
  if (!container || !window.cart) return;

  const items = window.cart.getItems();

  if (items.length === 0) {
    container.innerHTML = `
      <div class="cart-empty-state">
        <div class="empty-cart-icon">🛒</div>
        <h4>Seu carrinho está vazio</h4>
        <p>Aproveite nossa super promoção! Todos os itens por apenas R$ 5,00 cada.</p>
        <button class="btn btn-primary" id="btn-explore-catalog">Explorar Produtos</button>
      </div>
    `;

    const exploreBtn = container.querySelector("#btn-explore-catalog");
    if (exploreBtn) {
      exploreBtn.addEventListener("click", () => {
        closeCartDrawer();
        const grid = document.getElementById("catalog-section");
        if (grid) grid.scrollIntoView({ behavior: "smooth" });
      });
    }
    return;
  }

  container.innerHTML = items.map((item) => {
    const itemSubtotal = (item.price * item.quantity).toFixed(2).replace(".", ",");

    return `
      <div class="cart-item-row" data-id="${item.id}">
        <img src="${item.image}" alt="${item.name}" class="cart-item-thumb" onerror="this.src='https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80'" />
        <div class="cart-item-details">
          <h5 class="cart-item-name" title="${item.name}">${item.name}</h5>
          <div class="cart-item-price-unit">R$ 5,00 cada</div>
          
          <div class="cart-item-actions">
            <div class="cart-qty-controller">
              <button class="btn-qty" data-action="decrease" data-id="${item.id}" title="Diminuir">-</button>
              <span class="cart-qty-number">${item.quantity}</span>
              <button class="btn-qty" data-action="increase" data-id="${item.id}" title="Aumentar">+</button>
            </div>
            <span class="cart-item-subtotal">R$ ${itemSubtotal}</span>
          </div>
        </div>

        <button class="btn-remove-item" data-action="remove" data-id="${item.id}" title="Remover item">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18m-2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
        </button>
      </div>
    `;
  }).join("");

  // Listeners de quantidade e remoção
  container.querySelectorAll("[data-action='increase']").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      if (window.cart) window.cart.changeQuantity(id, 1);
    });
  });

  container.querySelectorAll("[data-action='decrease']").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      if (window.cart) window.cart.changeQuantity(id, -1);
    });
  });

  container.querySelectorAll("[data-action='remove']").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      if (window.cart) window.cart.removeItem(id);
    });
  });
}

// ==================== QUICK VIEW MODAL ====================
function initQuickViewModal() {
  const modalOverlay = document.getElementById("quickview-modal-overlay");
  const closeBtn = document.getElementById("btn-close-quickview");

  if (closeBtn) {
    closeBtn.addEventListener("click", closeQuickView);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) closeQuickView();
    });
  }

  const addBtn = document.getElementById("qv-add-to-cart-btn");
  const qtyInput = document.getElementById("qv-qty-input");
  const qtyMinus = document.getElementById("qv-qty-minus");
  const qtyPlus = document.getElementById("qv-qty-plus");

  if (qtyMinus && qtyInput) {
    qtyMinus.addEventListener("click", () => {
      let val = parseInt(qtyInput.value) || 1;
      if (val > 1) qtyInput.value = val - 1;
    });
  }

  if (qtyPlus && qtyInput) {
    qtyPlus.addEventListener("click", () => {
      let val = parseInt(qtyInput.value) || 1;
      qtyInput.value = val + 1;
    });
  }

  if (addBtn) {
    addBtn.addEventListener("click", () => {
      if (!currentQuickviewProduct || !window.cart) return;
      const qty = parseInt(qtyInput ? qtyInput.value : 1) || 1;
      window.cart.addItem(currentQuickviewProduct, qty);
      showToast(`${qty}x ${currentQuickviewProduct.name} adicionado!`, "🎉");
      closeQuickView();
      openCartDrawer();
    });
  }
}

function openQuickView(product) {
  currentQuickviewProduct = product;
  const overlay = document.getElementById("quickview-modal-overlay");
  if (!overlay) return;

  document.getElementById("qv-product-img").src = product.image;
  document.getElementById("qv-product-badge").textContent = product.badge || "PROMO R$ 5";
  document.getElementById("qv-product-category").textContent = catalog ? catalog.getCategoryName(product.category) : product.category;
  document.getElementById("qv-product-title").textContent = product.name;
  document.getElementById("qv-product-description").textContent = product.description;
  document.getElementById("qv-product-original-price").textContent = `De R$ ${product.originalPrice.toFixed(2).replace(".", ",")}`;
  document.getElementById("qv-product-rating").textContent = `★ ${product.rating} (${product.reviewsCount} avaliações)`;

  const qtyInput = document.getElementById("qv-qty-input");
  if (qtyInput) qtyInput.value = 1;

  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeQuickView() {
  const overlay = document.getElementById("quickview-modal-overlay");
  if (overlay) {
    overlay.classList.remove("active");
    document.body.style.overflow = "";
    currentQuickviewProduct = null;
  }
}

// ==================== CHECKOUT WHATSAPP MODAL ====================
function initCheckoutModal() {
  const checkoutModal = document.getElementById("checkout-modal-overlay");
  const closeBtn = document.getElementById("btn-close-checkout");
  const btnWhatsapp = document.getElementById("btn-checkout-whatsapp");
  const confirmWhatsappBtn = document.getElementById("btn-confirm-whatsapp-order");

  if (closeBtn) {
    closeBtn.addEventListener("click", closeCheckoutModal);
  }

  if (checkoutModal) {
    checkoutModal.addEventListener("click", (e) => {
      if (e.target === checkoutModal) closeCheckoutModal();
    });
  }

  if (btnWhatsapp) {
    btnWhatsapp.addEventListener("click", () => {
      closeCartDrawer();
      openCheckoutModal();
    });
  }

  if (confirmWhatsappBtn) {
    confirmWhatsappBtn.addEventListener("click", () => {
      const name = document.getElementById("checkout-name")?.value.trim();
      const address = document.getElementById("checkout-address")?.value.trim();
      const notes = document.getElementById("checkout-notes")?.value.trim();

      if (!name) {
        alert("Por favor, preencha seu nome para prosseguir.");
        document.getElementById("checkout-name")?.focus();
        return;
      }

      if (!window.cart) return;

      const whatsappUrl = window.cart.generateWhatsAppUrl({
        name,
        address,
        notes,
        whatsappOverride: activeWhatsApp
      });

      if (whatsappUrl) {
        window.open(whatsappUrl, "_blank");
        showToast("Redirecionando para o WhatsApp...", "💬");
        closeCheckoutModal();
      }
    });
  }
}

function openCheckoutModal() {
  const modal = document.getElementById("checkout-modal-overlay");
  if (!modal || !window.cart) return;

  const totalAmountEl = document.getElementById("checkout-summary-total");

  if (totalAmountEl) {
    totalAmountEl.textContent = `R$ ${window.cart.getTotalPrice().toFixed(2).replace(".", ",")}`;
  }

}

function closeCheckoutModal() {
  const modal = document.getElementById("checkout-modal-overlay");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
}

// ==================== CONFIGURAÇÃO DE WHATSAPP ====================
function initSettingsModal() {
  const triggerBtn = document.getElementById("btn-open-settings");
  const modal = document.getElementById("settings-modal-overlay");
  const closeBtn = document.getElementById("btn-close-settings");
  const saveBtn = document.getElementById("btn-save-settings");
  const inputPhone = document.getElementById("settings-whatsapp-input");

  if (triggerBtn && modal) {
    triggerBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (inputPhone) inputPhone.value = activeWhatsApp;
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    });
  }

  if (saveBtn && inputPhone) {
    saveBtn.addEventListener("click", () => {
      const clean = inputPhone.value.replace(/\D/g, "");
      if (clean.length < 10) {
        alert("Por favor, insira um número válido com DDD (Ex: 5511999999999).");
        return;
      }
      activeWhatsApp = clean;
      if (window.StorageService) {
        window.StorageService.saveCustomSettings({ whatsappNumber: clean });
      }
      showToast("Número de WhatsApp atualizado com sucesso!", "✅");
      modal.classList.remove("active");
      document.body.style.overflow = "";
    });
  }
}
