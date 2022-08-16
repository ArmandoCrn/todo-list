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
    this.taskList = [];
  }

  addTask(task) {
    this.taskList.push(task);
  }

  getList() {
    return this.taskList;
  }

  getObj() {
    return this;
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
  li.addEventListener("click", () => (0,_build_mainRight__WEBPACK_IMPORTED_MODULE_1__.setCurrentProj)(name));
  li.addEventListener("click", _build_mainRight__WEBPACK_IMPORTED_MODULE_1__.generatePage);
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
inbox.addEventListener("click", _build_mainRight__WEBPACK_IMPORTED_MODULE_1__.removeHandlerProject);
inbox.addEventListener("click", _build_mainRight__WEBPACK_IMPORTED_MODULE_1__.loadInboxTasks);
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
/* harmony export */   "loadInboxTasks": () => (/* binding */ loadInboxTasks),
/* harmony export */   "removeHandlerInbox": () => (/* binding */ removeHandlerInbox),
/* harmony export */   "removeHandlerProject": () => (/* binding */ removeHandlerProject),
/* harmony export */   "setCurrentProj": () => (/* binding */ setCurrentProj)
/* harmony export */ });
/* harmony import */ var _build_web__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./build-web */ "./src/build-web.js");


const tasks = document.querySelector("#tasks");
const h2 = document.querySelector("#main__right > h2");
const addTask = document.querySelector(".add-task");
const taskPopup = document.querySelector(".add-task-popup");
const modTaskPopup = document.querySelector(".mod-task-popup");
const taskCancelBtn = document.querySelector(".add-task-popup .btn-cancel");
const modTaskCancelBtn = document.querySelector(".mod-task-popup .btn-cancel");
const taskAddBtn = document.querySelector(".add-task-popup .btn-add");
const modTaskAddBtn = document.querySelector(".mod-task-popup .btn-add");
const taskName = document.querySelector("#task-name");
const modTaskName = document.querySelector("#task-name-mod");
const taskDate = document.querySelector("#task-date");
const modTaskDate = document.querySelector("#task-date-mod");

const inboxTaskList = [];
let modObj;
let currentProj;

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

function setCurrentProj(proj) {
  currentProj = proj;
}

function generatePage() {
  h2.innerText = currentProj.projectName;

  tasks.innerHTML = "";
  loadProjectTasks();

  removeHandlerInbox();
  removeHandlerProject();
  taskAddBtn.addEventListener("click", addTaskProject);
  // modTaskAddBtn.addEventListener("click", () => modTaskEditBtn(modObj));
}

function addTaskProject() {
  const name = taskName.value;
  const date = taskDate.value;
  const proj = currentProj;
  const array = proj.getList();

  if (name && date) {
    const checkDuplicate = (0,_build_web__WEBPACK_IMPORTED_MODULE_0__.duplicateInArray)(name, array, "taskName");

    if (checkDuplicate) {
      alert("Task names must be different!");
      setTimeout(() => openTaskPopup(), 0);
      return;
    }

    const formatDate = date.split("-").reverse().join("/");

    const myTask = new Task(name, formatDate, false);

    proj.addTask(myTask);
    console.log(proj.getObj());
    newLiForProject(myTask);
  }
}

function generateInbox() {
  h2.innerText = "Inbox";

  taskAddBtn.addEventListener("click", addTaskInbox);
  modTaskAddBtn.addEventListener("click", () => modTaskEditBtn(modObj));
}

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

function removeHandlerInbox() {
  taskAddBtn.removeEventListener("click", addTaskInbox);
}

function removeHandlerProject() {
  taskAddBtn.removeEventListener("click", addTaskProject);
}

function loadInboxTasks() {
  inboxTaskList.forEach((task) => {
    newLi(task);
  });
}

function loadProjectTasks() {
  currentProj.getList().forEach((task) => {
    newLiForProject(task);
  });
}

function checkIndexTask(text) {
  const result = inboxTaskList.findIndex((obj) => obj.taskName === text);
  return result;
}

function checkProjectTask(text) {
  const result = currentProj.getList().findIndex((obj) => obj.taskName === text);
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

function changeTaskProjectStatus() {
  const task = this.nextSibling.innerText;
  const index = checkProjectTask(task);
  const obj = currentProj.getList()[index];
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

function deleteTaskProject() {
  const li = this.parentElement.parentElement;
  const text = li.querySelector(".name-task > p").innerText;
  const index = checkProjectTask(text);
  currentProj.getList().splice(index, 1);

  tasks.innerHTML = "";
  loadProjectTasks();
}

function modTask() {
  const li = this.parentElement.parentElement;
  const text = li.querySelector(".name-task > p").innerText;
  const index = checkIndexTask(text);
  const obj = inboxTaskList[index];

  modObj = obj;

  const name = obj.getName();
  const date = obj.getDate();

  const formatDate = date.split("/").reverse().join("-");

  openModTaskPopup();

  modTaskName.value = name;
  modTaskDate.value = formatDate;
}

function modTaskEditBtn(obj) {
  const name = modTaskName.value;
  const date = modTaskDate.value;

  const formatDate = date.split("-").reverse().join("/");

  obj.setName(name);
  obj.setDate(formatDate);

  tasks.innerHTML = "";
  loadInboxTasks();
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

function newLiForProject(obj) {
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

  iSquare.addEventListener("click", changeTaskProjectStatus);

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
  iTrash.addEventListener("click", deleteTaskProject);

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

  modTaskCancelBtn.addEventListener("click", toggleModTaskPopup);
  modTaskPopup.addEventListener("submit", toggleModTaskPopup);
}

function openTaskPopup() {
  taskPopup.classList.remove("d-none");
  addTask.classList.add("d-none");
  setTimeout(() => taskName.focus(), 100);
}

function openModTaskPopup() {
  modTaskPopup.classList.remove("d-none");
  setTimeout(() => modTaskName.focus(), 100);
}

function toggleTaskPopup(e) {
  e.preventDefault();
  taskPopup.reset();
  taskPopup.classList.add("d-none");
  addTask.classList.remove("d-none");
}

function toggleModTaskPopup(e) {
  e.preventDefault();
  modTaskPopup.reset();
  modTaskPopup.classList.add("d-none");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQStDO0FBUXBCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLDREQUFnQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPLGlCQUFpQjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsZ0VBQWM7QUFDbkQsK0JBQStCLDBEQUFZO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsMkRBQWE7QUFDN0MsZ0NBQWdDLGtFQUFvQjtBQUNwRCxnQ0FBZ0MsNERBQWM7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3RKK0M7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLDREQUFnQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLDREQUFnQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsYUFBYTtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsYUFBYTtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGFBQWE7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGFBQWE7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xXZ0Q7QUFNckI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ2U7QUFDZjtBQUNBO0FBQ0EsRUFBRSw2REFBWTtBQUNkO0FBQ0EsRUFBRSw4REFBWTtBQUNkLEVBQUUsK0RBQWE7QUFDZixFQUFFLGdFQUFjO0FBQ2hCO0FBQ0E7Ozs7Ozs7VUMvQ0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05tQztBQUNuQztBQUNBLHNEQUFRIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vNC10b2RvLWxpc3QvLi9zcmMvYnVpbGQtbWFpbkxlZnQuanMiLCJ3ZWJwYWNrOi8vNC10b2RvLWxpc3QvLi9zcmMvYnVpbGQtbWFpblJpZ2h0LmpzIiwid2VicGFjazovLzQtdG9kby1saXN0Ly4vc3JjL2J1aWxkLXdlYi5qcyIsIndlYnBhY2s6Ly80LXRvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly80LXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vNC10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly80LXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLzQtdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGR1cGxpY2F0ZUluQXJyYXkgfSBmcm9tIFwiLi9idWlsZC13ZWJcIjtcclxuaW1wb3J0IHtcclxuICBnZW5lcmF0ZUluYm94LFxyXG4gIGdlbmVyYXRlUGFnZSxcclxuICByZW1vdmVIYW5kbGVySW5ib3gsXHJcbiAgcmVtb3ZlSGFuZGxlclByb2plY3QsXHJcbiAgbG9hZEluYm94VGFza3MsXHJcbiAgc2V0Q3VycmVudFByb2osXHJcbn0gZnJvbSBcIi4vYnVpbGQtbWFpblJpZ2h0XCI7XHJcblxyXG5jb25zdCBtYWluTGVmdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWFpbl9fbGVmdFwiKTtcclxuY29uc3QgaW5ib3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmluYm94XCIpO1xyXG5jb25zdCB0b2RheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kYXlcIik7XHJcblxyXG5jb25zdCBwcm9qZWN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdHNcIik7XHJcbmNvbnN0IGFkZFByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC1wcm9qZWN0XCIpO1xyXG5jb25zdCBwcm9qZWN0UG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC1wcm9qZWN0LXBvcHVwXCIpO1xyXG5jb25zdCBwcm9qZWN0Q2FuY2VsQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtcHJvamVjdC1wb3B1cCAuYnRuLWNhbmNlbFwiKTtcclxuY29uc3QgcHJvamVjdEFkZEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXByb2plY3QtcG9wdXAgLmJ0bi1hZGRcIik7XHJcbmNvbnN0IHByb2plY3RJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdC1uYW1lXCIpO1xyXG5cclxuLypcclxuVXNlIHRoZSBvYmoucHJvamVjdE5hbWUgYXMgYSBcImtleVwiIGZvciBsb2FkIHRoZSBwYWdlIFxyXG5vZiB0aGUgdGFza3MgbGlzdFxyXG4qL1xyXG5jb25zdCBwcm9qZWN0TGlzdCA9IFtdO1xyXG5cclxuY2xhc3MgUHJvamVjdCB7XHJcbiAgY29uc3RydWN0b3IobmFtZSkge1xyXG4gICAgdGhpcy5wcm9qZWN0TmFtZSA9IG5hbWU7XHJcbiAgICB0aGlzLnRhc2tMaXN0ID0gW107XHJcbiAgfVxyXG5cclxuICBhZGRUYXNrKHRhc2spIHtcclxuICAgIHRoaXMudGFza0xpc3QucHVzaCh0YXNrKTtcclxuICB9XHJcblxyXG4gIGdldExpc3QoKSB7XHJcbiAgICByZXR1cm4gdGhpcy50YXNrTGlzdDtcclxuICB9XHJcblxyXG4gIGdldE9iaigpIHtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gYWRkUHJvamVjdFBvcHVwKCkge1xyXG4gIGNvbnN0IHByb2plY3ROYW1lID0gcHJvamVjdElucHV0LnZhbHVlO1xyXG4gIGlmIChwcm9qZWN0TmFtZSkge1xyXG4gICAgY29uc3QgY2hlY2tEdXBsaWNhdGUgPSBkdXBsaWNhdGVJbkFycmF5KHByb2plY3ROYW1lLCBwcm9qZWN0TGlzdCwgXCJwcm9qZWN0TmFtZVwiKTtcclxuXHJcbiAgICBpZiAoY2hlY2tEdXBsaWNhdGUpIHtcclxuICAgICAgYWxlcnQoXCJQcm9qZWN0IG5hbWVzIG11c3QgYmUgZGlmZmVyZW50IVwiKTtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiBvcGVuUHJvamVjdFBvcHVwKCksIDApO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbXlQcm9qZWN0ID0gbmV3IFByb2plY3QocHJvamVjdE5hbWUpO1xyXG5cclxuICAgIHByb2plY3RMaXN0LnB1c2gobXlQcm9qZWN0KTtcclxuICAgIGNyZWF0ZU5ld0xpKG15UHJvamVjdCk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjaGVja0ZvckluZGV4KHRleHQpIHtcclxuICBjb25zdCByZXN1bHQgPSBwcm9qZWN0TGlzdC5maW5kSW5kZXgoKG9iaikgPT4gb2JqLnByb2plY3ROYW1lID09PSB0ZXh0KTtcclxuICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5mdW5jdGlvbiBkZWxldGVQcm9qZWN0KGUpIHtcclxuICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gIGNvbnN0IGxpID0gdGhpcy5wYXJlbnRFbGVtZW50O1xyXG4gIGNvbnN0IHRleHQgPSBsaS5xdWVyeVNlbGVjdG9yKFwiZGl2ID4gcFwiKS5pbm5lclRleHQ7XHJcbiAgY29uc3QgaW5kZXggPSBjaGVja0ZvckluZGV4KHRleHQpO1xyXG4gIHByb2plY3RMaXN0LnNwbGljZShpbmRleCwgMSk7XHJcblxyXG4gIHByb2plY3RzLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgbG9hZFByb2plY3RzKCk7XHJcblxyXG4gIC8qRklYTUU6IG9jY2hpbyBjaGUgcXVhbmRvIGNpIHNhcmFubm8gcG9pIGkgdGFza1xyXG4gIGFsbCdpbnRlcm5vIGRlbCBwcm9nZXR0bywgZG92cmFubm9cclxuICBlc3NlcmUgZWxpbWluYXRpIGluIGF1dG9tYXRpY28gYW5jaCdlc3NpKi9cclxuXHJcbiAgLypUT0RPOiBRdWFuZG8gZWxpbWluaSBpbCBwcm9nZXR0bywgcG9pIGlsIHJpZ3RoIG1haW5cclxuICBkYWxnaSB1biBpbm5lclRleHQgdnVvdG8gbyByb2JlIGNvc8OsXHJcbiAgYWx0cmltZW50aSBmYWxsbyBhbmRhcmUgc3UgaW5ib3gsbyBib2gsIHF1ZWwgY2hlIHRpIHBhcmVcclxuICAqL1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVOZXdMaShuYW1lKSB7XHJcbiAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XHJcbiAgbGkuY2xhc3NMaXN0LmFkZChcInByb2plY3RcIik7XHJcbiAgbGkuaW5uZXJIVE1MID0gYFxyXG4gIDxkaXY+XHJcbiAgPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1saXN0XCI+PC9pPlxyXG4gIDxwPiR7bmFtZS5wcm9qZWN0TmFtZX08L3A+XHJcbiAgPC9kaXY+XHJcbiAgYDtcclxuXHJcbiAgY29uc3QgaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xyXG4gIGkuY2xhc3NMaXN0LmFkZChcImZhLXNvbGlkXCIsIFwiZmEtdHJhc2gtY2FuXCIpO1xyXG4gIGkuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGRlbGV0ZVByb2plY3QpO1xyXG4gIGxpLmFwcGVuZENoaWxkKGkpO1xyXG5cclxuICBsaS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgbGlDbGljayk7XHJcbiAgbGkuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHNldEN1cnJlbnRQcm9qKG5hbWUpKTtcclxuICBsaS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZ2VuZXJhdGVQYWdlKTtcclxuICBwcm9qZWN0cy5hcHBlbmRDaGlsZChsaSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxpQ2xpY2soKSB7XHJcbiAgaWYgKCF0aGlzLmNsYXNzTmFtZS5pbmNsdWRlcyhcImFjdGl2ZVwiKSkge1xyXG4gICAgdGhpcy5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgbGlzdE9mTGkgPSBtYWluTGVmdC5xdWVyeVNlbGVjdG9yQWxsKFwibGlcIik7XHJcbiAgbGlzdE9mTGkuZm9yRWFjaCgoZWwpID0+IHtcclxuICAgIGlmIChlbCAhPT0gdGhpcykge1xyXG4gICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbG9hZFByb2plY3RzKCkge1xyXG4gIHByb2plY3RMaXN0LmZvckVhY2goKHByb2plY3QpID0+IHtcclxuICAgIGNyZWF0ZU5ld0xpKHByb2plY3QpO1xyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBvcGVuUHJvamVjdFBvcHVwKCkge1xyXG4gIHByb2plY3RQb3B1cC5jbGFzc0xpc3QucmVtb3ZlKFwiZC1ub25lXCIpO1xyXG4gIGFkZFByb2plY3QuY2xhc3NMaXN0LmFkZChcImQtbm9uZVwiKTtcclxuICBzZXRUaW1lb3V0KCgpID0+IHByb2plY3RJbnB1dC5mb2N1cygpLCAxMDApO1xyXG59XHJcblxyXG5mdW5jdGlvbiB0b2dnbGVQcm9qZWN0UG9wdXAoZSkge1xyXG4gIGUucHJldmVudERlZmF1bHQoKTtcclxuICBwcm9qZWN0UG9wdXAucmVzZXQoKTtcclxuICBwcm9qZWN0UG9wdXAuY2xhc3NMaXN0LmFkZChcImQtbm9uZVwiKTtcclxuICBhZGRQcm9qZWN0LmNsYXNzTGlzdC5yZW1vdmUoXCJkLW5vbmVcIik7XHJcbn1cclxuXHJcbmluYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBsaUNsaWNrKTtcclxuaW5ib3guYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGdlbmVyYXRlSW5ib3gpO1xyXG5pbmJveC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcmVtb3ZlSGFuZGxlclByb2plY3QpO1xyXG5pbmJveC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgbG9hZEluYm94VGFza3MpO1xyXG50b2RheS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgbGlDbGljayk7XHJcbmFkZFByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG9wZW5Qcm9qZWN0UG9wdXApO1xyXG5wcm9qZWN0QWRkQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhZGRQcm9qZWN0UG9wdXApO1xyXG5wcm9qZWN0Q2FuY2VsQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0b2dnbGVQcm9qZWN0UG9wdXApO1xyXG5wcm9qZWN0UG9wdXAuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCB0b2dnbGVQcm9qZWN0UG9wdXApO1xyXG4iLCJpbXBvcnQgeyBkdXBsaWNhdGVJbkFycmF5IH0gZnJvbSBcIi4vYnVpbGQtd2ViXCI7XHJcblxyXG5jb25zdCB0YXNrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFza3NcIik7XHJcbmNvbnN0IGgyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtYWluX19yaWdodCA+IGgyXCIpO1xyXG5jb25zdCBhZGRUYXNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtdGFza1wiKTtcclxuY29uc3QgdGFza1BvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtdGFzay1wb3B1cFwiKTtcclxuY29uc3QgbW9kVGFza1BvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tb2QtdGFzay1wb3B1cFwiKTtcclxuY29uc3QgdGFza0NhbmNlbEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXRhc2stcG9wdXAgLmJ0bi1jYW5jZWxcIik7XHJcbmNvbnN0IG1vZFRhc2tDYW5jZWxCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1vZC10YXNrLXBvcHVwIC5idG4tY2FuY2VsXCIpO1xyXG5jb25zdCB0YXNrQWRkQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtdGFzay1wb3B1cCAuYnRuLWFkZFwiKTtcclxuY29uc3QgbW9kVGFza0FkZEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubW9kLXRhc2stcG9wdXAgLmJ0bi1hZGRcIik7XHJcbmNvbnN0IHRhc2tOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrLW5hbWVcIik7XHJcbmNvbnN0IG1vZFRhc2tOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrLW5hbWUtbW9kXCIpO1xyXG5jb25zdCB0YXNrRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFzay1kYXRlXCIpO1xyXG5jb25zdCBtb2RUYXNrRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFzay1kYXRlLW1vZFwiKTtcclxuXHJcbmNvbnN0IGluYm94VGFza0xpc3QgPSBbXTtcclxubGV0IG1vZE9iajtcclxubGV0IGN1cnJlbnRQcm9qO1xyXG5cclxuY2xhc3MgVGFzayB7XHJcbiAgY29uc3RydWN0b3IobmFtZSwgZGF0ZSwgc3RhdHVzKSB7XHJcbiAgICB0aGlzLnRhc2tOYW1lID0gbmFtZTtcclxuICAgIHRoaXMudGFza0RhdGUgPSBkYXRlO1xyXG4gICAgdGhpcy5jaGVja2VkID0gc3RhdHVzO1xyXG4gIH1cclxuXHJcbiAgc2V0TmFtZShuYW1lKSB7XHJcbiAgICB0aGlzLnRhc2tOYW1lID0gbmFtZTtcclxuICB9XHJcblxyXG4gIGdldE5hbWUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy50YXNrTmFtZTtcclxuICB9XHJcblxyXG4gIHNldERhdGUoZGF0ZSkge1xyXG4gICAgdGhpcy50YXNrRGF0ZSA9IGRhdGU7XHJcbiAgfVxyXG5cclxuICBnZXREYXRlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMudGFza0RhdGU7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0Q3VycmVudFByb2oocHJvaikge1xyXG4gIGN1cnJlbnRQcm9qID0gcHJvajtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlUGFnZSgpIHtcclxuICBoMi5pbm5lclRleHQgPSBjdXJyZW50UHJvai5wcm9qZWN0TmFtZTtcclxuXHJcbiAgdGFza3MuaW5uZXJIVE1MID0gXCJcIjtcclxuICBsb2FkUHJvamVjdFRhc2tzKCk7XHJcblxyXG4gIHJlbW92ZUhhbmRsZXJJbmJveCgpO1xyXG4gIHJlbW92ZUhhbmRsZXJQcm9qZWN0KCk7XHJcbiAgdGFza0FkZEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYWRkVGFza1Byb2plY3QpO1xyXG4gIC8vIG1vZFRhc2tBZGRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IG1vZFRhc2tFZGl0QnRuKG1vZE9iaikpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRUYXNrUHJvamVjdCgpIHtcclxuICBjb25zdCBuYW1lID0gdGFza05hbWUudmFsdWU7XHJcbiAgY29uc3QgZGF0ZSA9IHRhc2tEYXRlLnZhbHVlO1xyXG4gIGNvbnN0IHByb2ogPSBjdXJyZW50UHJvajtcclxuICBjb25zdCBhcnJheSA9IHByb2ouZ2V0TGlzdCgpO1xyXG5cclxuICBpZiAobmFtZSAmJiBkYXRlKSB7XHJcbiAgICBjb25zdCBjaGVja0R1cGxpY2F0ZSA9IGR1cGxpY2F0ZUluQXJyYXkobmFtZSwgYXJyYXksIFwidGFza05hbWVcIik7XHJcblxyXG4gICAgaWYgKGNoZWNrRHVwbGljYXRlKSB7XHJcbiAgICAgIGFsZXJ0KFwiVGFzayBuYW1lcyBtdXN0IGJlIGRpZmZlcmVudCFcIik7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gb3BlblRhc2tQb3B1cCgpLCAwKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGZvcm1hdERhdGUgPSBkYXRlLnNwbGl0KFwiLVwiKS5yZXZlcnNlKCkuam9pbihcIi9cIik7XHJcblxyXG4gICAgY29uc3QgbXlUYXNrID0gbmV3IFRhc2sobmFtZSwgZm9ybWF0RGF0ZSwgZmFsc2UpO1xyXG5cclxuICAgIHByb2ouYWRkVGFzayhteVRhc2spO1xyXG4gICAgY29uc29sZS5sb2cocHJvai5nZXRPYmooKSk7XHJcbiAgICBuZXdMaUZvclByb2plY3QobXlUYXNrKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZUluYm94KCkge1xyXG4gIGgyLmlubmVyVGV4dCA9IFwiSW5ib3hcIjtcclxuXHJcbiAgdGFza0FkZEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYWRkVGFza0luYm94KTtcclxuICBtb2RUYXNrQWRkQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBtb2RUYXNrRWRpdEJ0bihtb2RPYmopKTtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkVGFza0luYm94KCkge1xyXG4gIGNvbnN0IG5hbWUgPSB0YXNrTmFtZS52YWx1ZTtcclxuICBjb25zdCBkYXRlID0gdGFza0RhdGUudmFsdWU7XHJcblxyXG4gIGlmIChuYW1lICYmIGRhdGUpIHtcclxuICAgIGNvbnN0IGNoZWNrRHVwbGljYXRlID0gZHVwbGljYXRlSW5BcnJheShuYW1lLCBpbmJveFRhc2tMaXN0LCBcInRhc2tOYW1lXCIpO1xyXG5cclxuICAgIGlmIChjaGVja0R1cGxpY2F0ZSkge1xyXG4gICAgICBhbGVydChcIlRhc2sgbmFtZXMgbXVzdCBiZSBkaWZmZXJlbnQhXCIpO1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IG9wZW5UYXNrUG9wdXAoKSwgMCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBmb3JtYXREYXRlID0gZGF0ZS5zcGxpdChcIi1cIikucmV2ZXJzZSgpLmpvaW4oXCIvXCIpO1xyXG5cclxuICAgIGNvbnN0IG15VGFzayA9IG5ldyBUYXNrKG5hbWUsIGZvcm1hdERhdGUsIGZhbHNlKTtcclxuXHJcbiAgICBpbmJveFRhc2tMaXN0LnB1c2gobXlUYXNrKTtcclxuICAgIG5ld0xpKG15VGFzayk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlSGFuZGxlckluYm94KCkge1xyXG4gIHRhc2tBZGRCdG4ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFkZFRhc2tJbmJveCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVIYW5kbGVyUHJvamVjdCgpIHtcclxuICB0YXNrQWRkQnRuLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhZGRUYXNrUHJvamVjdCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBsb2FkSW5ib3hUYXNrcygpIHtcclxuICBpbmJveFRhc2tMaXN0LmZvckVhY2goKHRhc2spID0+IHtcclxuICAgIG5ld0xpKHRhc2spO1xyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBsb2FkUHJvamVjdFRhc2tzKCkge1xyXG4gIGN1cnJlbnRQcm9qLmdldExpc3QoKS5mb3JFYWNoKCh0YXNrKSA9PiB7XHJcbiAgICBuZXdMaUZvclByb2plY3QodGFzayk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNoZWNrSW5kZXhUYXNrKHRleHQpIHtcclxuICBjb25zdCByZXN1bHQgPSBpbmJveFRhc2tMaXN0LmZpbmRJbmRleCgob2JqKSA9PiBvYmoudGFza05hbWUgPT09IHRleHQpO1xyXG4gIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNoZWNrUHJvamVjdFRhc2sodGV4dCkge1xyXG4gIGNvbnN0IHJlc3VsdCA9IGN1cnJlbnRQcm9qLmdldExpc3QoKS5maW5kSW5kZXgoKG9iaikgPT4gb2JqLnRhc2tOYW1lID09PSB0ZXh0KTtcclxuICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5mdW5jdGlvbiBjaGVja0xpKG9iaiwgaWNvbikge1xyXG4gIGlmIChvYmouY2hlY2tlZCkge1xyXG4gICAgaWNvbi5jbGFzc0xpc3QucmVtb3ZlKFwiZmEtc3F1YXJlXCIpO1xyXG4gICAgaWNvbi5jbGFzc0xpc3QuYWRkKFwiZmEtc3F1YXJlLWNoZWNrXCIpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBpY29uLmNsYXNzTGlzdC5yZW1vdmUoXCJmYS1zcXVhcmUtY2hlY2tcIik7XHJcbiAgICBpY29uLmNsYXNzTGlzdC5hZGQoXCJmYS1zcXVhcmVcIik7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjaGFuZ2VUYXNrU3RhdHVzKCkge1xyXG4gIGNvbnN0IHRhc2sgPSB0aGlzLm5leHRTaWJsaW5nLmlubmVyVGV4dDtcclxuICBjb25zdCBpbmRleCA9IGNoZWNrSW5kZXhUYXNrKHRhc2spO1xyXG4gIGNvbnN0IG9iaiA9IGluYm94VGFza0xpc3RbaW5kZXhdO1xyXG4gIG9iai5jaGVja2VkID0gIW9iai5jaGVja2VkO1xyXG5cclxuICBjaGVja0xpKG9iaiwgdGhpcyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNoYW5nZVRhc2tQcm9qZWN0U3RhdHVzKCkge1xyXG4gIGNvbnN0IHRhc2sgPSB0aGlzLm5leHRTaWJsaW5nLmlubmVyVGV4dDtcclxuICBjb25zdCBpbmRleCA9IGNoZWNrUHJvamVjdFRhc2sodGFzayk7XHJcbiAgY29uc3Qgb2JqID0gY3VycmVudFByb2ouZ2V0TGlzdCgpW2luZGV4XTtcclxuICBvYmouY2hlY2tlZCA9ICFvYmouY2hlY2tlZDtcclxuXHJcbiAgY2hlY2tMaShvYmosIHRoaXMpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkZWxldGVUYXNrKCkge1xyXG4gIGNvbnN0IGxpID0gdGhpcy5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XHJcbiAgY29uc3QgdGV4dCA9IGxpLnF1ZXJ5U2VsZWN0b3IoXCIubmFtZS10YXNrID4gcFwiKS5pbm5lclRleHQ7XHJcbiAgY29uc3QgaW5kZXggPSBjaGVja0luZGV4VGFzayh0ZXh0KTtcclxuICBpbmJveFRhc2tMaXN0LnNwbGljZShpbmRleCwgMSk7XHJcblxyXG4gIHRhc2tzLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgbG9hZEluYm94VGFza3MoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZGVsZXRlVGFza1Byb2plY3QoKSB7XHJcbiAgY29uc3QgbGkgPSB0aGlzLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcclxuICBjb25zdCB0ZXh0ID0gbGkucXVlcnlTZWxlY3RvcihcIi5uYW1lLXRhc2sgPiBwXCIpLmlubmVyVGV4dDtcclxuICBjb25zdCBpbmRleCA9IGNoZWNrUHJvamVjdFRhc2sodGV4dCk7XHJcbiAgY3VycmVudFByb2ouZ2V0TGlzdCgpLnNwbGljZShpbmRleCwgMSk7XHJcblxyXG4gIHRhc2tzLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgbG9hZFByb2plY3RUYXNrcygpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBtb2RUYXNrKCkge1xyXG4gIGNvbnN0IGxpID0gdGhpcy5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XHJcbiAgY29uc3QgdGV4dCA9IGxpLnF1ZXJ5U2VsZWN0b3IoXCIubmFtZS10YXNrID4gcFwiKS5pbm5lclRleHQ7XHJcbiAgY29uc3QgaW5kZXggPSBjaGVja0luZGV4VGFzayh0ZXh0KTtcclxuICBjb25zdCBvYmogPSBpbmJveFRhc2tMaXN0W2luZGV4XTtcclxuXHJcbiAgbW9kT2JqID0gb2JqO1xyXG5cclxuICBjb25zdCBuYW1lID0gb2JqLmdldE5hbWUoKTtcclxuICBjb25zdCBkYXRlID0gb2JqLmdldERhdGUoKTtcclxuXHJcbiAgY29uc3QgZm9ybWF0RGF0ZSA9IGRhdGUuc3BsaXQoXCIvXCIpLnJldmVyc2UoKS5qb2luKFwiLVwiKTtcclxuXHJcbiAgb3Blbk1vZFRhc2tQb3B1cCgpO1xyXG5cclxuICBtb2RUYXNrTmFtZS52YWx1ZSA9IG5hbWU7XHJcbiAgbW9kVGFza0RhdGUudmFsdWUgPSBmb3JtYXREYXRlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBtb2RUYXNrRWRpdEJ0bihvYmopIHtcclxuICBjb25zdCBuYW1lID0gbW9kVGFza05hbWUudmFsdWU7XHJcbiAgY29uc3QgZGF0ZSA9IG1vZFRhc2tEYXRlLnZhbHVlO1xyXG5cclxuICBjb25zdCBmb3JtYXREYXRlID0gZGF0ZS5zcGxpdChcIi1cIikucmV2ZXJzZSgpLmpvaW4oXCIvXCIpO1xyXG5cclxuICBvYmouc2V0TmFtZShuYW1lKTtcclxuICBvYmouc2V0RGF0ZShmb3JtYXREYXRlKTtcclxuXHJcbiAgdGFza3MuaW5uZXJIVE1MID0gXCJcIjtcclxuICBsb2FkSW5ib3hUYXNrcygpO1xyXG59XHJcblxyXG4vL1RPRE86IG9jY2hpbyBjaGUgc2kgcG90cmViYmVybyBhdmVyZSBwcm9ibGVtaSBjb2wgbG9jYWxzdG9yYWdlXHJcbi8vcGVyIGwnYXV0byBjaGVja2VyIGRhdG8gY2hlIGxpIHNvbiB0dXR0ZSBzdHJpbmdoZSxcclxuLy9lIG5vbiBzbyBjb21lIHNpIHJpc29sdmUgaWwgZmF0dG8gY2hlIHNpYSB1biBib29sZWFuXHJcbmZ1bmN0aW9uIG5ld0xpKG9iaikge1xyXG4gIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xyXG4gIGxpLmNsYXNzTGlzdC5hZGQoXCJ0YXNrXCIpO1xyXG5cclxuICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gIGRpdi5jbGFzc0xpc3QuYWRkKFwibmFtZS10YXNrXCIpO1xyXG5cclxuICBjb25zdCBpU3F1YXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XHJcbiAgaVNxdWFyZS5jbGFzc0xpc3QuYWRkKFwiZmEtc29saWRcIik7XHJcblxyXG4gIC8vYXV0by1jaGVja2VyIHdoZW4gd2UgcmVjcmFpdGUgdGhlIGxpIGZyb20gTG9jYWxTdG9yYWdlXHJcbiAgaWYgKG9iai5jaGVja2VkKSB7XHJcbiAgICBpU3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJmYS1zcXVhcmUtY2hlY2tcIik7XHJcbiAgfSBlbHNlIHtcclxuICAgIGlTcXVhcmUuY2xhc3NMaXN0LmFkZChcImZhLXNxdWFyZVwiKTtcclxuICB9XHJcblxyXG4gIGlTcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNoYW5nZVRhc2tTdGF0dXMpO1xyXG5cclxuICBjb25zdCBwTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xyXG4gIHBOYW1lLmlubmVyVGV4dCA9IGAke29iai50YXNrTmFtZX1gO1xyXG5cclxuICBkaXYuYXBwZW5kQ2hpbGQoaVNxdWFyZSk7XHJcbiAgZGl2LmFwcGVuZENoaWxkKHBOYW1lKTtcclxuICBsaS5hcHBlbmRDaGlsZChkaXYpO1xyXG5cclxuICBjb25zdCBkZXRhaWxzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICBkZXRhaWxzLmNsYXNzTGlzdC5hZGQoXCJkZXRhaWxzXCIpO1xyXG5cclxuICBjb25zdCBwRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xyXG4gIHBEYXRlLmlubmVyVGV4dCA9IGAke29iai50YXNrRGF0ZX1gO1xyXG5cclxuICBjb25zdCBpUGVuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XHJcbiAgaVBlbi5jbGFzc0xpc3QuYWRkKFwiZmEtc29saWRcIiwgXCJmYS1wZW4tdG8tc3F1YXJlXCIpO1xyXG4gIGlQZW4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG1vZFRhc2spO1xyXG5cclxuICBjb25zdCBpVHJhc2ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcclxuICBpVHJhc2guY2xhc3NMaXN0LmFkZChcImZhLXNvbGlkXCIsIFwiZmEtdHJhc2gtY2FuXCIpO1xyXG4gIGlUcmFzaC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZGVsZXRlVGFzayk7XHJcblxyXG4gIGRldGFpbHMuYXBwZW5kQ2hpbGQocERhdGUpO1xyXG4gIGRldGFpbHMuYXBwZW5kQ2hpbGQoaVBlbik7XHJcbiAgZGV0YWlscy5hcHBlbmRDaGlsZChpVHJhc2gpO1xyXG4gIGxpLmFwcGVuZENoaWxkKGRldGFpbHMpO1xyXG5cclxuICB0YXNrcy5hcHBlbmRDaGlsZChsaSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG5ld0xpRm9yUHJvamVjdChvYmopIHtcclxuICBjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcclxuICBsaS5jbGFzc0xpc3QuYWRkKFwidGFza1wiKTtcclxuXHJcbiAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICBkaXYuY2xhc3NMaXN0LmFkZChcIm5hbWUtdGFza1wiKTtcclxuXHJcbiAgY29uc3QgaVNxdWFyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xyXG4gIGlTcXVhcmUuY2xhc3NMaXN0LmFkZChcImZhLXNvbGlkXCIpO1xyXG5cclxuICAvL2F1dG8tY2hlY2tlciB3aGVuIHdlIHJlY3JhaXRlIHRoZSBsaSBmcm9tIExvY2FsU3RvcmFnZVxyXG4gIGlmIChvYmouY2hlY2tlZCkge1xyXG4gICAgaVNxdWFyZS5jbGFzc0xpc3QuYWRkKFwiZmEtc3F1YXJlLWNoZWNrXCIpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBpU3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJmYS1zcXVhcmVcIik7XHJcbiAgfVxyXG5cclxuICBpU3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjaGFuZ2VUYXNrUHJvamVjdFN0YXR1cyk7XHJcblxyXG4gIGNvbnN0IHBOYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XHJcbiAgcE5hbWUuaW5uZXJUZXh0ID0gYCR7b2JqLnRhc2tOYW1lfWA7XHJcblxyXG4gIGRpdi5hcHBlbmRDaGlsZChpU3F1YXJlKTtcclxuICBkaXYuYXBwZW5kQ2hpbGQocE5hbWUpO1xyXG4gIGxpLmFwcGVuZENoaWxkKGRpdik7XHJcblxyXG4gIGNvbnN0IGRldGFpbHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gIGRldGFpbHMuY2xhc3NMaXN0LmFkZChcImRldGFpbHNcIik7XHJcblxyXG4gIGNvbnN0IHBEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XHJcbiAgcERhdGUuaW5uZXJUZXh0ID0gYCR7b2JqLnRhc2tEYXRlfWA7XHJcblxyXG4gIGNvbnN0IGlQZW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcclxuICBpUGVuLmNsYXNzTGlzdC5hZGQoXCJmYS1zb2xpZFwiLCBcImZhLXBlbi10by1zcXVhcmVcIik7XHJcbiAgaVBlbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgbW9kVGFzayk7XHJcblxyXG4gIGNvbnN0IGlUcmFzaCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xyXG4gIGlUcmFzaC5jbGFzc0xpc3QuYWRkKFwiZmEtc29saWRcIiwgXCJmYS10cmFzaC1jYW5cIik7XHJcbiAgaVRyYXNoLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBkZWxldGVUYXNrUHJvamVjdCk7XHJcblxyXG4gIGRldGFpbHMuYXBwZW5kQ2hpbGQocERhdGUpO1xyXG4gIGRldGFpbHMuYXBwZW5kQ2hpbGQoaVBlbik7XHJcbiAgZGV0YWlscy5hcHBlbmRDaGlsZChpVHJhc2gpO1xyXG4gIGxpLmFwcGVuZENoaWxkKGRldGFpbHMpO1xyXG5cclxuICB0YXNrcy5hcHBlbmRDaGlsZChsaSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhZGRMaXN0ZW5lcnMoKSB7XHJcbiAgYWRkVGFzay5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgb3BlblRhc2tQb3B1cCk7XHJcbiAgdGFza0NhbmNlbEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdG9nZ2xlVGFza1BvcHVwKTtcclxuICB0YXNrUG9wdXAuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCB0b2dnbGVUYXNrUG9wdXApO1xyXG5cclxuICBtb2RUYXNrQ2FuY2VsQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0b2dnbGVNb2RUYXNrUG9wdXApO1xyXG4gIG1vZFRhc2tQb3B1cC5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIHRvZ2dsZU1vZFRhc2tQb3B1cCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG9wZW5UYXNrUG9wdXAoKSB7XHJcbiAgdGFza1BvcHVwLmNsYXNzTGlzdC5yZW1vdmUoXCJkLW5vbmVcIik7XHJcbiAgYWRkVGFzay5jbGFzc0xpc3QuYWRkKFwiZC1ub25lXCIpO1xyXG4gIHNldFRpbWVvdXQoKCkgPT4gdGFza05hbWUuZm9jdXMoKSwgMTAwKTtcclxufVxyXG5cclxuZnVuY3Rpb24gb3Blbk1vZFRhc2tQb3B1cCgpIHtcclxuICBtb2RUYXNrUG9wdXAuY2xhc3NMaXN0LnJlbW92ZShcImQtbm9uZVwiKTtcclxuICBzZXRUaW1lb3V0KCgpID0+IG1vZFRhc2tOYW1lLmZvY3VzKCksIDEwMCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRvZ2dsZVRhc2tQb3B1cChlKSB7XHJcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIHRhc2tQb3B1cC5yZXNldCgpO1xyXG4gIHRhc2tQb3B1cC5jbGFzc0xpc3QuYWRkKFwiZC1ub25lXCIpO1xyXG4gIGFkZFRhc2suY2xhc3NMaXN0LnJlbW92ZShcImQtbm9uZVwiKTtcclxufVxyXG5cclxuZnVuY3Rpb24gdG9nZ2xlTW9kVGFza1BvcHVwKGUpIHtcclxuICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgbW9kVGFza1BvcHVwLnJlc2V0KCk7XHJcbiAgbW9kVGFza1BvcHVwLmNsYXNzTGlzdC5hZGQoXCJkLW5vbmVcIik7XHJcbn1cclxuIiwiaW1wb3J0IHsgbG9hZFByb2plY3RzIH0gZnJvbSBcIi4vYnVpbGQtbWFpbkxlZnRcIjtcclxuaW1wb3J0IHtcclxuICBnZW5lcmF0ZUluYm94LFxyXG4gIGdlbmVyYXRlUGFnZSxcclxuICBhZGRMaXN0ZW5lcnMsXHJcbiAgbG9hZEluYm94VGFza3MsXHJcbn0gZnJvbSBcIi4vYnVpbGQtbWFpblJpZ2h0XCI7XHJcblxyXG4vKlxyXG5GSVhNRTogcXVpIHNjcml2aWFtbyBsZSBjb3NlIGdlbmVyYWxpIGNoZSBub24gXHJcbnZhbm5vIG5laSBtb2R1bGkgc3BlY2lmaWNpLCBjb21lIHBlciBlc2VtcGlvIHF1ZXN0YSBzb3R0b1xyXG5wZXIgZXNlbXBpbyBkb2JiaWFtbyBhZ2dpdW5nZXJlIGlsIGNvc28gcGVyIGwnaGFtYnVyZ2VyIG1lbnVcclxuKi9cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkdXBsaWNhdGVJbkFycmF5KHRleHQsIGFycmF5LCBvYmpLZXkpIHtcclxuICBsZXQgcmVzdWx0O1xyXG4gIGFycmF5LmZvckVhY2goKG9iaikgPT4ge1xyXG4gICAgaWYgKG9ialtvYmpLZXldID09PSB0ZXh0KSB7XHJcbiAgICAgIHJlc3VsdCA9IHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXN1bHQgPSBmYWxzZTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZnVuY3Rpb24gaGVhZGVySGFtYnVyZ2VyTWVudSgpIHtcclxuICBjb25zdCBtZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImhlYWRlciAuZmEtYmFyc1wiKTtcclxuICBjb25zdCBtYWluTGVmdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWFpbl9fbGVmdFwiKTtcclxuXHJcbiAgZnVuY3Rpb24gY2xpY2tIYW5kbGVyKCkge1xyXG4gICAgbWFpbkxlZnQuY2xhc3NMaXN0LnRvZ2dsZShcImQtbm9uZVwiKTtcclxuICB9XHJcblxyXG4gIG1lbnUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNsaWNrSGFuZGxlcik7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkQWxsKCkge1xyXG4gIGhlYWRlckhhbWJ1cmdlck1lbnUoKTtcclxuXHJcbiAgbG9hZFByb2plY3RzKCk7XHJcblxyXG4gIGFkZExpc3RlbmVycygpO1xyXG4gIGdlbmVyYXRlSW5ib3goKTtcclxuICBsb2FkSW5ib3hUYXNrcygpO1xyXG4gIC8qRklYTUU6IG9jY2hpbyBwb2kgYSBxdWFuZG8gY2kgc2Fyw6AgaWwgbG9jYWwgaG9zdCAqL1xyXG59XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IGJ1aWxkQWxsIGZyb20gXCIuL2J1aWxkLXdlYlwiO1xyXG5cclxuYnVpbGRBbGwoKTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9