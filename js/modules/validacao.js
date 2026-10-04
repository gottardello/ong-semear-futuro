export function cpfValido(cpf) {
  const n = cpf.replace(/\D/g, "");
  if (n.length !== 11 || /^(\d)\1+$/.test(n)) return false;
  const dv = (t) => {
    let s = 0;
    for (let i = 0; i < t; i++) s += Number(n[i]) * (t + 1 - i);
    const r = (s * 10) % 11;
    return r === 10 ? 0 : r;
  };
  return dv(9) === Number(n[9]) && dv(10) === Number(n[10]);
}

const regras = {
  nome: { re: /^.{5,}$/, msg: "Informe o nome completo." },
  nascimento: { re: /^\d{4}-\d{2}-\d{2}$/, msg: "Informe uma data válida." },
  cpf: { re: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/, msg: "Use 000.000.000-00.", extra: cpfValido },
  email: { re: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, msg: "Informe um e-mail válido." },
  telefone: { re: /^\(\d{2}\) \d{4,5}-\d{4}$/, msg: "Use (00) 00000-0000." },
  cep: { re: /^\d{5}-\d{3}$/, msg: "Use 00000-000." },
  rua: { re: /^.{3,}$/, msg: "Informe a rua." },
  cidade: { re: /^.{2,}$/, msg: "Informe a cidade." },
  uf: { re: /^[A-Z]{2}$/, msg: "Selecione o estado." },
};

export function mostrarEstado(campo, erro) {
  const msg = document.getElementById(`erro-${campo.name}`);
  campo.classList.toggle("is-invalid", Boolean(erro));
  campo.classList.toggle("is-valid", !erro && campo.type !== "radio" && campo.type !== "checkbox");
  campo.setAttribute("aria-invalid", String(Boolean(erro)));
  if (msg) msg.textContent = erro;
}

export function limparEstados(form) {
  [...form.elements].forEach((c) => {
    if (!c.name) return;
    c.classList.remove("is-invalid", "is-valid");
    c.removeAttribute("aria-invalid");
    const msg = document.getElementById(`erro-${c.name}`);
    if (msg) msg.textContent = "";
  });
}

export function validarCampo(campo) {
  let erro = "";
  if (campo.type === "radio") {
    if (!campo.form.elements[campo.name].value) erro = "Escolha uma opção.";
  } else if (campo.type === "checkbox") {
    if (!campo.checked) erro = "É preciso concordar para continuar.";
  } else {
    const regra = regras[campo.name];
    const valor = campo.value.trim();
    if (!valor) erro = "Campo obrigatório.";
    else if (regra && !regra.re.test(valor)) erro = regra.msg;
    else if (regra?.extra && !regra.extra(valor)) erro = "CPF inválido.";
  }
  mostrarEstado(campo, erro);
  return !erro;
}

export function validarFormulario(form) {
  const campos = [...form.elements].filter((c) => c.name && c.type !== "submit");
  const unicos = campos.filter((c, i) => c.type !== "radio" || campos.findIndex((x) => x.name === c.name) === i);
  const resultados = unicos.map((c) => [c, validarCampo(c)]);
  const primeiro = resultados.find(([, ok]) => !ok);
  if (primeiro) primeiro[0].focus();
  return !primeiro;
}
