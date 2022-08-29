import { loadProjects } from "./build-mainLeft";
import {
  generateInbox,
  generatePage,
  addListeners,
  loadInboxTasks,
} from "./build-mainRight";

/*
FIXME: qui scriviamo le cose generali che non 
vanno nei moduli specifici, come per esempio questa sotto
per esempio dobbiamo aggiungere il coso per l'hamburger menu
*/

export function putDNone(element) {
  element.classList.add("d-none");
}

export function removeDNone(element) {
  element.classList.remove("d-none");
}

export function duplicateInArray(text, array, objKey) {
  let result;
  array.forEach((obj) => {
    if (obj[objKey] === text) {
      result = true;
    } else {
      result = false;
    }
  });

  return result;
}

function headerHamburgerMenu() {
  const menu = document.querySelector("header .fa-bars");
  const mainLeft = document.querySelector("#main__left");

  function clickHandler() {
    mainLeft.classList.toggle("d-none");
  }

  menu.addEventListener("click", clickHandler);
}

export default function buildAll() {
  headerHamburgerMenu();

  loadProjects();

  addListeners();
  generateInbox();
  loadInboxTasks();
  /*FIXME: occhio poi a quando ci sarà il local host */
}
