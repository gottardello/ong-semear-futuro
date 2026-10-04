export const esc = (t) =>
  String(t).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const projetos = [
  { slug: "educacao", titulo: "Reforço na Prática", texto: "Apoio em português e matemática.", categoria: "Educação", publico: "7 a 14 anos" },
  { slug: "alimentacao", titulo: "Prato Cheio", texto: "Refeições e cestas básicas.", categoria: "Alimentação", publico: "famílias da região" },
  { slug: "cultura", titulo: "Cultura em Roda", texto: "Oficinas de música, teatro e leitura.", categoria: "Cultura", publico: "todas as idades" },
];
const categorias = [["", "Todos"], ["educacao", "Educação"], ["alimentacao", "Alimentação"], ["cultura", "Cultura"]];
const UFS = "AC AL AP AM BA CE DF ES GO MA MT MS MG PA PB PR PE PI RJ RN RS RO RR SC SP SE TO".split(" ");

export const cartaoProjeto = ({ slug, titulo, texto, categoria, publico }) => `
  <article class="projeto col-sm-6 col-lg-4">
    <span class="badge badge--${slug}">${categoria}</span>
    <h3>${titulo}</h3><p>${texto}</p>
    <p><strong>Público:</strong> ${publico}</p>
    <a class="btn" href="#/cadastro">Quero participar</a>
  </article>`;

const campo = (id, rotulo, tipo = "text", extra = "") => `
  <div class="campo"><label for="${id}">${rotulo}</label>
  <input type="${tipo}" id="${id}" name="${id}" required aria-describedby="erro-${id}" ${extra}>
  <small class="erro-msg" id="erro-${id}"></small></div>`;

export const itemCadastro = (c) =>
  `<li><strong>${esc(c.nome)}</strong> (${esc(c.tipo)}) em ${new Date(c.id).toLocaleDateString("pt-BR")}</li>`;
export const listaCadastros = (lista) =>
  lista.length ? lista.map(itemCadastro).join("") : "<li>Nenhum cadastro salvo ainda.</li>";

export const templates = {
  inicio: () => `
  <section class="hero"><div class="container">
    <h1>Educação, alimento e cultura para quem mais precisa</h1>
    <p>Apoiamos crianças, jovens e famílias em situação de vulnerabilidade.</p>
    <a class="btn" href="#/cadastro">Quero ajudar</a></div></section>
  <section><div class="container">
    <h2>Quem somos</h2>
    <figure><picture><source srcset="../imagens/voluntarios.webp" type="image/webp">
    <img src="../imagens/voluntarios.jpg" alt="Voluntários da Semear Futuro ajudando crianças com as tarefas escolares em uma sala comunitária" width="800" height="450" loading="lazy"></picture>
    <figcaption>Aula de reforço escolar do projeto Reforço na Prática.</figcaption></figure>
    <p>Fundada em 2012, atua com reforço escolar, segurança alimentar e acesso à cultura.</p>
    <h3>Missão</h3><p>Garantir educação de qualidade e vida digna a toda criança.</p>
    <h3>Valores</h3><ul><li>Transparência</li><li>Respeito à diversidade</li><li>Participação da comunidade</li></ul>
  </div></section>
  <section><div class="container"><h2>Nosso impacto</h2>
    <ul class="numeros"><li><strong>3.200</strong>crianças atendidas</li><li><strong>450</strong>voluntários ativos</li><li><strong>85 mil</strong>refeições servidas</li></ul></div></section>
  <section><div class="container"><h2>Fale com a gente</h2>
    <address><p><strong>Endereço:</strong> Rua da Esperança, 100, Curitiba, PR</p>
    <p><strong>Telefone:</strong> <a href="tel:+554130000000">(41) 3000-0000</a></p>
    <p><strong>E-mail:</strong> <a href="mailto:contato@semearfuturo.org.br">contato@semearfuturo.org.br</a></p></address></div></section>`,

  projetos: (params) => {
    const cat = params?.get("cat") || "";
    const lista = projetos.filter((p) => !cat || p.slug === cat);
    return `
  <section><div class="container"><h1>Projetos sociais</h1>
    <ul class="filtros" aria-label="Filtrar por categoria">${categorias
      .map(([s, n]) => `<li><a href="#/projetos${s ? "?cat=" + s : ""}" aria-current="${s === cat}">${n}</a></li>`)
      .join("")}</ul>
    <div class="grid-12">${lista.map(cartaoProjeto).join("")}</div></div></section>
  <section><div class="container"><h2>Como doar</h2>
    <h3>Doação mensal</h3><p>Contribuição recorrente a partir de R$ 10.</p>
    <h3>Doação única</h3><p>Qualquer valor, por Pix ou transferência.</p></div></section>
  <section><div class="container"><h2>Como ser voluntário</h2>
    <ol><li>Faça seu cadastro.</li><li>Participe da conversa de integração.</li><li>Comece a atuar.</li></ol></div></section>
  <section><div class="container"><h2>Agenda de atividades</h2>
    <table><caption>Horários semanais</caption>
    <thead><tr><th scope="col">Projeto</th><th scope="col">Dia</th><th scope="col">Horário</th></tr></thead>
    <tbody><tr><th scope="row">Reforço na Prática</th><td>Segunda a quinta</td><td>14h às 17h</td></tr>
    <tr><th scope="row">Prato Cheio</th><td>Sexta e sábado</td><td>9h às 12h</td></tr>
    <tr><th scope="row">Cultura em Roda</th><td>Sábado</td><td>14h às 18h</td></tr></tbody></table></div></section>`;
  },

  cadastro: () => `
  <section><div class="container"><h1 id="t-cad">Cadastro de doadores e voluntários</h1>
    <div class="alerta" role="note">Seus dados ficam salvos apenas neste navegador, para fins de demonstração.</div>
    <form id="form-cadastro" action="#" method="post" novalidate aria-labelledby="t-cad">
    <fieldset><legend>Dados pessoais</legend><div class="campos">
      ${campo("nome", "Nome completo", "text", 'minlength="5" maxlength="100" autocomplete="name"')}
      ${campo("nascimento", "Data de nascimento", "date", 'autocomplete="bday"')}
      ${campo("cpf", "CPF", "text", 'inputmode="numeric" maxlength="14" pattern="\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}" placeholder="000.000.000-00" autocomplete="off"')}
      ${campo("email", "E-mail", "email", 'autocomplete="email"')}
      ${campo("telefone", "Telefone", "tel", 'inputmode="numeric" maxlength="15" pattern="\\(\\d{2}\\) \\d{4,5}-\\d{4}" placeholder="(00) 00000-0000" autocomplete="tel"')}
    </div></fieldset>
    <fieldset><legend>Endereço</legend><div class="campos">
      ${campo("cep", "CEP", "text", 'inputmode="numeric" maxlength="9" pattern="\\d{5}-\\d{3}" placeholder="00000-000" autocomplete="postal-code"')}
      ${campo("rua", "Rua", "text", 'autocomplete="address-line1"')}${campo("cidade", "Cidade", "text", 'autocomplete="address-level2"')}
      <div class="campo"><label for="uf">Estado</label>
      <select id="uf" name="uf" required autocomplete="address-level1" aria-describedby="erro-uf"><option value="">Selecione</option>${UFS.map((u) => `<option>${u}</option>`).join("")}</select>
      <small class="erro-msg" id="erro-uf"></small></div>
    </div></fieldset>
    <fieldset><legend>Como deseja ajudar</legend>
      <div class="grupo-check" role="radiogroup" aria-label="Tipo de apoio">
      <label><input type="radio" name="tipo" value="doador" required> Doador</label>
      <label><input type="radio" name="tipo" value="voluntário"> Voluntário</label>
      <label><input type="radio" name="tipo" value="ambos"> Ambos</label></div>
      <small class="erro-msg" id="erro-tipo"></small>
      <p><label><input type="checkbox" name="termos" required> Concordo com o uso dos meus dados, conforme a LGPD.</label></p>
      <small class="erro-msg" id="erro-termos"></small>
    </fieldset>
    <button class="btn" type="submit">Enviar cadastro</button></form></div></section>
  <section><div class="container"><h2>Cadastros salvos neste navegador</h2>
    <ul class="lista-cadastros" id="lista-cadastros"></ul></div></section>`,
};
