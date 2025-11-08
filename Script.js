(function(){
  // Año dinámico
  document.getElementById('year').textContent = new Date().getFullYear();

  // Menú móvil
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.querySelector('.main-nav');
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      mainNav.style.display = expanded ? '' : 'block';
    });
  }

  // Formulario de contacto
  const contactForm = document.getElementById('contactForm');
  contactForm?.addEventListener('submit', function(e){
    e.preventDefault();
    const name = this.name.value.trim();
    alert(`Gracias, ${name || 'amigo'}! Hemos recibido tu mensaje.`);
    this.reset();
  });

  // Suscripción
  const subscribeForm = document.getElementById('subscribeForm');
  subscribeForm?.addEventListener('submit', function(e){
    e.preventDefault();
    const email = this.subEmail.value.trim();
    alert(`Gracias! ${email} ha sido suscrito.`);
    this.reset();
  });
})();
