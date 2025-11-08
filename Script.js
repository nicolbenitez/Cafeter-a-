document.addEventListener("DOMContentLoaded", () => {
  const btnMenu = document.getElementById("btn-menu");
  btnMenu.addEventListener("click", () => {
    document.getElementById("menu").scrollIntoView({ behavior: "smooth" });
  });
});
