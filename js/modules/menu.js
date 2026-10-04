export function iniciarMenu() {
  const botao = document.querySelector(".menu-toggle");
  const menu = document.getElementById("menu-principal");
  const definir = (aberto) => {
    botao.setAttribute("aria-expanded", String(aberto));
    botao.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
    menu.classList.toggle("is-open", aberto);
  };
  botao.addEventListener("click", () => definir(botao.getAttribute("aria-expanded") !== "true"));
  document.addEventListener("keydown", (e) => e.key === "Escape" && definir(false));
  window.addEventListener("hashchange", () => definir(false));
}
