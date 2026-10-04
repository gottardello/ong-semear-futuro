import { iniciarRouter } from "./modules/router.js";
import { iniciarTema } from "./modules/tema.js";
import { iniciarMenu } from "./modules/menu.js";
import { iniciarFormulario, aposRenderizar } from "./modules/formulario.js";

iniciarTema();
iniciarMenu();
iniciarFormulario(document.getElementById("app"));
iniciarRouter(aposRenderizar);
