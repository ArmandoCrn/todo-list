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
/* harmony export */   "generatePage": () => (/* binding */ generatePage),
/* harmony export */   "loadInboxTasks": () => (/* binding */ loadInboxTasks)
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

  setName(name) {
    this.taskName = name;
  }

  getName() {
    return this.taskName;
  }

  setDate(date) {
    this.taskDate = date;
  }

  getDate() {
    return this.taskDate;
  }
}

function generatePage(taskName, taskList) {
  h2.innerText = taskName;

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

      const myTask = new Task(name, formatDate, false);

      inboxTaskList.push(myTask);
      newLi(myTask);
    }
  }

  // FIXME: bisogna trovare un modo per rimuovere l'event listener dei project
  // taskAddBtn.removeEventListener("click", addTaskProjects);
  taskAddBtn.addEventListener("click", addTaskInbox);
}

function loadInboxTasks() {
  inboxTaskList.forEach((task) => {
    newLi(task);
  });
}

function checkIndexTask(text) {
  const result = inboxTaskList.findIndex((obj) => obj.taskName === text);
  return result;
}

function checkLi(obj, icon) {
  if (obj.checked) {
    icon.classList.remove("fa-square");
    icon.classList.add("fa-square-check");
  } else {
    icon.classList.remove("fa-square-check");
    icon.classList.add("fa-square");
  }
}

function changeTaskStatus() {
  const task = this.nextSibling.innerText;
  const index = checkIndexTask(task);
  const obj = inboxTaskList[index];
  obj.checked = !obj.checked;

  checkLi(obj, this);
}

function deleteTask() {
  const li = this.parentElement.parentElement;
  const text = li.querySelector(".name-task > p").innerText;
  const index = checkIndexTask(text);
  inboxTaskList.splice(index, 1);

  tasks.innerHTML = "";
  loadInboxTasks();
}

function modTask() {
  const li = this.parentElement.parentElement;
  const text = li.querySelector(".name-task > p").innerText;
  const index = checkIndexTask(text);
  const obj = inboxTaskList[index];

  const name = obj.getName();
  const date = obj.getDate();

  /*FIXME: qui poppano fuori i campi imput e come value
  avranno name e date qui sopra
  */
}

//TODO: occhio che si potrebbero avere problemi col localstorage
//per l'auto checker dato che li son tutte stringhe,
//e non so come si risolve il fatto che sia un boolean
function newLi(obj) {
  const li = document.createElement("li");
  li.classList.add("task");

  const div = document.createElement("div");
  div.classList.add("name-task");

  const iSquare = document.createElement("i");
  iSquare.classList.add("fa-solid");

  //auto-checker when we recraite the li from LocalStorage
  if (obj.checked) {
    iSquare.classList.add("fa-square-check");
  } else {
    iSquare.classList.add("fa-square");
  }

  iSquare.addEventListener("click", changeTaskStatus);

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
  iPen.addEventListener("click", modTask);

  const iTrash = document.createElement("i");
  iTrash.classList.add("fa-solid", "fa-trash-can");
  iTrash.addEventListener("click", deleteTask);

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

function buildAll() {
  headerHamburgerMenu();

  (0,_build_mainLeft__WEBPACK_IMPORTED_MODULE_0__.loadProjects)();

  (0,_build_mainRight__WEBPACK_IMPORTED_MODULE_1__.addListeners)();
  (0,_build_mainRight__WEBPACK_IMPORTED_MODULE_1__.generateInbox)();
  (0,_build_mainRight__WEBPACK_IMPORTED_MODULE_1__.loadInboxTasks)();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQStDO0FBQ0c7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLDREQUFnQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPLGlCQUFpQjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLDJEQUFhO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5SCtDO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLDREQUFnQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGFBQWE7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGFBQWE7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDck1nRDtBQU1yQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDZTtBQUNmO0FBQ0E7QUFDQSxFQUFFLDZEQUFZO0FBQ2Q7QUFDQSxFQUFFLDhEQUFZO0FBQ2QsRUFBRSwrREFBYTtBQUNmLEVBQUUsZ0VBQWM7QUFDaEI7QUFDQTs7Ozs7OztVQy9DQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTm1DO0FBQ25DO0FBQ0Esc0RBQVEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly80LXRvZG8tbGlzdC8uL3NyYy9idWlsZC1tYWluTGVmdC5qcyIsIndlYnBhY2s6Ly80LXRvZG8tbGlzdC8uL3NyYy9idWlsZC1tYWluUmlnaHQuanMiLCJ3ZWJwYWNrOi8vNC10b2RvLWxpc3QvLi9zcmMvYnVpbGQtd2ViLmpzIiwid2VicGFjazovLzQtdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLzQtdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly80LXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovLzQtdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vNC10b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZHVwbGljYXRlSW5BcnJheSB9IGZyb20gXCIuL2J1aWxkLXdlYlwiO1xyXG5pbXBvcnQgeyBnZW5lcmF0ZUluYm94IH0gZnJvbSBcIi4vYnVpbGQtbWFpblJpZ2h0XCI7XHJcblxyXG5jb25zdCBtYWluTGVmdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWFpbl9fbGVmdFwiKTtcclxuY29uc3QgaW5ib3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmluYm94XCIpO1xyXG5jb25zdCB0b2RheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kYXlcIik7XHJcblxyXG5jb25zdCBwcm9qZWN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdHNcIik7XHJcbmNvbnN0IGFkZFByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC1wcm9qZWN0XCIpO1xyXG5jb25zdCBwcm9qZWN0UG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC1wcm9qZWN0LXBvcHVwXCIpO1xyXG5jb25zdCBwcm9qZWN0Q2FuY2VsQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtcHJvamVjdC1wb3B1cCAuYnRuLWNhbmNlbFwiKTtcclxuY29uc3QgcHJvamVjdEFkZEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXByb2plY3QtcG9wdXAgLmJ0bi1hZGRcIik7XHJcbmNvbnN0IHByb2plY3RJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdC1uYW1lXCIpO1xyXG5cclxuLypcclxuVXNlIHRoZSBvYmoucHJvamVjdE5hbWUgYXMgYSBcImtleVwiIGZvciBsb2FkIHRoZSBwYWdlIFxyXG5vZiB0aGUgdGFza3MgbGlzdFxyXG4qL1xyXG5jb25zdCBwcm9qZWN0TGlzdCA9IFtdO1xyXG5cclxuY2xhc3MgUHJvamVjdCB7XHJcbiAgY29uc3RydWN0b3IobmFtZSkge1xyXG4gICAgdGhpcy5wcm9qZWN0TmFtZSA9IG5hbWU7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRQcm9qZWN0UG9wdXAoKSB7XHJcbiAgY29uc3QgcHJvamVjdE5hbWUgPSBwcm9qZWN0SW5wdXQudmFsdWU7XHJcbiAgaWYgKHByb2plY3ROYW1lKSB7XHJcbiAgICBjb25zdCBjaGVja0R1cGxpY2F0ZSA9IGR1cGxpY2F0ZUluQXJyYXkocHJvamVjdE5hbWUsIHByb2plY3RMaXN0LCBcInByb2plY3ROYW1lXCIpO1xyXG5cclxuICAgIGlmIChjaGVja0R1cGxpY2F0ZSkge1xyXG4gICAgICBhbGVydChcIlByb2plY3QgbmFtZXMgbXVzdCBiZSBkaWZmZXJlbnQhXCIpO1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IG9wZW5Qcm9qZWN0UG9wdXAoKSwgMCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBteVByb2plY3QgPSBuZXcgUHJvamVjdChwcm9qZWN0TmFtZSk7XHJcblxyXG4gICAgcHJvamVjdExpc3QucHVzaChteVByb2plY3QpO1xyXG4gICAgY3JlYXRlTmV3TGkobXlQcm9qZWN0KTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNoZWNrRm9ySW5kZXgodGV4dCkge1xyXG4gIGNvbnN0IHJlc3VsdCA9IHByb2plY3RMaXN0LmZpbmRJbmRleCgob2JqKSA9PiBvYmoucHJvamVjdE5hbWUgPT09IHRleHQpO1xyXG4gIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRlbGV0ZVByb2plY3QoZSkge1xyXG4gIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgY29uc3QgbGkgPSB0aGlzLnBhcmVudEVsZW1lbnQ7XHJcbiAgY29uc3QgdGV4dCA9IGxpLnF1ZXJ5U2VsZWN0b3IoXCJkaXYgPiBwXCIpLmlubmVyVGV4dDtcclxuICBjb25zdCBpbmRleCA9IGNoZWNrRm9ySW5kZXgodGV4dCk7XHJcbiAgcHJvamVjdExpc3Quc3BsaWNlKGluZGV4LCAxKTtcclxuXHJcbiAgcHJvamVjdHMuaW5uZXJIVE1MID0gXCJcIjtcclxuICBsb2FkUHJvamVjdHMoKTtcclxuXHJcbiAgLypGSVhNRTogb2NjaGlvIGNoZSBxdWFuZG8gY2kgc2FyYW5ubyBwb2kgaSB0YXNrXHJcbiAgYWxsJ2ludGVybm8gZGVsIHByb2dldHRvLCBkb3ZyYW5ub1xyXG4gIGVzc2VyZSBlbGltaW5hdGkgaW4gYXV0b21hdGljbyBhbmNoJ2Vzc2kqL1xyXG5cclxuICAvKlRPRE86IFF1YW5kbyBlbGltaW5pIGlsIHByb2dldHRvLCBwb2kgaWwgcmlndGggbWFpblxyXG4gIGRhbGdpIHVuIGlubmVyVGV4dCB2dW90byBvIHJvYmUgY29zw6xcclxuICBhbHRyaW1lbnRpIGZhbGxvIGFuZGFyZSBzdSBpbmJveCxvIGJvaCwgcXVlbCBjaGUgdGkgcGFyZVxyXG4gICovXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZU5ld0xpKG5hbWUpIHtcclxuICBjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcclxuICBsaS5jbGFzc0xpc3QuYWRkKFwicHJvamVjdFwiKTtcclxuICBsaS5pbm5lckhUTUwgPSBgXHJcbiAgPGRpdj5cclxuICA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLWxpc3RcIj48L2k+XHJcbiAgPHA+JHtuYW1lLnByb2plY3ROYW1lfTwvcD5cclxuICA8L2Rpdj5cclxuICBgO1xyXG5cclxuICBjb25zdCBpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XHJcbiAgaS5jbGFzc0xpc3QuYWRkKFwiZmEtc29saWRcIiwgXCJmYS10cmFzaC1jYW5cIik7XHJcbiAgaS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZGVsZXRlUHJvamVjdCk7XHJcbiAgbGkuYXBwZW5kQ2hpbGQoaSk7XHJcblxyXG4gIGxpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBsaUNsaWNrKTtcclxuICBwcm9qZWN0cy5hcHBlbmRDaGlsZChsaSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxpQ2xpY2soKSB7XHJcbiAgaWYgKCF0aGlzLmNsYXNzTmFtZS5pbmNsdWRlcyhcImFjdGl2ZVwiKSkge1xyXG4gICAgdGhpcy5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgbGlzdE9mTGkgPSBtYWluTGVmdC5xdWVyeVNlbGVjdG9yQWxsKFwibGlcIik7XHJcbiAgbGlzdE9mTGkuZm9yRWFjaCgoZWwpID0+IHtcclxuICAgIGlmIChlbCAhPT0gdGhpcykge1xyXG4gICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbG9hZFByb2plY3RzKCkge1xyXG4gIHByb2plY3RMaXN0LmZvckVhY2goKHByb2plY3QpID0+IHtcclxuICAgIGNyZWF0ZU5ld0xpKHByb2plY3QpO1xyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBvcGVuUHJvamVjdFBvcHVwKCkge1xyXG4gIHByb2plY3RQb3B1cC5jbGFzc0xpc3QucmVtb3ZlKFwiZC1ub25lXCIpO1xyXG4gIGFkZFByb2plY3QuY2xhc3NMaXN0LmFkZChcImQtbm9uZVwiKTtcclxuICBzZXRUaW1lb3V0KCgpID0+IHByb2plY3RJbnB1dC5mb2N1cygpLCAxMDApO1xyXG59XHJcblxyXG5mdW5jdGlvbiB0b2dnbGVQcm9qZWN0UG9wdXAoZSkge1xyXG4gIGUucHJldmVudERlZmF1bHQoKTtcclxuICBwcm9qZWN0UG9wdXAucmVzZXQoKTtcclxuICBwcm9qZWN0UG9wdXAuY2xhc3NMaXN0LmFkZChcImQtbm9uZVwiKTtcclxuICBhZGRQcm9qZWN0LmNsYXNzTGlzdC5yZW1vdmUoXCJkLW5vbmVcIik7XHJcbn1cclxuXHJcbmluYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBsaUNsaWNrKTtcclxuaW5ib3guYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGdlbmVyYXRlSW5ib3gpO1xyXG50b2RheS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgbGlDbGljayk7XHJcbmFkZFByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG9wZW5Qcm9qZWN0UG9wdXApO1xyXG5wcm9qZWN0QWRkQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhZGRQcm9qZWN0UG9wdXApO1xyXG5wcm9qZWN0Q2FuY2VsQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0b2dnbGVQcm9qZWN0UG9wdXApO1xyXG5wcm9qZWN0UG9wdXAuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCB0b2dnbGVQcm9qZWN0UG9wdXApO1xyXG4iLCJpbXBvcnQgeyBkdXBsaWNhdGVJbkFycmF5IH0gZnJvbSBcIi4vYnVpbGQtd2ViXCI7XHJcblxyXG5jb25zdCB0YXNrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFza3NcIik7XHJcbmNvbnN0IGgyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtYWluX19yaWdodCA+IGgyXCIpO1xyXG5jb25zdCBhZGRUYXNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtdGFza1wiKTtcclxuY29uc3QgdGFza1BvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtdGFzay1wb3B1cFwiKTtcclxuY29uc3QgdGFza0NhbmNlbEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXRhc2stcG9wdXAgLmJ0bi1jYW5jZWxcIik7XHJcbmNvbnN0IHRhc2tBZGRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC10YXNrLXBvcHVwIC5idG4tYWRkXCIpO1xyXG5jb25zdCB0YXNrTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFzay1uYW1lXCIpO1xyXG5jb25zdCB0YXNrRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFzay1kYXRlXCIpO1xyXG5cclxuY29uc3QgaW5ib3hUYXNrTGlzdCA9IFtdO1xyXG5cclxuY2xhc3MgVGFzayB7XHJcbiAgY29uc3RydWN0b3IobmFtZSwgZGF0ZSwgc3RhdHVzKSB7XHJcbiAgICB0aGlzLnRhc2tOYW1lID0gbmFtZTtcclxuICAgIHRoaXMudGFza0RhdGUgPSBkYXRlO1xyXG4gICAgdGhpcy5jaGVja2VkID0gc3RhdHVzO1xyXG4gIH1cclxuXHJcbiAgc2V0TmFtZShuYW1lKSB7XHJcbiAgICB0aGlzLnRhc2tOYW1lID0gbmFtZTtcclxuICB9XHJcblxyXG4gIGdldE5hbWUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy50YXNrTmFtZTtcclxuICB9XHJcblxyXG4gIHNldERhdGUoZGF0ZSkge1xyXG4gICAgdGhpcy50YXNrRGF0ZSA9IGRhdGU7XHJcbiAgfVxyXG5cclxuICBnZXREYXRlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMudGFza0RhdGU7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVQYWdlKHRhc2tOYW1lLCB0YXNrTGlzdCkge1xyXG4gIGgyLmlubmVyVGV4dCA9IHRhc2tOYW1lO1xyXG5cclxuICBmdW5jdGlvbiBhZGRUYXNrUHJvamVjdHMoKSB7fVxyXG5cclxuICBjb25zb2xlLmxvZyhtYWluUmlnaHQpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVJbmJveCgpIHtcclxuICBoMi5pbm5lclRleHQgPSBcIkluYm94XCI7XHJcblxyXG4gIGZ1bmN0aW9uIGFkZFRhc2tJbmJveCgpIHtcclxuICAgIGNvbnN0IG5hbWUgPSB0YXNrTmFtZS52YWx1ZTtcclxuICAgIGNvbnN0IGRhdGUgPSB0YXNrRGF0ZS52YWx1ZTtcclxuXHJcbiAgICBpZiAobmFtZSAmJiBkYXRlKSB7XHJcbiAgICAgIGNvbnN0IGNoZWNrRHVwbGljYXRlID0gZHVwbGljYXRlSW5BcnJheShuYW1lLCBpbmJveFRhc2tMaXN0LCBcInRhc2tOYW1lXCIpO1xyXG5cclxuICAgICAgaWYgKGNoZWNrRHVwbGljYXRlKSB7XHJcbiAgICAgICAgYWxlcnQoXCJUYXNrIG5hbWVzIG11c3QgYmUgZGlmZmVyZW50IVwiKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IG9wZW5UYXNrUG9wdXAoKSwgMCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBmb3JtYXREYXRlID0gZGF0ZS5zcGxpdChcIi1cIikucmV2ZXJzZSgpLmpvaW4oXCIvXCIpO1xyXG5cclxuICAgICAgY29uc3QgbXlUYXNrID0gbmV3IFRhc2sobmFtZSwgZm9ybWF0RGF0ZSwgZmFsc2UpO1xyXG5cclxuICAgICAgaW5ib3hUYXNrTGlzdC5wdXNoKG15VGFzayk7XHJcbiAgICAgIG5ld0xpKG15VGFzayk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBGSVhNRTogYmlzb2duYSB0cm92YXJlIHVuIG1vZG8gcGVyIHJpbXVvdmVyZSBsJ2V2ZW50IGxpc3RlbmVyIGRlaSBwcm9qZWN0XHJcbiAgLy8gdGFza0FkZEJ0bi5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYWRkVGFza1Byb2plY3RzKTtcclxuICB0YXNrQWRkQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhZGRUYXNrSW5ib3gpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbG9hZEluYm94VGFza3MoKSB7XHJcbiAgaW5ib3hUYXNrTGlzdC5mb3JFYWNoKCh0YXNrKSA9PiB7XHJcbiAgICBuZXdMaSh0YXNrKTtcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2hlY2tJbmRleFRhc2sodGV4dCkge1xyXG4gIGNvbnN0IHJlc3VsdCA9IGluYm94VGFza0xpc3QuZmluZEluZGV4KChvYmopID0+IG9iai50YXNrTmFtZSA9PT0gdGV4dCk7XHJcbiAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZnVuY3Rpb24gY2hlY2tMaShvYmosIGljb24pIHtcclxuICBpZiAob2JqLmNoZWNrZWQpIHtcclxuICAgIGljb24uY2xhc3NMaXN0LnJlbW92ZShcImZhLXNxdWFyZVwiKTtcclxuICAgIGljb24uY2xhc3NMaXN0LmFkZChcImZhLXNxdWFyZS1jaGVja1wiKTtcclxuICB9IGVsc2Uge1xyXG4gICAgaWNvbi5jbGFzc0xpc3QucmVtb3ZlKFwiZmEtc3F1YXJlLWNoZWNrXCIpO1xyXG4gICAgaWNvbi5jbGFzc0xpc3QuYWRkKFwiZmEtc3F1YXJlXCIpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY2hhbmdlVGFza1N0YXR1cygpIHtcclxuICBjb25zdCB0YXNrID0gdGhpcy5uZXh0U2libGluZy5pbm5lclRleHQ7XHJcbiAgY29uc3QgaW5kZXggPSBjaGVja0luZGV4VGFzayh0YXNrKTtcclxuICBjb25zdCBvYmogPSBpbmJveFRhc2tMaXN0W2luZGV4XTtcclxuICBvYmouY2hlY2tlZCA9ICFvYmouY2hlY2tlZDtcclxuXHJcbiAgY2hlY2tMaShvYmosIHRoaXMpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkZWxldGVUYXNrKCkge1xyXG4gIGNvbnN0IGxpID0gdGhpcy5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XHJcbiAgY29uc3QgdGV4dCA9IGxpLnF1ZXJ5U2VsZWN0b3IoXCIubmFtZS10YXNrID4gcFwiKS5pbm5lclRleHQ7XHJcbiAgY29uc3QgaW5kZXggPSBjaGVja0luZGV4VGFzayh0ZXh0KTtcclxuICBpbmJveFRhc2tMaXN0LnNwbGljZShpbmRleCwgMSk7XHJcblxyXG4gIHRhc2tzLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgbG9hZEluYm94VGFza3MoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gbW9kVGFzaygpIHtcclxuICBjb25zdCBsaSA9IHRoaXMucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xyXG4gIGNvbnN0IHRleHQgPSBsaS5xdWVyeVNlbGVjdG9yKFwiLm5hbWUtdGFzayA+IHBcIikuaW5uZXJUZXh0O1xyXG4gIGNvbnN0IGluZGV4ID0gY2hlY2tJbmRleFRhc2sodGV4dCk7XHJcbiAgY29uc3Qgb2JqID0gaW5ib3hUYXNrTGlzdFtpbmRleF07XHJcblxyXG4gIGNvbnN0IG5hbWUgPSBvYmouZ2V0TmFtZSgpO1xyXG4gIGNvbnN0IGRhdGUgPSBvYmouZ2V0RGF0ZSgpO1xyXG5cclxuICAvKkZJWE1FOiBxdWkgcG9wcGFubyBmdW9yaSBpIGNhbXBpIGltcHV0IGUgY29tZSB2YWx1ZVxyXG4gIGF2cmFubm8gbmFtZSBlIGRhdGUgcXVpIHNvcHJhXHJcbiAgKi9cclxufVxyXG5cclxuLy9UT0RPOiBvY2NoaW8gY2hlIHNpIHBvdHJlYmJlcm8gYXZlcmUgcHJvYmxlbWkgY29sIGxvY2Fsc3RvcmFnZVxyXG4vL3BlciBsJ2F1dG8gY2hlY2tlciBkYXRvIGNoZSBsaSBzb24gdHV0dGUgc3RyaW5naGUsXHJcbi8vZSBub24gc28gY29tZSBzaSByaXNvbHZlIGlsIGZhdHRvIGNoZSBzaWEgdW4gYm9vbGVhblxyXG5mdW5jdGlvbiBuZXdMaShvYmopIHtcclxuICBjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcclxuICBsaS5jbGFzc0xpc3QuYWRkKFwidGFza1wiKTtcclxuXHJcbiAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICBkaXYuY2xhc3NMaXN0LmFkZChcIm5hbWUtdGFza1wiKTtcclxuXHJcbiAgY29uc3QgaVNxdWFyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xyXG4gIGlTcXVhcmUuY2xhc3NMaXN0LmFkZChcImZhLXNvbGlkXCIpO1xyXG5cclxuICAvL2F1dG8tY2hlY2tlciB3aGVuIHdlIHJlY3JhaXRlIHRoZSBsaSBmcm9tIExvY2FsU3RvcmFnZVxyXG4gIGlmIChvYmouY2hlY2tlZCkge1xyXG4gICAgaVNxdWFyZS5jbGFzc0xpc3QuYWRkKFwiZmEtc3F1YXJlLWNoZWNrXCIpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBpU3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJmYS1zcXVhcmVcIik7XHJcbiAgfVxyXG5cclxuICBpU3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjaGFuZ2VUYXNrU3RhdHVzKTtcclxuXHJcbiAgY29uc3QgcE5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcclxuICBwTmFtZS5pbm5lclRleHQgPSBgJHtvYmoudGFza05hbWV9YDtcclxuXHJcbiAgZGl2LmFwcGVuZENoaWxkKGlTcXVhcmUpO1xyXG4gIGRpdi5hcHBlbmRDaGlsZChwTmFtZSk7XHJcbiAgbGkuYXBwZW5kQ2hpbGQoZGl2KTtcclxuXHJcbiAgY29uc3QgZGV0YWlscyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgZGV0YWlscy5jbGFzc0xpc3QuYWRkKFwiZGV0YWlsc1wiKTtcclxuXHJcbiAgY29uc3QgcERhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcclxuICBwRGF0ZS5pbm5lclRleHQgPSBgJHtvYmoudGFza0RhdGV9YDtcclxuXHJcbiAgY29uc3QgaVBlbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xyXG4gIGlQZW4uY2xhc3NMaXN0LmFkZChcImZhLXNvbGlkXCIsIFwiZmEtcGVuLXRvLXNxdWFyZVwiKTtcclxuICBpUGVuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBtb2RUYXNrKTtcclxuXHJcbiAgY29uc3QgaVRyYXNoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XHJcbiAgaVRyYXNoLmNsYXNzTGlzdC5hZGQoXCJmYS1zb2xpZFwiLCBcImZhLXRyYXNoLWNhblwiKTtcclxuICBpVHJhc2guYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGRlbGV0ZVRhc2spO1xyXG5cclxuICBkZXRhaWxzLmFwcGVuZENoaWxkKHBEYXRlKTtcclxuICBkZXRhaWxzLmFwcGVuZENoaWxkKGlQZW4pO1xyXG4gIGRldGFpbHMuYXBwZW5kQ2hpbGQoaVRyYXNoKTtcclxuICBsaS5hcHBlbmRDaGlsZChkZXRhaWxzKTtcclxuXHJcbiAgdGFza3MuYXBwZW5kQ2hpbGQobGkpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYWRkTGlzdGVuZXJzKCkge1xyXG4gIGFkZFRhc2suYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG9wZW5UYXNrUG9wdXApO1xyXG4gIHRhc2tDYW5jZWxCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRvZ2dsZVRhc2tQb3B1cCk7XHJcbiAgdGFza1BvcHVwLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgdG9nZ2xlVGFza1BvcHVwKTtcclxufVxyXG5cclxuZnVuY3Rpb24gb3BlblRhc2tQb3B1cCgpIHtcclxuICB0YXNrUG9wdXAuY2xhc3NMaXN0LnJlbW92ZShcImQtbm9uZVwiKTtcclxuICBhZGRUYXNrLmNsYXNzTGlzdC5hZGQoXCJkLW5vbmVcIik7XHJcbiAgc2V0VGltZW91dCgoKSA9PiB0YXNrTmFtZS5mb2N1cygpLCAxMDApO1xyXG59XHJcblxyXG5mdW5jdGlvbiB0b2dnbGVUYXNrUG9wdXAoZSkge1xyXG4gIGUucHJldmVudERlZmF1bHQoKTtcclxuICB0YXNrUG9wdXAucmVzZXQoKTtcclxuICB0YXNrUG9wdXAuY2xhc3NMaXN0LmFkZChcImQtbm9uZVwiKTtcclxuICBhZGRUYXNrLmNsYXNzTGlzdC5yZW1vdmUoXCJkLW5vbmVcIik7XHJcbn1cclxuIiwiaW1wb3J0IHsgbG9hZFByb2plY3RzIH0gZnJvbSBcIi4vYnVpbGQtbWFpbkxlZnRcIjtcclxuaW1wb3J0IHtcclxuICBnZW5lcmF0ZUluYm94LFxyXG4gIGdlbmVyYXRlUGFnZSxcclxuICBhZGRMaXN0ZW5lcnMsXHJcbiAgbG9hZEluYm94VGFza3MsXHJcbn0gZnJvbSBcIi4vYnVpbGQtbWFpblJpZ2h0XCI7XHJcblxyXG4vKlxyXG5GSVhNRTogcXVpIHNjcml2aWFtbyBsZSBjb3NlIGdlbmVyYWxpIGNoZSBub24gXHJcbnZhbm5vIG5laSBtb2R1bGkgc3BlY2lmaWNpLCBjb21lIHBlciBlc2VtcGlvIHF1ZXN0YSBzb3R0b1xyXG5wZXIgZXNlbXBpbyBkb2JiaWFtbyBhZ2dpdW5nZXJlIGlsIGNvc28gcGVyIGwnaGFtYnVyZ2VyIG1lbnVcclxuKi9cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkdXBsaWNhdGVJbkFycmF5KHRleHQsIGFycmF5LCBvYmpLZXkpIHtcclxuICBsZXQgcmVzdWx0O1xyXG4gIGFycmF5LmZvckVhY2goKG9iaikgPT4ge1xyXG4gICAgaWYgKG9ialtvYmpLZXldID09PSB0ZXh0KSB7XHJcbiAgICAgIHJlc3VsdCA9IHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXN1bHQgPSBmYWxzZTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZnVuY3Rpb24gaGVhZGVySGFtYnVyZ2VyTWVudSgpIHtcclxuICBjb25zdCBtZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImhlYWRlciAuZmEtYmFyc1wiKTtcclxuICBjb25zdCBtYWluTGVmdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWFpbl9fbGVmdFwiKTtcclxuXHJcbiAgZnVuY3Rpb24gY2xpY2tIYW5kbGVyKCkge1xyXG4gICAgbWFpbkxlZnQuY2xhc3NMaXN0LnRvZ2dsZShcImQtbm9uZVwiKTtcclxuICB9XHJcblxyXG4gIG1lbnUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNsaWNrSGFuZGxlcik7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkQWxsKCkge1xyXG4gIGhlYWRlckhhbWJ1cmdlck1lbnUoKTtcclxuXHJcbiAgbG9hZFByb2plY3RzKCk7XHJcblxyXG4gIGFkZExpc3RlbmVycygpO1xyXG4gIGdlbmVyYXRlSW5ib3goKTtcclxuICBsb2FkSW5ib3hUYXNrcygpO1xyXG4gIC8qRklYTUU6IG9jY2hpbyBwb2kgYSBxdWFuZG8gY2kgc2Fyw6AgaWwgbG9jYWwgaG9zdCAqL1xyXG59XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IGJ1aWxkQWxsIGZyb20gXCIuL2J1aWxkLXdlYlwiO1xyXG5cclxuYnVpbGRBbGwoKTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9