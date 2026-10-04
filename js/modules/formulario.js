import { validarCampo, validarFormulario, limparEstados } from "./validacao.js";
import { lerCadastros, salvarCadastro, lerRascunho, salvarRascunho, limparRascunho } from "./storage.js";
import { iniciarMascaras, limparMascaras } from "./mascaras.js";
import { mostrarToast, confirmar } from "./feedback.js";
import { listaCadastros } from "./templates.js";

const dadosDo = (form) => Object.fromEntries(new FormData(form));

function atualizarLista() {
  const ul = document.getElementById("lista-cadastros");
  if (ul) ul.innerHTML = listaCadastros(lerCadastros());
}

function restaurarRascunho(form) {
  Object.entries(lerRascunho()).forEach(([nome, valor]) => {
    const el = form.elements[nome];
    if (el && el.type !== "checkbox") el.value = valor;
  });
}

export function aposRenderizar() {
  const form = document.getElementById("form-cadastro");
  if (form) restaurarRascunho(form);
  iniciarMascaras();
  atualizarLista();
}

export function iniciarFormulario(app) {
  app.addEventListener("submit", async (e) => {
    if (e.target.id !== "form-cadastro") return;
    e.preventDefault();
    const form = e.target;
    if (!validarFormulario(form)) return;
    if (!(await confirmar("Confirmar cadastro", "Deseja enviar seus dados?"))) return;
    salvarCadastro(dadosDo(form));
    limparRascunho();
    form.reset();
    limparMascaras();
    limparEstados(form);
    atualizarLista();
    mostrarToast("Cadastro salvo com sucesso!");
  });

  app.addEventListener("input", (e) => {
    const form = e.target.form;
    if (!form || form.id !== "form-cadastro") return;
    salvarRascunho(dadosDo(form));
    if (e.target.classList.contains("is-invalid")) validarCampo(e.target);
  });

  app.addEventListener("focusout", (e) => {
    const campo = e.target;
    const dentro = campo.form?.id === "form-cadastro";
    if (dentro && campo.name && !["radio", "checkbox"].includes(campo.type)) validarCampo(campo);
  });
}
