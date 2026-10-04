let instancias = [];

export function iniciarMascaras() {
  instancias.forEach((m) => m.destroy());
  instancias = [];
  if (typeof IMask === "undefined") return; // sem a biblioteca, valem o pattern e a validação em JS
  const aplicar = (id, opcoes) => {
    const el = document.getElementById(id);
    if (el) instancias.push(IMask(el, opcoes));
  };
  aplicar("cpf", { mask: "000.000.000-00" });
  aplicar("cep", { mask: "00000-000" });
  aplicar("telefone", { mask: [{ mask: "(00) 0000-0000" }, { mask: "(00) 00000-0000" }] });
}

export function limparMascaras() {
  instancias.forEach((m) => (m.value = ""));
}
