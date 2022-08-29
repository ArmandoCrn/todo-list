import { loadProjects } from "./build-mainLeft";
import {
  generateInbox,
  generatePage,
  addListeners,
  loadInboxTasks,
} from "./build-mainRight";

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
}
