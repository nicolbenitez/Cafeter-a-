/* Tienda - carrito simulado con persistencia en localStorage */
(() => {
  // Productos de ejemplo (id, nombre, descripcion, precio en COP)
  const PRODUCTS = [
    { id: 'caf1', name: 'Bolsita 250g - Origen Colombia', desc: 'Tueste medio, notas a caramelo', price: 22000 },
    { id: 'caf2', name: 'Café Molido 500g - Espresso', desc: 'Mezcla intensa para café de filtro y espresso', price: 36000 },
    { id: 'latte', name: 'Latte listo 350ml', desc: 'Para llevar: espresso + leche vaporizada', price: 8000 },
    { id: 'cold', name: 'Cold Brew 300ml', desc: 'Extracción fría, refrescante', price: 9000 },
    { id: 'combo1', name: 'Combo Café + Croissant', desc: 'Ahorra y disfruta', price: 12500 },
    { id: 'torta', name: 'Porción Torta del Día', desc: 'Casera, porción individual', price: 7000 }
  ];

  // Selectores
  const productListEl = document.getElementById('productList');
  const productTpl = document.getElementById('productTpl');
  const cartBtn = document.getElementById('cartBtn');
  const cartPanel = document.getElementById('cartPanel');
  const overlay = document.getElementById('overlay');
  const closeCart = document.getElementById('closeCart');
  const cartItemsEl = document.getElementById('cartItems');
  const cartCountEl = document.getElementById('cartCount');
  const subtotalEl = document.getElementById('subtotal');
  const shippingEl = document.getElementById('shipping');
  const totalEl = document.getElementById('total');
  const clearCartBtn = document.getElementById('clearCart');
  const checkoutBtn = document.getElementById('checkoutBtn');

  // Estado del carrito
  let cart = loadCart();

  // Utilidades
  function formatCOP(n) {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n);
  }

  function saveCart() {
    try {
      localStorage.setItem('laestacion_cart_v1', JSON.stringify(cart));
    } catch (e) { /* ignore */ }
  }

  function loadCart() {
    try {
      const raw = localStorage.getItem('laestacion_cart_v1');
      if (!raw) return {};
      return JSON.parse(raw);
    } catch (e) { return {}; }
  }

  function computeTotals() {
    const items = Object.values(cart);
    const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
    // regla simple de envío: envío gratuito si subtotal >= 50000
    const shipping = subtotal === 0 ? 0 : (subtotal >= 50000 ? 0 : 6000);
    const total = subtotal + shipping;
    return { subtotal, shipping, total };
  }

  // Render productos en la página
  function renderProducts() {
    productListEl.innerHTML = '';
    PRODUCTS.forEach(p => {
      const tpl = productTpl.content.cloneNode(true);
      tpl.querySelector('.product-title').textContent = p.name;
      tpl.querySelector('.product-desc').textContent = p.desc;
      tpl.querySelector('.price').textContent = formatCOP(p.price);
      tpl.querySelector('.media').textContent = '☕';
      const qtyInput = tpl.querySelector('.qty');
      qtyInput.value = 1;
      const addBtn = tpl.querySelector('.add-to-cart');
      addBtn.addEventListener('click', () => {
        const qty = Math.max(1, Math.floor(Number(qtyInput.value) || 1));
        addToCart(p.id, p.name, p.price, qty);
      });
      productListEl.appendChild(tpl);
    });
  }

  // Añadir al carrito
  function addToCart(id, name, price, qty) {
    if (cart[id]) {
      cart[id].qty += qty;
    } else {
      cart[id] = { id, name, price, qty };
    }
    saveCart();
    renderCart();
    openCart();
  }

  // Eliminar item
  function removeFromCart(id) {
    delete cart[id];
    saveCart();
    renderCart();
  }

  // Actualizar cantidad
  function updateQty(id, qty) {
    qty = Math.max(1, Math.floor(Number(qty) || 1));
    if (cart[id]) {
      cart[id].qty = qty;
      saveCart();
      renderCart();
    }
  }

  // Vaciar carrito
  function clearCart() {
    cart = {};
    saveCart();
    renderCart();
  }

  // Render carrito lateral
  function renderCart() {
    cartItemsEl.innerHTML = '';
    const items = Object.values(cart);
    if (items.length === 0) {
      cartItemsEl.innerHTML = '<p style="color:#7b6b62">Tu carrito está vacío.</p>';
    } else {
      items.forEach(it => {
        const itemEl = document.createElement('div');
        itemEl.className = 'cart-item';
        itemEl.innerHTML = `
          <div class="thumb">☕</div>
          <div class="meta">
            <div class="name">${it.name}</div>
            <div class="small">${formatCOP(it.price)} · <span class="qty-inline">x ${it.qty}</span></div>
            <div style="margin-top:6px;display:flex;gap:8px;align-items:center">
              <input type="number" class="cart-qty" min="1" value="${it.qty}" style="width:72px;padding:6px;border-radius:8px;border:1px solid #e6e0db">
              <button class="btn small remove-item">Eliminar</button>
            </div>
          </div>
        `;
        // handlers
        itemEl.querySelector('.remove-item').addEventListener('click', () => removeFromCart(it.id));
        itemEl.querySelector('.cart-qty').addEventListener('change', (e) => updateQty(it.id, e.target.value));
        cartItemsEl.appendChild(itemEl);
      });
    }

    // Totales
    const { subtotal, shipping, total } = computeTotals();
    subtotalEl.textContent = formatCOP(subtotal);
    shippingEl.textContent = shipping === 0 ? 'Gratis' : formatCOP(shipping);
    totalEl.textContent = formatCOP(total);

    // contador
    const count = items.reduce((s, it) => s + it.qty, 0);
    cartCountEl.textContent = String(count);
  }

  // Abrir / cerrar carrito
  function openCart() {
    cartPanel.classList.add('open');
    cartPanel.setAttribute('aria-hidden', 'false');
    overlay.hidden = false;
  }
  function closeCartPanel() {
    cartPanel.classList.remove('open');
    cartPanel.setAttribute('aria-hidden', 'true');
    overlay.hidden = true;
  }

  // Checkout simulado
  function checkout() {
    const { subtotal, shipping, total } = computeTotals();
    if (subtotal === 0) {
      alert('Tu carrito está vacío.');
      return;
    }
    // información breve de compra
    let summary = 'Resumen de tu pedido:\\n';
    Object.values(cart).forEach(it => {
      summary += `- ${it.name} x${it.qty} = ${formatCOP(it.price * it.qty)}\\n`;
    });
    summary += `\\nSubtotal: ${formatCOP(subtotal)}\\nEnvío: ${shipping === 0 ? 'Gratis' : formatCOP(shipping)}\\nTotal: ${formatCOP(total)}\\n\\n¿Confirmas el pedido?`;
    const ok = confirm(summary);
    if (ok) {
      // simulación de finalización: limpiar carrito y mostrar mensaje
      clearCart();
      alert('¡Gracias! Tu pedido fue recibido. Nos pondremos en contacto para coordinar la entrega.');
      closeCartPanel();
    }
  }

  // Eventos UI
  cartBtn.addEventListener('click', openCart);
  closeCart.addEventListener('click', closeCartPanel);
  overlay.addEventListener('click', closeCartPanel);
  clearCartBtn.addEventListener('click', () => {
    if (confirm('¿Vaciar el carrito?')) clearCart();
  });
  checkoutBtn.addEventListener('click', checkout);

  // Inicializar
  renderProducts();
  renderCart();

  // menú móvil simple
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  menuToggle?.addEventListener('click', () => {
    const visible = mainNav.style.display === 'flex';
    mainNav.style.display = visible ? '' : 'flex';
    mainNav.style.flexDirection = 'column';
  });

})();
