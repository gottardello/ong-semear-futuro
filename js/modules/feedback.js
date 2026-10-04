let timer;

export function mostrarToast(mensagem) {
  const toast = document.getElementById("toast");
  toast.textContent = mensagem;
  toast.classList.add("show");
  clearTimeout(timer);
  timer = setTimeout(() => toast.classList.remove("show"), 3500);
}

export function confirmar(titulo, texto) {
  const modal = document.getElementById("modal");
  modal.querySelector("#modal-titulo").textContent = titulo;
  modal.querySelector("#modal-texto").textContent = texto;
  modal.returnValue = "";
  return new Promise((resolver) => {
    modal.addEventListener("close", () => resolver(modal.returnValue === "ok"), { once: true });
    modal.showModal();
  });
}
