(() => {
  const PRODUCTS = [
    { id: 'caf1', name: 'Bolsita 250g - Origen Colombia', desc: 'Tueste medio, notas a caramelo', price: 22000, img: 'images/cafe-bolsita.jpg' },
    { id: 'caf2', name: 'Café Molido 500g - Espresso', desc: 'Mezcla intensa para espresso', price: 36000, img: 'images/cafe-molido.jpg' },
    { id: 'latte', name: 'Latte listo 350ml', desc: 'Espresso + leche vaporizada', price: 8000, img: 'images/latte.jpg' },
    { id: 'cold', name: 'Cold Brew 300ml', desc: 'Extracción fría y refrescante', price: 9000, img: 'images/coldbrew.jpg' },
    { id: 'combo1', name: 'Combo Café + Croissant', desc: 'Perfecto para la mañana', price: 12500, img: 'images/combo.jpg' },
    { id: 'torta', name: 'Porción Torta del Día', desc: 'Casera y esponjosa', price: 7000, img: 'images/torta.jpg' }
  ];

  const productListEl = document.getElementById('productList');
  const tpl = document.getElementById('productTpl');
  const cartBtn = document.getElementById('cartBtn');
  const cartPanel = document.getElementById('cartPanel');
  const overlay = document.getElementById('overlay');
  const closeCart = document.getElementById('closeCart');
  const cartItemsEl = document.getElementById('cartItems');
  const cartCountEl = document.getElementById('cartCount');
  const subtotalEl = document.getElementById('subtotal'
