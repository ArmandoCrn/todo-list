/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/build-mainLeft.js":
/*!*******************************!*\
  !*** ./src/build-mainLeft.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadProjects": () => (/* binding */ loadProjects)
/* harmony export */ });
/* harmony import */ var _build_web__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./build-web */ "./src/build-web.js");
/* harmony import */ var _build_mainRight__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./build-mainRight */ "./src/build-mainRight.js");



const mainLeft = document.querySelector("#main__left");
const inbox = document.querySelector(".inbox");
const today = document.querySelector(".today");

const projects = document.querySelector("#projects");
const addProject = document.querySelector(".add-project");
const projectPopup = document.querySelector(".add-project-popup");
const projectCancelBtn = document.querySelector(".add-project-popup .btn-cancel");
const projectAddBtn = document.querySelector(".add-project-popup .btn-add");
const projectInput = document.querySelector("#project-name");

/*
Use the obj.projectName as a "key" for load the page 
of the tasks list
*/
const projectList = [];

class Project {
  constructor(name) {
    this.projectName = name;
  }
}

function addProjectPopup() {
  const projectName = projectInput.value;
  if (projectName) {
    const checkDuplicate = (0,_build_web__WEBPACK_IMPORTED_MODULE_0__.duplicateInArray)(projectName, projectList, "projectName");

    if (checkDuplicate) {
      alert("Project names must be different!");
      setTimeout(() => openProjectPopup(), 0);
      return;
    }

    const myProject = new Project(projectName);

    projectList.push(myProject);
    createNewLi(myProject);
  }
}

function checkForIndex(text) {
  const result = projectList.findIndex((obj) => obj.projectName === text);
  return result;
}

function deleteProject(e) {
  e.stopPropagation();
  const li = this.parentElement;
  const text = li.querySelector("div > p").innerText;
  const index = checkForIndex(text);
  projectList.splice(index, 1);

  projects.innerHTML = "";
  loadProjects();

  /*FIXME: occhio che quando ci saranno poi i task
  all'interno del progetto, dovranno
  essere eliminati in automatico anch'essi*/

  /*TODO: Quando elimini il progetto, poi il rigth main
  dalgi un innerText vuoto o robe così
  altrimenti fallo andare su inbox,o boh, quel che ti pare
  */
}

function createNewLi(name) {
  const li = document.createElement("li");
  li.classList.add("project");
  li.innerHTML = `
  <div>
  <i class="fa-solid fa-list"></i>
  <p>${name.projectName}</p>
  </div>
  `;

  const i = document.createElement("i");
  i.classList.add("fa-solid", "fa-trash-can");
  i.addEventListener("click", deleteProject);
  li.appendChild(i);

  li.addEventListener("click", liClick);
  projects.appendChild(li);
}

function liClick() {
  if (!this.className.includes("active")) {
    this.classList.add("active");
  }

  const listOfLi = mainLeft.querySelectorAll("li");
  listOfLi.forEach((el) => {
    if (el !== this) {
      el.classList.remove("active");
    }
  });
}

function loadProjects() {
  projectList.forEach((project) => {
    createNewLi(project);
  });
}

function openProjectPopup() {
  projectPopup.classList.remove("d-none");
  addProject.classList.add("d-none");
  setTimeout(() => projectInput.focus(), 100);
}

function toggleProjectPopup(e) {
  e.preventDefault();
  projectPopup.reset();
  projectPopup.classList.add("d-none");
  addProject.classList.remove("d-none");
}

inbox.addEventListener("click", liClick);
inbox.addEventListener("click", _build_mainRight__WEBPACK_IMPORTED_MODULE_1__.generateInbox);
today.addEventListener("click", liClick);
addProject.addEventListener("click", openProjectPopup);
projectAddBtn.addEventListener("click", addProjectPopup);
projectCancelBtn.addEventListener("click", toggleProjectPopup);
projectPopup.addEventListener("submit", toggleProjectPopup);


/***/ }),

/***/ "./src/build-mainRight.js":
/*!********************************!*\
  !*** ./src/build-mainRight.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addListeners": () => (/* binding */ addListeners),
/* harmony export */   "generateInbox": () => (/* binding */ generateInbox),
/* harmony export */   "generatePage": () => (/* binding */ generatePage)
/* harmony export */ });
/* harmony import */ var _build_web__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./build-web */ "./src/build-web.js");


const tasks = document.querySelector("#tasks");
const h2 = document.querySelector("#main__right > h2");
const addTask = document.querySelector(".add-task");
const taskPopup = document.querySelector(".add-task-popup");
const taskCancelBtn = document.querySelector(".add-task-popup .btn-cancel");
const taskAddBtn = document.querySelector(".add-task-popup .btn-add");
const taskName = document.querySelector("#task-name");
const taskDate = document.querySelector("#task-date");

const inboxTaskList = [];

class Task {
  constructor(name, date, status) {
    this.taskName = name;
    this.taskDate = date;
    this.checked = status;
  }
}

function generatePage(projectName, taskList) {
  h2.innerText = projectName;

  function addTaskProjects() {}

  console.log(mainRight);
}

function generateInbox() {
  h2.innerText = "Inbox";

  function addTaskInbox() {
    const name = taskName.value;
    const date = taskDate.value;

    if (name && date) {
      const checkDuplicate = (0,_build_web__WEBPACK_IMPORTED_MODULE_0__.duplicateInArray)(name, inboxTaskList, "taskName");

      if (checkDuplicate) {
        alert("Task names must be different!");
        setTimeout(() => openTaskPopup(), 0);
        return;
      }

      const formatDate = date.split("-").reverse().join("/");

      const myTast = new Task(name, formatDate, false);

      inboxTaskList.push(myTast);
      console.log(inboxTaskList);
      newLi(myTast);
    }
  }

  // FIXME: bisogna trovare un modo per rimuovere l'event listener dei project
  // taskAddBtn.removeEventListener("click", addTaskProjects);
  taskAddBtn.addEventListener("click", addTaskInbox);
}

// occhio che si potrebbero avere problemi col localstorage
//per l'auto checker dato che li son tutte stringhe,
//e non so come si risolve il fatto che sia un boolean
function newLi(obj) {
  const li = document.createElement("li");
  li.classList.add("task");

  const div = document.createElement("div");

  const iSquare = document.createElement("i");
  iSquare.classList.add("fa-solid");

  //auto-checker when we recraite the li from LocalStorage
  if (obj.checked) {
    iSquare.classList.add("fa-square-check");
  } else {
    iSquare.classList.add("fa-square");
  }

  iSquare.addEventListener("click", () => console.log("prova"));

  const pName = document.createElement("p");
  pName.innerText = `${obj.taskName}`;

  div.appendChild(iSquare);
  div.appendChild(pName);
  li.appendChild(div);

  const details = document.createElement("div");
  details.classList.add("details");

  const pDate = document.createElement("p");
  pDate.innerText = `${obj.taskDate}`;

  const iPen = document.createElement("i");
  iPen.classList.add("fa-solid", "fa-pen-to-square");
  iPen.addEventListener("click", () => console.log("prova 2"));

  const iTrash = document.createElement("i");
  iTrash.classList.add("fa-solid", "fa-trash-can");
  iTrash.addEventListener("click", () => console.log("prova 3"));

  details.appendChild(pDate);
  details.appendChild(iPen);
  details.appendChild(iTrash);
  li.appendChild(details);

  tasks.appendChild(li);
}

function addListeners() {
  addTask.addEventListener("click", openTaskPopup);
  taskCancelBtn.addEventListener("click", toggleTaskPopup);
  taskPopup.addEventListener("submit", toggleTaskPopup);
}

function openTaskPopup() {
  taskPopup.classList.remove("d-none");
  addTask.classList.add("d-none");
  setTimeout(() => taskName.focus(), 100);
}

function toggleTaskPopup(e) {
  e.preventDefault();
  taskPopup.reset();
  taskPopup.classList.add("d-none");
  addTask.classList.remove("d-none");
}


/***/ }),

/***/ "./src/build-web.js":
/*!**************************!*\
  !*** ./src/build-web.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buildAll),
/* harmony export */   "duplicateInArray": () => (/* binding */ duplicateInArray)
/* harmony export */ });
/* harmony import */ var _build_mainLeft__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./build-mainLeft */ "./src/build-mainLeft.js");
/* harmony import */ var _build_mainRight__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./build-mainRight */ "./src/build-mainRight.js");



/*
FIXME: qui scriviamo le cose generali che non 
vanno nei moduli specifici, come per esempio questa sotto
per esempio dobbiamo aggiungere il coso per l'hamburger menu
*/

function duplicateInArray(text, array, objKey) {
  let result;
  array.forEach((obj) => {
    if (obj[objKey] === text) {
      result = true;
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

function buildAll() {
  headerHamburgerMenu();

  (0,_build_mainLeft__WEBPACK_IMPORTED_MODULE_0__.loadProjects)();

  (0,_build_mainRight__WEBPACK_IMPORTED_MODULE_1__.addListeners)();
  (0,_build_mainRight__WEBPACK_IMPORTED_MODULE_1__.generateInbox)();
  /*FIXME: occhio poi a quando ci sarà il local host */
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _build_web__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./build-web */ "./src/build-web.js");


(0,_build_web__WEBPACK_IMPORTED_MODULE_0__["default"])();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQStDO0FBQ0c7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLDREQUFnQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPLGlCQUFpQjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLDJEQUFhO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzlIK0M7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLDREQUFnQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsYUFBYTtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsYUFBYTtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvSGdEO0FBQzhCO0FBQzlFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNlO0FBQ2Y7QUFDQTtBQUNBLEVBQUUsNkRBQVk7QUFDZDtBQUNBLEVBQUUsOERBQVk7QUFDZCxFQUFFLCtEQUFhO0FBQ2Y7QUFDQTs7Ozs7OztVQ3ZDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTm1DO0FBQ25DO0FBQ0Esc0RBQVEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly80LXRvZG8tbGlzdC8uL3NyYy9idWlsZC1tYWluTGVmdC5qcyIsIndlYnBhY2s6Ly80LXRvZG8tbGlzdC8uL3NyYy9idWlsZC1tYWluUmlnaHQuanMiLCJ3ZWJwYWNrOi8vNC10b2RvLWxpc3QvLi9zcmMvYnVpbGQtd2ViLmpzIiwid2VicGFjazovLzQtdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLzQtdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly80LXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovLzQtdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vNC10b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZHVwbGljYXRlSW5BcnJheSB9IGZyb20gXCIuL2J1aWxkLXdlYlwiO1xyXG5pbXBvcnQgeyBnZW5lcmF0ZUluYm94IH0gZnJvbSBcIi4vYnVpbGQtbWFpblJpZ2h0XCI7XHJcblxyXG5jb25zdCBtYWluTGVmdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWFpbl9fbGVmdFwiKTtcclxuY29uc3QgaW5ib3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmluYm94XCIpO1xyXG5jb25zdCB0b2RheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kYXlcIik7XHJcblxyXG5jb25zdCBwcm9qZWN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdHNcIik7XHJcbmNvbnN0IGFkZFByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC1wcm9qZWN0XCIpO1xyXG5jb25zdCBwcm9qZWN0UG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC1wcm9qZWN0LXBvcHVwXCIpO1xyXG5jb25zdCBwcm9qZWN0Q2FuY2VsQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtcHJvamVjdC1wb3B1cCAuYnRuLWNhbmNlbFwiKTtcclxuY29uc3QgcHJvamVjdEFkZEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXByb2plY3QtcG9wdXAgLmJ0bi1hZGRcIik7XHJcbmNvbnN0IHByb2plY3RJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdC1uYW1lXCIpO1xyXG5cclxuLypcclxuVXNlIHRoZSBvYmoucHJvamVjdE5hbWUgYXMgYSBcImtleVwiIGZvciBsb2FkIHRoZSBwYWdlIFxyXG5vZiB0aGUgdGFza3MgbGlzdFxyXG4qL1xyXG5jb25zdCBwcm9qZWN0TGlzdCA9IFtdO1xyXG5cclxuY2xhc3MgUHJvamVjdCB7XHJcbiAgY29uc3RydWN0b3IobmFtZSkge1xyXG4gICAgdGhpcy5wcm9qZWN0TmFtZSA9IG5hbWU7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRQcm9qZWN0UG9wdXAoKSB7XHJcbiAgY29uc3QgcHJvamVjdE5hbWUgPSBwcm9qZWN0SW5wdXQudmFsdWU7XHJcbiAgaWYgKHByb2plY3ROYW1lKSB7XHJcbiAgICBjb25zdCBjaGVja0R1cGxpY2F0ZSA9IGR1cGxpY2F0ZUluQXJyYXkocHJvamVjdE5hbWUsIHByb2plY3RMaXN0LCBcInByb2plY3ROYW1lXCIpO1xyXG5cclxuICAgIGlmIChjaGVja0R1cGxpY2F0ZSkge1xyXG4gICAgICBhbGVydChcIlByb2plY3QgbmFtZXMgbXVzdCBiZSBkaWZmZXJlbnQhXCIpO1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IG9wZW5Qcm9qZWN0UG9wdXAoKSwgMCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBteVByb2plY3QgPSBuZXcgUHJvamVjdChwcm9qZWN0TmFtZSk7XHJcblxyXG4gICAgcHJvamVjdExpc3QucHVzaChteVByb2plY3QpO1xyXG4gICAgY3JlYXRlTmV3TGkobXlQcm9qZWN0KTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNoZWNrRm9ySW5kZXgodGV4dCkge1xyXG4gIGNvbnN0IHJlc3VsdCA9IHByb2plY3RMaXN0LmZpbmRJbmRleCgob2JqKSA9PiBvYmoucHJvamVjdE5hbWUgPT09IHRleHQpO1xyXG4gIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRlbGV0ZVByb2plY3QoZSkge1xyXG4gIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgY29uc3QgbGkgPSB0aGlzLnBhcmVudEVsZW1lbnQ7XHJcbiAgY29uc3QgdGV4dCA9IGxpLnF1ZXJ5U2VsZWN0b3IoXCJkaXYgPiBwXCIpLmlubmVyVGV4dDtcclxuICBjb25zdCBpbmRleCA9IGNoZWNrRm9ySW5kZXgodGV4dCk7XHJcbiAgcHJvamVjdExpc3Quc3BsaWNlKGluZGV4LCAxKTtcclxuXHJcbiAgcHJvamVjdHMuaW5uZXJIVE1MID0gXCJcIjtcclxuICBsb2FkUHJvamVjdHMoKTtcclxuXHJcbiAgLypGSVhNRTogb2NjaGlvIGNoZSBxdWFuZG8gY2kgc2FyYW5ubyBwb2kgaSB0YXNrXHJcbiAgYWxsJ2ludGVybm8gZGVsIHByb2dldHRvLCBkb3ZyYW5ub1xyXG4gIGVzc2VyZSBlbGltaW5hdGkgaW4gYXV0b21hdGljbyBhbmNoJ2Vzc2kqL1xyXG5cclxuICAvKlRPRE86IFF1YW5kbyBlbGltaW5pIGlsIHByb2dldHRvLCBwb2kgaWwgcmlndGggbWFpblxyXG4gIGRhbGdpIHVuIGlubmVyVGV4dCB2dW90byBvIHJvYmUgY29zw6xcclxuICBhbHRyaW1lbnRpIGZhbGxvIGFuZGFyZSBzdSBpbmJveCxvIGJvaCwgcXVlbCBjaGUgdGkgcGFyZVxyXG4gICovXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZU5ld0xpKG5hbWUpIHtcclxuICBjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcclxuICBsaS5jbGFzc0xpc3QuYWRkKFwicHJvamVjdFwiKTtcclxuICBsaS5pbm5lckhUTUwgPSBgXHJcbiAgPGRpdj5cclxuICA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLWxpc3RcIj48L2k+XHJcbiAgPHA+JHtuYW1lLnByb2plY3ROYW1lfTwvcD5cclxuICA8L2Rpdj5cclxuICBgO1xyXG5cclxuICBjb25zdCBpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XHJcbiAgaS5jbGFzc0xpc3QuYWRkKFwiZmEtc29saWRcIiwgXCJmYS10cmFzaC1jYW5cIik7XHJcbiAgaS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZGVsZXRlUHJvamVjdCk7XHJcbiAgbGkuYXBwZW5kQ2hpbGQoaSk7XHJcblxyXG4gIGxpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBsaUNsaWNrKTtcclxuICBwcm9qZWN0cy5hcHBlbmRDaGlsZChsaSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxpQ2xpY2soKSB7XHJcbiAgaWYgKCF0aGlzLmNsYXNzTmFtZS5pbmNsdWRlcyhcImFjdGl2ZVwiKSkge1xyXG4gICAgdGhpcy5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgbGlzdE9mTGkgPSBtYWluTGVmdC5xdWVyeVNlbGVjdG9yQWxsKFwibGlcIik7XHJcbiAgbGlzdE9mTGkuZm9yRWFjaCgoZWwpID0+IHtcclxuICAgIGlmIChlbCAhPT0gdGhpcykge1xyXG4gICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbG9hZFByb2plY3RzKCkge1xyXG4gIHByb2plY3RMaXN0LmZvckVhY2goKHByb2plY3QpID0+IHtcclxuICAgIGNyZWF0ZU5ld0xpKHByb2plY3QpO1xyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBvcGVuUHJvamVjdFBvcHVwKCkge1xyXG4gIHByb2plY3RQb3B1cC5jbGFzc0xpc3QucmVtb3ZlKFwiZC1ub25lXCIpO1xyXG4gIGFkZFByb2plY3QuY2xhc3NMaXN0LmFkZChcImQtbm9uZVwiKTtcclxuICBzZXRUaW1lb3V0KCgpID0+IHByb2plY3RJbnB1dC5mb2N1cygpLCAxMDApO1xyXG59XHJcblxyXG5mdW5jdGlvbiB0b2dnbGVQcm9qZWN0UG9wdXAoZSkge1xyXG4gIGUucHJldmVudERlZmF1bHQoKTtcclxuICBwcm9qZWN0UG9wdXAucmVzZXQoKTtcclxuICBwcm9qZWN0UG9wdXAuY2xhc3NMaXN0LmFkZChcImQtbm9uZVwiKTtcclxuICBhZGRQcm9qZWN0LmNsYXNzTGlzdC5yZW1vdmUoXCJkLW5vbmVcIik7XHJcbn1cclxuXHJcbmluYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBsaUNsaWNrKTtcclxuaW5ib3guYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGdlbmVyYXRlSW5ib3gpO1xyXG50b2RheS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgbGlDbGljayk7XHJcbmFkZFByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG9wZW5Qcm9qZWN0UG9wdXApO1xyXG5wcm9qZWN0QWRkQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhZGRQcm9qZWN0UG9wdXApO1xyXG5wcm9qZWN0Q2FuY2VsQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0b2dnbGVQcm9qZWN0UG9wdXApO1xyXG5wcm9qZWN0UG9wdXAuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCB0b2dnbGVQcm9qZWN0UG9wdXApO1xyXG4iLCJpbXBvcnQgeyBkdXBsaWNhdGVJbkFycmF5IH0gZnJvbSBcIi4vYnVpbGQtd2ViXCI7XHJcblxyXG5jb25zdCB0YXNrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFza3NcIik7XHJcbmNvbnN0IGgyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtYWluX19yaWdodCA+IGgyXCIpO1xyXG5jb25zdCBhZGRUYXNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtdGFza1wiKTtcclxuY29uc3QgdGFza1BvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtdGFzay1wb3B1cFwiKTtcclxuY29uc3QgdGFza0NhbmNlbEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXRhc2stcG9wdXAgLmJ0bi1jYW5jZWxcIik7XHJcbmNvbnN0IHRhc2tBZGRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC10YXNrLXBvcHVwIC5idG4tYWRkXCIpO1xyXG5jb25zdCB0YXNrTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFzay1uYW1lXCIpO1xyXG5jb25zdCB0YXNrRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFzay1kYXRlXCIpO1xyXG5cclxuY29uc3QgaW5ib3hUYXNrTGlzdCA9IFtdO1xyXG5cclxuY2xhc3MgVGFzayB7XHJcbiAgY29uc3RydWN0b3IobmFtZSwgZGF0ZSwgc3RhdHVzKSB7XHJcbiAgICB0aGlzLnRhc2tOYW1lID0gbmFtZTtcclxuICAgIHRoaXMudGFza0RhdGUgPSBkYXRlO1xyXG4gICAgdGhpcy5jaGVja2VkID0gc3RhdHVzO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlUGFnZShwcm9qZWN0TmFtZSwgdGFza0xpc3QpIHtcclxuICBoMi5pbm5lclRleHQgPSBwcm9qZWN0TmFtZTtcclxuXHJcbiAgZnVuY3Rpb24gYWRkVGFza1Byb2plY3RzKCkge31cclxuXHJcbiAgY29uc29sZS5sb2cobWFpblJpZ2h0KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlSW5ib3goKSB7XHJcbiAgaDIuaW5uZXJUZXh0ID0gXCJJbmJveFwiO1xyXG5cclxuICBmdW5jdGlvbiBhZGRUYXNrSW5ib3goKSB7XHJcbiAgICBjb25zdCBuYW1lID0gdGFza05hbWUudmFsdWU7XHJcbiAgICBjb25zdCBkYXRlID0gdGFza0RhdGUudmFsdWU7XHJcblxyXG4gICAgaWYgKG5hbWUgJiYgZGF0ZSkge1xyXG4gICAgICBjb25zdCBjaGVja0R1cGxpY2F0ZSA9IGR1cGxpY2F0ZUluQXJyYXkobmFtZSwgaW5ib3hUYXNrTGlzdCwgXCJ0YXNrTmFtZVwiKTtcclxuXHJcbiAgICAgIGlmIChjaGVja0R1cGxpY2F0ZSkge1xyXG4gICAgICAgIGFsZXJ0KFwiVGFzayBuYW1lcyBtdXN0IGJlIGRpZmZlcmVudCFcIik7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiBvcGVuVGFza1BvcHVwKCksIDApO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgZm9ybWF0RGF0ZSA9IGRhdGUuc3BsaXQoXCItXCIpLnJldmVyc2UoKS5qb2luKFwiL1wiKTtcclxuXHJcbiAgICAgIGNvbnN0IG15VGFzdCA9IG5ldyBUYXNrKG5hbWUsIGZvcm1hdERhdGUsIGZhbHNlKTtcclxuXHJcbiAgICAgIGluYm94VGFza0xpc3QucHVzaChteVRhc3QpO1xyXG4gICAgICBjb25zb2xlLmxvZyhpbmJveFRhc2tMaXN0KTtcclxuICAgICAgbmV3TGkobXlUYXN0KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIEZJWE1FOiBiaXNvZ25hIHRyb3ZhcmUgdW4gbW9kbyBwZXIgcmltdW92ZXJlIGwnZXZlbnQgbGlzdGVuZXIgZGVpIHByb2plY3RcclxuICAvLyB0YXNrQWRkQnRuLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhZGRUYXNrUHJvamVjdHMpO1xyXG4gIHRhc2tBZGRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFkZFRhc2tJbmJveCk7XHJcbn1cclxuXHJcbi8vIG9jY2hpbyBjaGUgc2kgcG90cmViYmVybyBhdmVyZSBwcm9ibGVtaSBjb2wgbG9jYWxzdG9yYWdlXHJcbi8vcGVyIGwnYXV0byBjaGVja2VyIGRhdG8gY2hlIGxpIHNvbiB0dXR0ZSBzdHJpbmdoZSxcclxuLy9lIG5vbiBzbyBjb21lIHNpIHJpc29sdmUgaWwgZmF0dG8gY2hlIHNpYSB1biBib29sZWFuXHJcbmZ1bmN0aW9uIG5ld0xpKG9iaikge1xyXG4gIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xyXG4gIGxpLmNsYXNzTGlzdC5hZGQoXCJ0YXNrXCIpO1xyXG5cclxuICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cclxuICBjb25zdCBpU3F1YXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XHJcbiAgaVNxdWFyZS5jbGFzc0xpc3QuYWRkKFwiZmEtc29saWRcIik7XHJcblxyXG4gIC8vYXV0by1jaGVja2VyIHdoZW4gd2UgcmVjcmFpdGUgdGhlIGxpIGZyb20gTG9jYWxTdG9yYWdlXHJcbiAgaWYgKG9iai5jaGVja2VkKSB7XHJcbiAgICBpU3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJmYS1zcXVhcmUtY2hlY2tcIik7XHJcbiAgfSBlbHNlIHtcclxuICAgIGlTcXVhcmUuY2xhc3NMaXN0LmFkZChcImZhLXNxdWFyZVwiKTtcclxuICB9XHJcblxyXG4gIGlTcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IGNvbnNvbGUubG9nKFwicHJvdmFcIikpO1xyXG5cclxuICBjb25zdCBwTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xyXG4gIHBOYW1lLmlubmVyVGV4dCA9IGAke29iai50YXNrTmFtZX1gO1xyXG5cclxuICBkaXYuYXBwZW5kQ2hpbGQoaVNxdWFyZSk7XHJcbiAgZGl2LmFwcGVuZENoaWxkKHBOYW1lKTtcclxuICBsaS5hcHBlbmRDaGlsZChkaXYpO1xyXG5cclxuICBjb25zdCBkZXRhaWxzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICBkZXRhaWxzLmNsYXNzTGlzdC5hZGQoXCJkZXRhaWxzXCIpO1xyXG5cclxuICBjb25zdCBwRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xyXG4gIHBEYXRlLmlubmVyVGV4dCA9IGAke29iai50YXNrRGF0ZX1gO1xyXG5cclxuICBjb25zdCBpUGVuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XHJcbiAgaVBlbi5jbGFzc0xpc3QuYWRkKFwiZmEtc29saWRcIiwgXCJmYS1wZW4tdG8tc3F1YXJlXCIpO1xyXG4gIGlQZW4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IGNvbnNvbGUubG9nKFwicHJvdmEgMlwiKSk7XHJcblxyXG4gIGNvbnN0IGlUcmFzaCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xyXG4gIGlUcmFzaC5jbGFzc0xpc3QuYWRkKFwiZmEtc29saWRcIiwgXCJmYS10cmFzaC1jYW5cIik7XHJcbiAgaVRyYXNoLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBjb25zb2xlLmxvZyhcInByb3ZhIDNcIikpO1xyXG5cclxuICBkZXRhaWxzLmFwcGVuZENoaWxkKHBEYXRlKTtcclxuICBkZXRhaWxzLmFwcGVuZENoaWxkKGlQZW4pO1xyXG4gIGRldGFpbHMuYXBwZW5kQ2hpbGQoaVRyYXNoKTtcclxuICBsaS5hcHBlbmRDaGlsZChkZXRhaWxzKTtcclxuXHJcbiAgdGFza3MuYXBwZW5kQ2hpbGQobGkpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYWRkTGlzdGVuZXJzKCkge1xyXG4gIGFkZFRhc2suYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG9wZW5UYXNrUG9wdXApO1xyXG4gIHRhc2tDYW5jZWxCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRvZ2dsZVRhc2tQb3B1cCk7XHJcbiAgdGFza1BvcHVwLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgdG9nZ2xlVGFza1BvcHVwKTtcclxufVxyXG5cclxuZnVuY3Rpb24gb3BlblRhc2tQb3B1cCgpIHtcclxuICB0YXNrUG9wdXAuY2xhc3NMaXN0LnJlbW92ZShcImQtbm9uZVwiKTtcclxuICBhZGRUYXNrLmNsYXNzTGlzdC5hZGQoXCJkLW5vbmVcIik7XHJcbiAgc2V0VGltZW91dCgoKSA9PiB0YXNrTmFtZS5mb2N1cygpLCAxMDApO1xyXG59XHJcblxyXG5mdW5jdGlvbiB0b2dnbGVUYXNrUG9wdXAoZSkge1xyXG4gIGUucHJldmVudERlZmF1bHQoKTtcclxuICB0YXNrUG9wdXAucmVzZXQoKTtcclxuICB0YXNrUG9wdXAuY2xhc3NMaXN0LmFkZChcImQtbm9uZVwiKTtcclxuICBhZGRUYXNrLmNsYXNzTGlzdC5yZW1vdmUoXCJkLW5vbmVcIik7XHJcbn1cclxuIiwiaW1wb3J0IHsgbG9hZFByb2plY3RzIH0gZnJvbSBcIi4vYnVpbGQtbWFpbkxlZnRcIjtcclxuaW1wb3J0IHsgZ2VuZXJhdGVJbmJveCwgZ2VuZXJhdGVQYWdlLCBhZGRMaXN0ZW5lcnMgfSBmcm9tIFwiLi9idWlsZC1tYWluUmlnaHRcIjtcclxuXHJcbi8qXHJcbkZJWE1FOiBxdWkgc2NyaXZpYW1vIGxlIGNvc2UgZ2VuZXJhbGkgY2hlIG5vbiBcclxudmFubm8gbmVpIG1vZHVsaSBzcGVjaWZpY2ksIGNvbWUgcGVyIGVzZW1waW8gcXVlc3RhIHNvdHRvXHJcbnBlciBlc2VtcGlvIGRvYmJpYW1vIGFnZ2l1bmdlcmUgaWwgY29zbyBwZXIgbCdoYW1idXJnZXIgbWVudVxyXG4qL1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGR1cGxpY2F0ZUluQXJyYXkodGV4dCwgYXJyYXksIG9iaktleSkge1xyXG4gIGxldCByZXN1bHQ7XHJcbiAgYXJyYXkuZm9yRWFjaCgob2JqKSA9PiB7XHJcbiAgICBpZiAob2JqW29iaktleV0gPT09IHRleHQpIHtcclxuICAgICAgcmVzdWx0ID0gdHJ1ZTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZnVuY3Rpb24gaGVhZGVySGFtYnVyZ2VyTWVudSgpIHtcclxuICBjb25zdCBtZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImhlYWRlciAuZmEtYmFyc1wiKTtcclxuICBjb25zdCBtYWluTGVmdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWFpbl9fbGVmdFwiKTtcclxuXHJcbiAgZnVuY3Rpb24gY2xpY2tIYW5kbGVyKCkge1xyXG4gICAgbWFpbkxlZnQuY2xhc3NMaXN0LnRvZ2dsZShcImQtbm9uZVwiKTtcclxuICB9XHJcblxyXG4gIG1lbnUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNsaWNrSGFuZGxlcik7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkQWxsKCkge1xyXG4gIGhlYWRlckhhbWJ1cmdlck1lbnUoKTtcclxuXHJcbiAgbG9hZFByb2plY3RzKCk7XHJcblxyXG4gIGFkZExpc3RlbmVycygpO1xyXG4gIGdlbmVyYXRlSW5ib3goKTtcclxuICAvKkZJWE1FOiBvY2NoaW8gcG9pIGEgcXVhbmRvIGNpIHNhcsOgIGlsIGxvY2FsIGhvc3QgKi9cclxufVxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBidWlsZEFsbCBmcm9tIFwiLi9idWlsZC13ZWJcIjtcclxuXHJcbmJ1aWxkQWxsKCk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==