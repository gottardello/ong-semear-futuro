import { iniciarRouter } from "./modules/router.js";
import { iniciarMenu } from "./modules/menu.js";
import { iniciarFormulario, aposRenderizar } from "./modules/formulario.js";

iniciarMenu();
iniciarFormulario(document.getElementById("app"));
iniciarRouter(aposRenderizar);
