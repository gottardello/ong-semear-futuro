# Semear Futuro

Plataforma web (SPA) para uma ONG fictícia do terceiro setor, que apresenta projetos sociais e cadastra doadores e voluntários. Projeto acadêmico de Desenvolvimento Front-end.

## Tecnologias
HTML5 semântico, CSS3 (variáveis, Grid de 12 colunas, Flexbox, modo de alto contraste), JavaScript ES6 modular, localStorage, biblioteca IMask (via CDN) e Vite (build de produção).

## Estrutura
```
html/index.html        página única da aplicação
css/                   reset.css, variables.css, styles.css
imagens/               logo e imagens (JPG e WebP)
js/main.js             ponto de entrada
js/modules/            router, templates, validacao, storage,
                       mascaras, menu, feedback, formulario
```

## Instalação e execução local
Os módulos ES6 não funcionam abrindo o arquivo direto no navegador. É preciso um servidor local.

1. Instale o Git e o Python 3 (ou o VS Code com a extensão Live Server).
2. Clone o repositório: `git clone <URL-DO-REPOSITORIO>`
3. Entre na pasta: `cd ong-semear-futuro`
4. Inicie o servidor: `python -m http.server 8000` (no Mac/Linux, `python3`).
5. Acesse `http://localhost:8000/html/index.html`.

Com o Live Server: clique com o botão direito em `html/index.html` e escolha "Open with Live Server".

## Uso
- Navegue entre Início, Projetos e Cadastro pelo menu (no celular, pelo botão hambúrguer).
- No cadastro, preencha o formulário. Os dados validados ficam salvos no localStorage deste navegador, e o rascunho é recuperado ao recarregar.

## Versionamento
O projeto segue o GitFlow:
- `main`: versões estáveis, marcadas com tags (SemVer, ex.: v1.0.0).
- `develop`: integração das funcionalidades.
- `feature/*`: novas funcionalidades, criadas a partir da `develop`.
- `release/*`: preparação de versões.
- `hotfix/*`: correções urgentes a partir da `main`.

Os commits seguem o padrão Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`). A integração entre branches é feita por pull requests.

## Manutenção
- Cores, fontes e espaçamentos ficam em `css/variables.css`.
- Novas páginas: crie uma função em `js/modules/templates.js` e registre a rota no objeto `templates`.
- Regras de validação ficam em `js/modules/validacao.js`.

## Build de produção
Requer Node.js 20 ou superior.
- `npm install`: instala as dependências.
- `npm run build`: gera a pasta `dist/` com CSS, JavaScript e HTML minificados.
- `npm run preview`: serve o build localmente para conferência.
- `npm run dev`: servidor de desenvolvimento com recarga automática.

## Deploy (CI/CD)
Hospedagem: GitHub Pages. O workflow `.github/workflows/deploy.yml` roda a cada push na branch `main`: instala as dependências com `npm ci`, executa o build e publica a pasta `dist/`. A navegação usa hash (`#/projetos`), por isso não exige configuração de rotas no servidor.

Endereço publicado: _preencher após o deploy_.

## Observações
Os dados do localStorage ficam apenas no navegador do usuário e não devem conter informações sensíveis em produção.
