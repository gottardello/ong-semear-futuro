import { defineConfig } from "vite";

// Remove comentários e quebras de linha entre tags no HTML final.
const minificarHtml = () => ({
  name: "minificar-html",
  enforce: "post",
  transformIndexHtml: (html) =>
    html.replace(/<!--[\s\S]*?-->/g, "").replace(/>\s*\n\s*</g, "><").trim(),
});

export default defineConfig({
  root: "html",   // index.html fica em html/
  base: "./",     // caminhos relativos: funciona em subpasta (GitHub Pages)
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    minify: "esbuild",  // minifica JS e CSS
    cssMinify: true,
    assetsInlineLimit: 0,
  },
  plugins: [minificarHtml()],
});
