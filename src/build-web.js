import { loadProjects } from "./build-mainLeft";

/*
FIXME: qui scriviamo le cose generali che non 
vanno nei moduli specifici, come per esempio questa sotto
per esempio dobbiamo aggiungere il coso per l'hamburger menu
*/

export function duplicateInArray(text, array, objKey) {
  let result;
  array.forEach((obj) => {
    if (obj[objKey] === text) {
      result = true;
    }
  });

  return result;
}

function headerHamburgerMenu() {
  const menu = document.querySelector("header fa-bars");
  console.log(menu);
}

export default function buildAll() {
  headerHamburgerMenu();

  loadProjects();
  /*FIXME: occhio poi a quando ci sarà il local host */
}
