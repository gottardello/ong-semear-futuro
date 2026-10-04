const CAD = "semear:cadastros";
const RASC = "semear:rascunho";

function ler(chave, padrao) {
  try {
    return JSON.parse(localStorage.getItem(chave)) ?? padrao;
  } catch {
    return padrao;
  }
}
function gravar(chave, valor) {
  try {
    localStorage.setItem(chave, JSON.stringify(valor));
  } catch {
    /* armazenamento indisponível ou cheio */
  }
}

export const lerCadastros = () => ler(CAD, []);
export function salvarCadastro(dados) {
  gravar(CAD, [...lerCadastros(), { ...dados, id: Date.now() }]);
}
export const lerRascunho = () => ler(RASC, {});
export const salvarRascunho = (dados) => gravar(RASC, dados);
export const limparRascunho = () => localStorage.removeItem(RASC);
