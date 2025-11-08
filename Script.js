document.addEventListener("DOMContentLoaded", () => {
  const btnMenu = document.getElementById("btn-menu");
  if (btnMenu) {
    btnMenu.addEventListener("click", () => {
      document.getElementById("menu").scrollIntoView({ behavior: "smooth" });
    });
  }
});
