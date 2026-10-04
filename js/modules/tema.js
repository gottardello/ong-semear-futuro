const CHAVE = "semear:tema";

export function iniciarTema() {
  const botao = document.getElementById("btn-contraste");
  const raiz = document.documentElement;
  let salvo = null;
  try {
    salvo = localStorage.getItem(CHAVE);
  } catch {
    /* armazenamento indisponível */
  }
  const prefere = window.matchMedia("(prefers-contrast: more)").matches;
  const aplicar = (alto) => {
    if (alto) raiz.dataset.tema = "alto-contraste";
    else delete raiz.dataset.tema;
    botao.setAttribute("aria-pressed", String(alto));
  };
  aplicar(salvo ? salvo === "alto-contraste" : prefere);
  botao.addEventListener("click", () => {
    const alto = botao.getAttribute("aria-pressed") !== "true";
    aplicar(alto);
    try {
      localStorage.setItem(CHAVE, alto ? "alto-contraste" : "padrao");
    } catch {
      /* ignora */
    }
  });
}
