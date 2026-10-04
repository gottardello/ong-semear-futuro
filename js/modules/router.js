import { templates } from "./templates.js";

const app = document.getElementById("app");
const TITULOS = { inicio: "Início", projetos: "Projetos", cadastro: "Cadastro" };

export function renderizar(rota, params, depois) {
  if (!templates[rota]) rota = "inicio";
  app.replaceChildren();
  app.insertAdjacentHTML("beforeend", templates[rota](params));
  document.title = `${TITULOS[rota]} | Semear Futuro`;
  document.querySelectorAll("nav a").forEach((a) => {
    const atual = a.getAttribute("href").split("?")[0] === `#/${rota}`;
    a.toggleAttribute("aria-current", false);
    if (atual && !a.closest(".submenu")) a.setAttribute("aria-current", "page");
  });
  window.scrollTo(0, 0);
  app.focus();
  if (depois) depois();
}

export function iniciarRouter(depois) {
  const navegar = () => {
    const [caminho, consulta = ""] = location.hash.slice(2).split("?");
    renderizar(caminho || "inicio", new URLSearchParams(consulta), depois);
  };
  window.addEventListener("hashchange", navegar);
  navegar();
}
