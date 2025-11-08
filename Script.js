// Año automático en el pie de página
document.getElementById("year").textContent = new Date().getFullYear();

// Validación simple del formulario de contacto
document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();
  alert("Gracias por contactarnos. Te responderemos pronto ☕");
  this.reset();
});
