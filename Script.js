(function() {
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  const yearEl = document.getElementById('year');
  const contactForm = document.getElementById('contactForm');
  const clearForm = document.getElementById('clearForm');
  const orderBtns = document.querySelectorAll('.order-btn');

  menuToggle.addEventListener('click', function() {
    const expanded = mainNav.style.display === 'flex';
    mainNav.style.display = expanded ? '' : 'flex';
    mainNav.style.flexDirection = 'column';
  });

  yearEl.textContent = new Date().getFullYear();

  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const data = new FormData(contactForm);
    const name = data.get('name');
    alert(`Gracias, ${name}! Tu mensaje fue enviado correctamente.`);
    contactForm.reset();
  });

  clearForm.addEventListener('click', function() {
    contactForm.reset();
  });

  orderBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const item = btn.dataset.item || 'Producto';
      const precio = btn.parentElement.querySelector('.price')?.textContent || '';
      const confirmOrder = confirm(`¿Añadir ${item} (${precio}) al pedido?`);
      if (confirmOrder) alert(`${item} añadido al pedido.`);
    });
  });
})();
