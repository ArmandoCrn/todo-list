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
const tasks = document.querySelector("#tasks");
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
  tasks.innerHTML = "";
  loadProjects();
  (0,_build_mainRight__WEBPACK_IMPORTED_MODULE_1__.deleteProjectRigth)();

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
/* harmony export */   "deleteProjectRigth": () => (/* binding */ deleteProjectRigth),
/* harmony export */   "generateInbox": () => (/* binding */ generateInbox),
/* harmony export */   "generatePage": () => (/* binding */ generatePage),
/* harmony export */   "loadInboxTasks": () => (/* binding */ loadInboxTasks),
/* harmony export */   "loadProjectTasks": () => (/* binding */ loadProjectTasks),
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
  modTaskAddBtn.addEventListener("click", modTaskEditBtnProjects);
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
    newLiForProject(myTask);
  }
}

function generateInbox() {
  h2.innerText = "Inbox";

  taskAddBtn.addEventListener("click", addTaskInbox);
  modTaskAddBtn.addEventListener("click", modTaskEditBtn);
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

function deleteProjectRigth() {
  h2.innerText = "";
  removeHandlerInbox();
  removeHandlerProject();
}

function removeHandlerInbox() {
  taskAddBtn.removeEventListener("click", addTaskInbox);
  modTaskAddBtn.removeEventListener("click", modTaskEditBtn);
}

function removeHandlerProject() {
  taskAddBtn.removeEventListener("click", addTaskProject);
  modTaskAddBtn.removeEventListener("click", modTaskEditBtnProjects);
}

function loadInboxTasks() {
  tasks.innerHTML = "";

  inboxTaskList.forEach((task) => {
    newLi(task);
  });
}

function loadProjectTasks() {
  tasks.innerHTML = "";

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

function modTaskProjects() {
  const li = this.parentElement.parentElement;
  const text = li.querySelector(".name-task > p").innerText;
  const index = checkProjectTask(text);
  const obj = currentProj.getList()[index];

  modObj = obj;

  const name = obj.getName();
  const date = obj.getDate();

  const formatDate = date.split("/").reverse().join("-");

  openModTaskPopup();

  modTaskName.value = name;
  modTaskDate.value = formatDate;
}

function modTaskEditBtn() {
  const name = modTaskName.value;
  const date = modTaskDate.value;

  const formatDate = date.split("-").reverse().join("/");

  modObj.setName(name);
  modObj.setDate(formatDate);

  tasks.innerHTML = "";
  loadInboxTasks();
}

function modTaskEditBtnProjects() {
  const name = modTaskName.value;
  const date = modTaskDate.value;

  const formatDate = date.split("-").reverse().join("/");

  modObj.setName(name);
  modObj.setDate(formatDate);

  tasks.innerHTML = "";
  loadProjectTasks();
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
  iPen.addEventListener("click", modTaskProjects);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQStDO0FBVXBCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsNERBQWdCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFLG9FQUFrQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTyxpQkFBaUI7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLGdFQUFjO0FBQ25ELCtCQUErQiwwREFBWTtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLDJEQUFhO0FBQzdDLGdDQUFnQyxrRUFBb0I7QUFDcEQsZ0NBQWdDLDREQUFjO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3SitDO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsNERBQWdCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLDREQUFnQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGFBQWE7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGFBQWE7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixhQUFhO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixhQUFhO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvWWdEO0FBTXJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNlO0FBQ2Y7QUFDQTtBQUNBLEVBQUUsNkRBQVk7QUFDZDtBQUNBLEVBQUUsOERBQVk7QUFDZCxFQUFFLCtEQUFhO0FBQ2YsRUFBRSxnRUFBYztBQUNoQjtBQUNBOzs7Ozs7O1VDL0NBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNObUM7QUFDbkM7QUFDQSxzREFBUSIsInNvdXJjZXMiOlsid2VicGFjazovLzQtdG9kby1saXN0Ly4vc3JjL2J1aWxkLW1haW5MZWZ0LmpzIiwid2VicGFjazovLzQtdG9kby1saXN0Ly4vc3JjL2J1aWxkLW1haW5SaWdodC5qcyIsIndlYnBhY2s6Ly80LXRvZG8tbGlzdC8uL3NyYy9idWlsZC13ZWIuanMiLCJ3ZWJwYWNrOi8vNC10b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vNC10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovLzQtdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vNC10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly80LXRvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBkdXBsaWNhdGVJbkFycmF5IH0gZnJvbSBcIi4vYnVpbGQtd2ViXCI7XHJcbmltcG9ydCB7XHJcbiAgZ2VuZXJhdGVJbmJveCxcclxuICBnZW5lcmF0ZVBhZ2UsXHJcbiAgcmVtb3ZlSGFuZGxlckluYm94LFxyXG4gIHJlbW92ZUhhbmRsZXJQcm9qZWN0LFxyXG4gIGxvYWRJbmJveFRhc2tzLFxyXG4gIGxvYWRQcm9qZWN0VGFza3MsXHJcbiAgc2V0Q3VycmVudFByb2osXHJcbiAgZGVsZXRlUHJvamVjdFJpZ3RoLFxyXG59IGZyb20gXCIuL2J1aWxkLW1haW5SaWdodFwiO1xyXG5cclxuY29uc3QgbWFpbkxlZnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21haW5fX2xlZnRcIik7XHJcbmNvbnN0IGluYm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbmJveFwiKTtcclxuY29uc3QgdG9kYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZGF5XCIpO1xyXG5cclxuY29uc3QgcHJvamVjdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2plY3RzXCIpO1xyXG5jb25zdCB0YXNrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFza3NcIik7XHJcbmNvbnN0IGFkZFByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC1wcm9qZWN0XCIpO1xyXG5jb25zdCBwcm9qZWN0UG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC1wcm9qZWN0LXBvcHVwXCIpO1xyXG5jb25zdCBwcm9qZWN0Q2FuY2VsQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtcHJvamVjdC1wb3B1cCAuYnRuLWNhbmNlbFwiKTtcclxuY29uc3QgcHJvamVjdEFkZEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXByb2plY3QtcG9wdXAgLmJ0bi1hZGRcIik7XHJcbmNvbnN0IHByb2plY3RJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdC1uYW1lXCIpO1xyXG5cclxuLypcclxuVXNlIHRoZSBvYmoucHJvamVjdE5hbWUgYXMgYSBcImtleVwiIGZvciBsb2FkIHRoZSBwYWdlIFxyXG5vZiB0aGUgdGFza3MgbGlzdFxyXG4qL1xyXG5jb25zdCBwcm9qZWN0TGlzdCA9IFtdO1xyXG5cclxuY2xhc3MgUHJvamVjdCB7XHJcbiAgY29uc3RydWN0b3IobmFtZSkge1xyXG4gICAgdGhpcy5wcm9qZWN0TmFtZSA9IG5hbWU7XHJcbiAgICB0aGlzLnRhc2tMaXN0ID0gW107XHJcbiAgfVxyXG5cclxuICBhZGRUYXNrKHRhc2spIHtcclxuICAgIHRoaXMudGFza0xpc3QucHVzaCh0YXNrKTtcclxuICB9XHJcblxyXG4gIGdldExpc3QoKSB7XHJcbiAgICByZXR1cm4gdGhpcy50YXNrTGlzdDtcclxuICB9XHJcblxyXG4gIGdldE9iaigpIHtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gYWRkUHJvamVjdFBvcHVwKCkge1xyXG4gIGNvbnN0IHByb2plY3ROYW1lID0gcHJvamVjdElucHV0LnZhbHVlO1xyXG4gIGlmIChwcm9qZWN0TmFtZSkge1xyXG4gICAgY29uc3QgY2hlY2tEdXBsaWNhdGUgPSBkdXBsaWNhdGVJbkFycmF5KHByb2plY3ROYW1lLCBwcm9qZWN0TGlzdCwgXCJwcm9qZWN0TmFtZVwiKTtcclxuXHJcbiAgICBpZiAoY2hlY2tEdXBsaWNhdGUpIHtcclxuICAgICAgYWxlcnQoXCJQcm9qZWN0IG5hbWVzIG11c3QgYmUgZGlmZmVyZW50IVwiKTtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiBvcGVuUHJvamVjdFBvcHVwKCksIDApO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbXlQcm9qZWN0ID0gbmV3IFByb2plY3QocHJvamVjdE5hbWUpO1xyXG5cclxuICAgIHByb2plY3RMaXN0LnB1c2gobXlQcm9qZWN0KTtcclxuICAgIGNyZWF0ZU5ld0xpKG15UHJvamVjdCk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjaGVja0ZvckluZGV4KHRleHQpIHtcclxuICBjb25zdCByZXN1bHQgPSBwcm9qZWN0TGlzdC5maW5kSW5kZXgoKG9iaikgPT4gb2JqLnByb2plY3ROYW1lID09PSB0ZXh0KTtcclxuICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5mdW5jdGlvbiBkZWxldGVQcm9qZWN0KGUpIHtcclxuICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gIGNvbnN0IGxpID0gdGhpcy5wYXJlbnRFbGVtZW50O1xyXG4gIGNvbnN0IHRleHQgPSBsaS5xdWVyeVNlbGVjdG9yKFwiZGl2ID4gcFwiKS5pbm5lclRleHQ7XHJcbiAgY29uc3QgaW5kZXggPSBjaGVja0ZvckluZGV4KHRleHQpO1xyXG4gIHByb2plY3RMaXN0LnNwbGljZShpbmRleCwgMSk7XHJcblxyXG4gIHByb2plY3RzLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgdGFza3MuaW5uZXJIVE1MID0gXCJcIjtcclxuICBsb2FkUHJvamVjdHMoKTtcclxuICBkZWxldGVQcm9qZWN0UmlndGgoKTtcclxuXHJcbiAgLypGSVhNRTogb2NjaGlvIGNoZSBxdWFuZG8gY2kgc2FyYW5ubyBwb2kgaSB0YXNrXHJcbiAgYWxsJ2ludGVybm8gZGVsIHByb2dldHRvLCBkb3ZyYW5ub1xyXG4gIGVzc2VyZSBlbGltaW5hdGkgaW4gYXV0b21hdGljbyBhbmNoJ2Vzc2kqL1xyXG5cclxuICAvKlRPRE86IFF1YW5kbyBlbGltaW5pIGlsIHByb2dldHRvLCBwb2kgaWwgcmlndGggbWFpblxyXG4gIGRhbGdpIHVuIGlubmVyVGV4dCB2dW90byBvIHJvYmUgY29zw6xcclxuICBhbHRyaW1lbnRpIGZhbGxvIGFuZGFyZSBzdSBpbmJveCxvIGJvaCwgcXVlbCBjaGUgdGkgcGFyZVxyXG4gICovXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZU5ld0xpKG5hbWUpIHtcclxuICBjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcclxuICBsaS5jbGFzc0xpc3QuYWRkKFwicHJvamVjdFwiKTtcclxuICBsaS5pbm5lckhUTUwgPSBgXHJcbiAgPGRpdj5cclxuICA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLWxpc3RcIj48L2k+XHJcbiAgPHA+JHtuYW1lLnByb2plY3ROYW1lfTwvcD5cclxuICA8L2Rpdj5cclxuICBgO1xyXG5cclxuICBjb25zdCBpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XHJcbiAgaS5jbGFzc0xpc3QuYWRkKFwiZmEtc29saWRcIiwgXCJmYS10cmFzaC1jYW5cIik7XHJcbiAgaS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZGVsZXRlUHJvamVjdCk7XHJcbiAgbGkuYXBwZW5kQ2hpbGQoaSk7XHJcblxyXG4gIGxpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBsaUNsaWNrKTtcclxuICBsaS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gc2V0Q3VycmVudFByb2oobmFtZSkpO1xyXG4gIGxpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBnZW5lcmF0ZVBhZ2UpO1xyXG4gIHByb2plY3RzLmFwcGVuZENoaWxkKGxpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gbGlDbGljaygpIHtcclxuICBpZiAoIXRoaXMuY2xhc3NOYW1lLmluY2x1ZGVzKFwiYWN0aXZlXCIpKSB7XHJcbiAgICB0aGlzLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgfVxyXG5cclxuICBjb25zdCBsaXN0T2ZMaSA9IG1haW5MZWZ0LnF1ZXJ5U2VsZWN0b3JBbGwoXCJsaVwiKTtcclxuICBsaXN0T2ZMaS5mb3JFYWNoKChlbCkgPT4ge1xyXG4gICAgaWYgKGVsICE9PSB0aGlzKSB7XHJcbiAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBsb2FkUHJvamVjdHMoKSB7XHJcbiAgcHJvamVjdExpc3QuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xyXG4gICAgY3JlYXRlTmV3TGkocHJvamVjdCk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG9wZW5Qcm9qZWN0UG9wdXAoKSB7XHJcbiAgcHJvamVjdFBvcHVwLmNsYXNzTGlzdC5yZW1vdmUoXCJkLW5vbmVcIik7XHJcbiAgYWRkUHJvamVjdC5jbGFzc0xpc3QuYWRkKFwiZC1ub25lXCIpO1xyXG4gIHNldFRpbWVvdXQoKCkgPT4gcHJvamVjdElucHV0LmZvY3VzKCksIDEwMCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRvZ2dsZVByb2plY3RQb3B1cChlKSB7XHJcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIHByb2plY3RQb3B1cC5yZXNldCgpO1xyXG4gIHByb2plY3RQb3B1cC5jbGFzc0xpc3QuYWRkKFwiZC1ub25lXCIpO1xyXG4gIGFkZFByb2plY3QuY2xhc3NMaXN0LnJlbW92ZShcImQtbm9uZVwiKTtcclxufVxyXG5cclxuaW5ib3guYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGxpQ2xpY2spO1xyXG5pbmJveC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZ2VuZXJhdGVJbmJveCk7XHJcbmluYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCByZW1vdmVIYW5kbGVyUHJvamVjdCk7XHJcbmluYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBsb2FkSW5ib3hUYXNrcyk7XHJcblxyXG50b2RheS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgbGlDbGljayk7XHJcblxyXG5hZGRQcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBvcGVuUHJvamVjdFBvcHVwKTtcclxucHJvamVjdEFkZEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYWRkUHJvamVjdFBvcHVwKTtcclxucHJvamVjdENhbmNlbEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdG9nZ2xlUHJvamVjdFBvcHVwKTtcclxucHJvamVjdFBvcHVwLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgdG9nZ2xlUHJvamVjdFBvcHVwKTtcclxuIiwiaW1wb3J0IHsgZHVwbGljYXRlSW5BcnJheSB9IGZyb20gXCIuL2J1aWxkLXdlYlwiO1xyXG5cclxuY29uc3QgdGFza3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2tzXCIpO1xyXG5cclxuY29uc3QgaDIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21haW5fX3JpZ2h0ID4gaDJcIik7XHJcblxyXG5jb25zdCBhZGRUYXNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtdGFza1wiKTtcclxuY29uc3QgdGFza1BvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtdGFzay1wb3B1cFwiKTtcclxuY29uc3QgbW9kVGFza1BvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tb2QtdGFzay1wb3B1cFwiKTtcclxuY29uc3QgdGFza0NhbmNlbEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXRhc2stcG9wdXAgLmJ0bi1jYW5jZWxcIik7XHJcbmNvbnN0IG1vZFRhc2tDYW5jZWxCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1vZC10YXNrLXBvcHVwIC5idG4tY2FuY2VsXCIpO1xyXG5jb25zdCB0YXNrQWRkQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtdGFzay1wb3B1cCAuYnRuLWFkZFwiKTtcclxuY29uc3QgbW9kVGFza0FkZEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubW9kLXRhc2stcG9wdXAgLmJ0bi1hZGRcIik7XHJcbmNvbnN0IHRhc2tOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrLW5hbWVcIik7XHJcbmNvbnN0IG1vZFRhc2tOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrLW5hbWUtbW9kXCIpO1xyXG5jb25zdCB0YXNrRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFzay1kYXRlXCIpO1xyXG5jb25zdCBtb2RUYXNrRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFzay1kYXRlLW1vZFwiKTtcclxuXHJcbmNvbnN0IGluYm94VGFza0xpc3QgPSBbXTtcclxubGV0IG1vZE9iajtcclxubGV0IGN1cnJlbnRQcm9qO1xyXG5cclxuY2xhc3MgVGFzayB7XHJcbiAgY29uc3RydWN0b3IobmFtZSwgZGF0ZSwgc3RhdHVzKSB7XHJcbiAgICB0aGlzLnRhc2tOYW1lID0gbmFtZTtcclxuICAgIHRoaXMudGFza0RhdGUgPSBkYXRlO1xyXG4gICAgdGhpcy5jaGVja2VkID0gc3RhdHVzO1xyXG4gIH1cclxuXHJcbiAgc2V0TmFtZShuYW1lKSB7XHJcbiAgICB0aGlzLnRhc2tOYW1lID0gbmFtZTtcclxuICB9XHJcblxyXG4gIGdldE5hbWUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy50YXNrTmFtZTtcclxuICB9XHJcblxyXG4gIHNldERhdGUoZGF0ZSkge1xyXG4gICAgdGhpcy50YXNrRGF0ZSA9IGRhdGU7XHJcbiAgfVxyXG5cclxuICBnZXREYXRlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMudGFza0RhdGU7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0Q3VycmVudFByb2oocHJvaikge1xyXG4gIGN1cnJlbnRQcm9qID0gcHJvajtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlUGFnZSgpIHtcclxuICBoMi5pbm5lclRleHQgPSBjdXJyZW50UHJvai5wcm9qZWN0TmFtZTtcclxuXHJcbiAgdGFza3MuaW5uZXJIVE1MID0gXCJcIjtcclxuICBsb2FkUHJvamVjdFRhc2tzKCk7XHJcblxyXG4gIHJlbW92ZUhhbmRsZXJJbmJveCgpO1xyXG4gIHJlbW92ZUhhbmRsZXJQcm9qZWN0KCk7XHJcbiAgdGFza0FkZEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYWRkVGFza1Byb2plY3QpO1xyXG4gIG1vZFRhc2tBZGRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG1vZFRhc2tFZGl0QnRuUHJvamVjdHMpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRUYXNrUHJvamVjdCgpIHtcclxuICBjb25zdCBuYW1lID0gdGFza05hbWUudmFsdWU7XHJcbiAgY29uc3QgZGF0ZSA9IHRhc2tEYXRlLnZhbHVlO1xyXG4gIGNvbnN0IHByb2ogPSBjdXJyZW50UHJvajtcclxuICBjb25zdCBhcnJheSA9IHByb2ouZ2V0TGlzdCgpO1xyXG5cclxuICBpZiAobmFtZSAmJiBkYXRlKSB7XHJcbiAgICBjb25zdCBjaGVja0R1cGxpY2F0ZSA9IGR1cGxpY2F0ZUluQXJyYXkobmFtZSwgYXJyYXksIFwidGFza05hbWVcIik7XHJcblxyXG4gICAgaWYgKGNoZWNrRHVwbGljYXRlKSB7XHJcbiAgICAgIGFsZXJ0KFwiVGFzayBuYW1lcyBtdXN0IGJlIGRpZmZlcmVudCFcIik7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gb3BlblRhc2tQb3B1cCgpLCAwKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGZvcm1hdERhdGUgPSBkYXRlLnNwbGl0KFwiLVwiKS5yZXZlcnNlKCkuam9pbihcIi9cIik7XHJcblxyXG4gICAgY29uc3QgbXlUYXNrID0gbmV3IFRhc2sobmFtZSwgZm9ybWF0RGF0ZSwgZmFsc2UpO1xyXG5cclxuICAgIHByb2ouYWRkVGFzayhteVRhc2spO1xyXG4gICAgbmV3TGlGb3JQcm9qZWN0KG15VGFzayk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVJbmJveCgpIHtcclxuICBoMi5pbm5lclRleHQgPSBcIkluYm94XCI7XHJcblxyXG4gIHRhc2tBZGRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFkZFRhc2tJbmJveCk7XHJcbiAgbW9kVGFza0FkZEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgbW9kVGFza0VkaXRCdG4pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRUYXNrSW5ib3goKSB7XHJcbiAgY29uc3QgbmFtZSA9IHRhc2tOYW1lLnZhbHVlO1xyXG4gIGNvbnN0IGRhdGUgPSB0YXNrRGF0ZS52YWx1ZTtcclxuXHJcbiAgaWYgKG5hbWUgJiYgZGF0ZSkge1xyXG4gICAgY29uc3QgY2hlY2tEdXBsaWNhdGUgPSBkdXBsaWNhdGVJbkFycmF5KG5hbWUsIGluYm94VGFza0xpc3QsIFwidGFza05hbWVcIik7XHJcblxyXG4gICAgaWYgKGNoZWNrRHVwbGljYXRlKSB7XHJcbiAgICAgIGFsZXJ0KFwiVGFzayBuYW1lcyBtdXN0IGJlIGRpZmZlcmVudCFcIik7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gb3BlblRhc2tQb3B1cCgpLCAwKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGZvcm1hdERhdGUgPSBkYXRlLnNwbGl0KFwiLVwiKS5yZXZlcnNlKCkuam9pbihcIi9cIik7XHJcblxyXG4gICAgY29uc3QgbXlUYXNrID0gbmV3IFRhc2sobmFtZSwgZm9ybWF0RGF0ZSwgZmFsc2UpO1xyXG5cclxuICAgIGluYm94VGFza0xpc3QucHVzaChteVRhc2spO1xyXG4gICAgbmV3TGkobXlUYXNrKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkZWxldGVQcm9qZWN0UmlndGgoKSB7XHJcbiAgaDIuaW5uZXJUZXh0ID0gXCJcIjtcclxuICByZW1vdmVIYW5kbGVySW5ib3goKTtcclxuICByZW1vdmVIYW5kbGVyUHJvamVjdCgpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlSGFuZGxlckluYm94KCkge1xyXG4gIHRhc2tBZGRCdG4ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFkZFRhc2tJbmJveCk7XHJcbiAgbW9kVGFza0FkZEJ0bi5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgbW9kVGFza0VkaXRCdG4pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlSGFuZGxlclByb2plY3QoKSB7XHJcbiAgdGFza0FkZEJ0bi5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYWRkVGFza1Byb2plY3QpO1xyXG4gIG1vZFRhc2tBZGRCdG4ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG1vZFRhc2tFZGl0QnRuUHJvamVjdHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbG9hZEluYm94VGFza3MoKSB7XHJcbiAgdGFza3MuaW5uZXJIVE1MID0gXCJcIjtcclxuXHJcbiAgaW5ib3hUYXNrTGlzdC5mb3JFYWNoKCh0YXNrKSA9PiB7XHJcbiAgICBuZXdMaSh0YXNrKTtcclxuICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRQcm9qZWN0VGFza3MoKSB7XHJcbiAgdGFza3MuaW5uZXJIVE1MID0gXCJcIjtcclxuXHJcbiAgY3VycmVudFByb2ouZ2V0TGlzdCgpLmZvckVhY2goKHRhc2spID0+IHtcclxuICAgIG5ld0xpRm9yUHJvamVjdCh0YXNrKTtcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2hlY2tJbmRleFRhc2sodGV4dCkge1xyXG4gIGNvbnN0IHJlc3VsdCA9IGluYm94VGFza0xpc3QuZmluZEluZGV4KChvYmopID0+IG9iai50YXNrTmFtZSA9PT0gdGV4dCk7XHJcbiAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZnVuY3Rpb24gY2hlY2tQcm9qZWN0VGFzayh0ZXh0KSB7XHJcbiAgY29uc3QgcmVzdWx0ID0gY3VycmVudFByb2ouZ2V0TGlzdCgpLmZpbmRJbmRleCgob2JqKSA9PiBvYmoudGFza05hbWUgPT09IHRleHQpO1xyXG4gIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNoZWNrTGkob2JqLCBpY29uKSB7XHJcbiAgaWYgKG9iai5jaGVja2VkKSB7XHJcbiAgICBpY29uLmNsYXNzTGlzdC5yZW1vdmUoXCJmYS1zcXVhcmVcIik7XHJcbiAgICBpY29uLmNsYXNzTGlzdC5hZGQoXCJmYS1zcXVhcmUtY2hlY2tcIik7XHJcbiAgfSBlbHNlIHtcclxuICAgIGljb24uY2xhc3NMaXN0LnJlbW92ZShcImZhLXNxdWFyZS1jaGVja1wiKTtcclxuICAgIGljb24uY2xhc3NMaXN0LmFkZChcImZhLXNxdWFyZVwiKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNoYW5nZVRhc2tTdGF0dXMoKSB7XHJcbiAgY29uc3QgdGFzayA9IHRoaXMubmV4dFNpYmxpbmcuaW5uZXJUZXh0O1xyXG4gIGNvbnN0IGluZGV4ID0gY2hlY2tJbmRleFRhc2sodGFzayk7XHJcbiAgY29uc3Qgb2JqID0gaW5ib3hUYXNrTGlzdFtpbmRleF07XHJcbiAgb2JqLmNoZWNrZWQgPSAhb2JqLmNoZWNrZWQ7XHJcblxyXG4gIGNoZWNrTGkob2JqLCB0aGlzKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2hhbmdlVGFza1Byb2plY3RTdGF0dXMoKSB7XHJcbiAgY29uc3QgdGFzayA9IHRoaXMubmV4dFNpYmxpbmcuaW5uZXJUZXh0O1xyXG4gIGNvbnN0IGluZGV4ID0gY2hlY2tQcm9qZWN0VGFzayh0YXNrKTtcclxuICBjb25zdCBvYmogPSBjdXJyZW50UHJvai5nZXRMaXN0KClbaW5kZXhdO1xyXG4gIG9iai5jaGVja2VkID0gIW9iai5jaGVja2VkO1xyXG5cclxuICBjaGVja0xpKG9iaiwgdGhpcyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRlbGV0ZVRhc2soKSB7XHJcbiAgY29uc3QgbGkgPSB0aGlzLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcclxuICBjb25zdCB0ZXh0ID0gbGkucXVlcnlTZWxlY3RvcihcIi5uYW1lLXRhc2sgPiBwXCIpLmlubmVyVGV4dDtcclxuICBjb25zdCBpbmRleCA9IGNoZWNrSW5kZXhUYXNrKHRleHQpO1xyXG4gIGluYm94VGFza0xpc3Quc3BsaWNlKGluZGV4LCAxKTtcclxuXHJcbiAgdGFza3MuaW5uZXJIVE1MID0gXCJcIjtcclxuICBsb2FkSW5ib3hUYXNrcygpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkZWxldGVUYXNrUHJvamVjdCgpIHtcclxuICBjb25zdCBsaSA9IHRoaXMucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xyXG4gIGNvbnN0IHRleHQgPSBsaS5xdWVyeVNlbGVjdG9yKFwiLm5hbWUtdGFzayA+IHBcIikuaW5uZXJUZXh0O1xyXG4gIGNvbnN0IGluZGV4ID0gY2hlY2tQcm9qZWN0VGFzayh0ZXh0KTtcclxuICBjdXJyZW50UHJvai5nZXRMaXN0KCkuc3BsaWNlKGluZGV4LCAxKTtcclxuXHJcbiAgdGFza3MuaW5uZXJIVE1MID0gXCJcIjtcclxuICBsb2FkUHJvamVjdFRhc2tzKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1vZFRhc2soKSB7XHJcbiAgY29uc3QgbGkgPSB0aGlzLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcclxuICBjb25zdCB0ZXh0ID0gbGkucXVlcnlTZWxlY3RvcihcIi5uYW1lLXRhc2sgPiBwXCIpLmlubmVyVGV4dDtcclxuICBjb25zdCBpbmRleCA9IGNoZWNrSW5kZXhUYXNrKHRleHQpO1xyXG4gIGNvbnN0IG9iaiA9IGluYm94VGFza0xpc3RbaW5kZXhdO1xyXG5cclxuICBtb2RPYmogPSBvYmo7XHJcblxyXG4gIGNvbnN0IG5hbWUgPSBvYmouZ2V0TmFtZSgpO1xyXG4gIGNvbnN0IGRhdGUgPSBvYmouZ2V0RGF0ZSgpO1xyXG5cclxuICBjb25zdCBmb3JtYXREYXRlID0gZGF0ZS5zcGxpdChcIi9cIikucmV2ZXJzZSgpLmpvaW4oXCItXCIpO1xyXG5cclxuICBvcGVuTW9kVGFza1BvcHVwKCk7XHJcblxyXG4gIG1vZFRhc2tOYW1lLnZhbHVlID0gbmFtZTtcclxuICBtb2RUYXNrRGF0ZS52YWx1ZSA9IGZvcm1hdERhdGU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1vZFRhc2tQcm9qZWN0cygpIHtcclxuICBjb25zdCBsaSA9IHRoaXMucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xyXG4gIGNvbnN0IHRleHQgPSBsaS5xdWVyeVNlbGVjdG9yKFwiLm5hbWUtdGFzayA+IHBcIikuaW5uZXJUZXh0O1xyXG4gIGNvbnN0IGluZGV4ID0gY2hlY2tQcm9qZWN0VGFzayh0ZXh0KTtcclxuICBjb25zdCBvYmogPSBjdXJyZW50UHJvai5nZXRMaXN0KClbaW5kZXhdO1xyXG5cclxuICBtb2RPYmogPSBvYmo7XHJcblxyXG4gIGNvbnN0IG5hbWUgPSBvYmouZ2V0TmFtZSgpO1xyXG4gIGNvbnN0IGRhdGUgPSBvYmouZ2V0RGF0ZSgpO1xyXG5cclxuICBjb25zdCBmb3JtYXREYXRlID0gZGF0ZS5zcGxpdChcIi9cIikucmV2ZXJzZSgpLmpvaW4oXCItXCIpO1xyXG5cclxuICBvcGVuTW9kVGFza1BvcHVwKCk7XHJcblxyXG4gIG1vZFRhc2tOYW1lLnZhbHVlID0gbmFtZTtcclxuICBtb2RUYXNrRGF0ZS52YWx1ZSA9IGZvcm1hdERhdGU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1vZFRhc2tFZGl0QnRuKCkge1xyXG4gIGNvbnN0IG5hbWUgPSBtb2RUYXNrTmFtZS52YWx1ZTtcclxuICBjb25zdCBkYXRlID0gbW9kVGFza0RhdGUudmFsdWU7XHJcblxyXG4gIGNvbnN0IGZvcm1hdERhdGUgPSBkYXRlLnNwbGl0KFwiLVwiKS5yZXZlcnNlKCkuam9pbihcIi9cIik7XHJcblxyXG4gIG1vZE9iai5zZXROYW1lKG5hbWUpO1xyXG4gIG1vZE9iai5zZXREYXRlKGZvcm1hdERhdGUpO1xyXG5cclxuICB0YXNrcy5pbm5lckhUTUwgPSBcIlwiO1xyXG4gIGxvYWRJbmJveFRhc2tzKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1vZFRhc2tFZGl0QnRuUHJvamVjdHMoKSB7XHJcbiAgY29uc3QgbmFtZSA9IG1vZFRhc2tOYW1lLnZhbHVlO1xyXG4gIGNvbnN0IGRhdGUgPSBtb2RUYXNrRGF0ZS52YWx1ZTtcclxuXHJcbiAgY29uc3QgZm9ybWF0RGF0ZSA9IGRhdGUuc3BsaXQoXCItXCIpLnJldmVyc2UoKS5qb2luKFwiL1wiKTtcclxuXHJcbiAgbW9kT2JqLnNldE5hbWUobmFtZSk7XHJcbiAgbW9kT2JqLnNldERhdGUoZm9ybWF0RGF0ZSk7XHJcblxyXG4gIHRhc2tzLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgbG9hZFByb2plY3RUYXNrcygpO1xyXG59XHJcblxyXG4vL1RPRE86IG9jY2hpbyBjaGUgc2kgcG90cmViYmVybyBhdmVyZSBwcm9ibGVtaSBjb2wgbG9jYWxzdG9yYWdlXHJcbi8vcGVyIGwnYXV0byBjaGVja2VyIGRhdG8gY2hlIGxpIHNvbiB0dXR0ZSBzdHJpbmdoZSxcclxuLy9lIG5vbiBzbyBjb21lIHNpIHJpc29sdmUgaWwgZmF0dG8gY2hlIHNpYSB1biBib29sZWFuXHJcbmZ1bmN0aW9uIG5ld0xpKG9iaikge1xyXG4gIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xyXG4gIGxpLmNsYXNzTGlzdC5hZGQoXCJ0YXNrXCIpO1xyXG5cclxuICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gIGRpdi5jbGFzc0xpc3QuYWRkKFwibmFtZS10YXNrXCIpO1xyXG5cclxuICBjb25zdCBpU3F1YXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XHJcbiAgaVNxdWFyZS5jbGFzc0xpc3QuYWRkKFwiZmEtc29saWRcIik7XHJcblxyXG4gIC8vYXV0by1jaGVja2VyIHdoZW4gd2UgcmVjcmFpdGUgdGhlIGxpIGZyb20gTG9jYWxTdG9yYWdlXHJcbiAgaWYgKG9iai5jaGVja2VkKSB7XHJcbiAgICBpU3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJmYS1zcXVhcmUtY2hlY2tcIik7XHJcbiAgfSBlbHNlIHtcclxuICAgIGlTcXVhcmUuY2xhc3NMaXN0LmFkZChcImZhLXNxdWFyZVwiKTtcclxuICB9XHJcblxyXG4gIGlTcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNoYW5nZVRhc2tTdGF0dXMpO1xyXG5cclxuICBjb25zdCBwTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xyXG4gIHBOYW1lLmlubmVyVGV4dCA9IGAke29iai50YXNrTmFtZX1gO1xyXG5cclxuICBkaXYuYXBwZW5kQ2hpbGQoaVNxdWFyZSk7XHJcbiAgZGl2LmFwcGVuZENoaWxkKHBOYW1lKTtcclxuICBsaS5hcHBlbmRDaGlsZChkaXYpO1xyXG5cclxuICBjb25zdCBkZXRhaWxzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICBkZXRhaWxzLmNsYXNzTGlzdC5hZGQoXCJkZXRhaWxzXCIpO1xyXG5cclxuICBjb25zdCBwRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xyXG4gIHBEYXRlLmlubmVyVGV4dCA9IGAke29iai50YXNrRGF0ZX1gO1xyXG5cclxuICBjb25zdCBpUGVuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XHJcbiAgaVBlbi5jbGFzc0xpc3QuYWRkKFwiZmEtc29saWRcIiwgXCJmYS1wZW4tdG8tc3F1YXJlXCIpO1xyXG4gIGlQZW4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG1vZFRhc2spO1xyXG5cclxuICBjb25zdCBpVHJhc2ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcclxuICBpVHJhc2guY2xhc3NMaXN0LmFkZChcImZhLXNvbGlkXCIsIFwiZmEtdHJhc2gtY2FuXCIpO1xyXG4gIGlUcmFzaC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZGVsZXRlVGFzayk7XHJcblxyXG4gIGRldGFpbHMuYXBwZW5kQ2hpbGQocERhdGUpO1xyXG4gIGRldGFpbHMuYXBwZW5kQ2hpbGQoaVBlbik7XHJcbiAgZGV0YWlscy5hcHBlbmRDaGlsZChpVHJhc2gpO1xyXG4gIGxpLmFwcGVuZENoaWxkKGRldGFpbHMpO1xyXG5cclxuICB0YXNrcy5hcHBlbmRDaGlsZChsaSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG5ld0xpRm9yUHJvamVjdChvYmopIHtcclxuICBjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcclxuICBsaS5jbGFzc0xpc3QuYWRkKFwidGFza1wiKTtcclxuXHJcbiAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICBkaXYuY2xhc3NMaXN0LmFkZChcIm5hbWUtdGFza1wiKTtcclxuXHJcbiAgY29uc3QgaVNxdWFyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xyXG4gIGlTcXVhcmUuY2xhc3NMaXN0LmFkZChcImZhLXNvbGlkXCIpO1xyXG5cclxuICAvL2F1dG8tY2hlY2tlciB3aGVuIHdlIHJlY3JhaXRlIHRoZSBsaSBmcm9tIExvY2FsU3RvcmFnZVxyXG4gIGlmIChvYmouY2hlY2tlZCkge1xyXG4gICAgaVNxdWFyZS5jbGFzc0xpc3QuYWRkKFwiZmEtc3F1YXJlLWNoZWNrXCIpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBpU3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJmYS1zcXVhcmVcIik7XHJcbiAgfVxyXG5cclxuICBpU3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjaGFuZ2VUYXNrUHJvamVjdFN0YXR1cyk7XHJcblxyXG4gIGNvbnN0IHBOYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XHJcbiAgcE5hbWUuaW5uZXJUZXh0ID0gYCR7b2JqLnRhc2tOYW1lfWA7XHJcblxyXG4gIGRpdi5hcHBlbmRDaGlsZChpU3F1YXJlKTtcclxuICBkaXYuYXBwZW5kQ2hpbGQocE5hbWUpO1xyXG4gIGxpLmFwcGVuZENoaWxkKGRpdik7XHJcblxyXG4gIGNvbnN0IGRldGFpbHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gIGRldGFpbHMuY2xhc3NMaXN0LmFkZChcImRldGFpbHNcIik7XHJcblxyXG4gIGNvbnN0IHBEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XHJcbiAgcERhdGUuaW5uZXJUZXh0ID0gYCR7b2JqLnRhc2tEYXRlfWA7XHJcblxyXG4gIGNvbnN0IGlQZW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcclxuICBpUGVuLmNsYXNzTGlzdC5hZGQoXCJmYS1zb2xpZFwiLCBcImZhLXBlbi10by1zcXVhcmVcIik7XHJcbiAgaVBlbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgbW9kVGFza1Byb2plY3RzKTtcclxuXHJcbiAgY29uc3QgaVRyYXNoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XHJcbiAgaVRyYXNoLmNsYXNzTGlzdC5hZGQoXCJmYS1zb2xpZFwiLCBcImZhLXRyYXNoLWNhblwiKTtcclxuICBpVHJhc2guYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGRlbGV0ZVRhc2tQcm9qZWN0KTtcclxuXHJcbiAgZGV0YWlscy5hcHBlbmRDaGlsZChwRGF0ZSk7XHJcbiAgZGV0YWlscy5hcHBlbmRDaGlsZChpUGVuKTtcclxuICBkZXRhaWxzLmFwcGVuZENoaWxkKGlUcmFzaCk7XHJcbiAgbGkuYXBwZW5kQ2hpbGQoZGV0YWlscyk7XHJcblxyXG4gIHRhc2tzLmFwcGVuZENoaWxkKGxpKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZExpc3RlbmVycygpIHtcclxuICBhZGRUYXNrLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBvcGVuVGFza1BvcHVwKTtcclxuICB0YXNrQ2FuY2VsQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0b2dnbGVUYXNrUG9wdXApO1xyXG4gIHRhc2tQb3B1cC5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIHRvZ2dsZVRhc2tQb3B1cCk7XHJcblxyXG4gIG1vZFRhc2tDYW5jZWxCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRvZ2dsZU1vZFRhc2tQb3B1cCk7XHJcbiAgbW9kVGFza1BvcHVwLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgdG9nZ2xlTW9kVGFza1BvcHVwKTtcclxufVxyXG5cclxuZnVuY3Rpb24gb3BlblRhc2tQb3B1cCgpIHtcclxuICB0YXNrUG9wdXAuY2xhc3NMaXN0LnJlbW92ZShcImQtbm9uZVwiKTtcclxuICBhZGRUYXNrLmNsYXNzTGlzdC5hZGQoXCJkLW5vbmVcIik7XHJcbiAgc2V0VGltZW91dCgoKSA9PiB0YXNrTmFtZS5mb2N1cygpLCAxMDApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBvcGVuTW9kVGFza1BvcHVwKCkge1xyXG4gIG1vZFRhc2tQb3B1cC5jbGFzc0xpc3QucmVtb3ZlKFwiZC1ub25lXCIpO1xyXG4gIHNldFRpbWVvdXQoKCkgPT4gbW9kVGFza05hbWUuZm9jdXMoKSwgMTAwKTtcclxufVxyXG5cclxuZnVuY3Rpb24gdG9nZ2xlVGFza1BvcHVwKGUpIHtcclxuICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgdGFza1BvcHVwLnJlc2V0KCk7XHJcbiAgdGFza1BvcHVwLmNsYXNzTGlzdC5hZGQoXCJkLW5vbmVcIik7XHJcbiAgYWRkVGFzay5jbGFzc0xpc3QucmVtb3ZlKFwiZC1ub25lXCIpO1xyXG59XHJcblxyXG5mdW5jdGlvbiB0b2dnbGVNb2RUYXNrUG9wdXAoZSkge1xyXG4gIGUucHJldmVudERlZmF1bHQoKTtcclxuICBtb2RUYXNrUG9wdXAucmVzZXQoKTtcclxuICBtb2RUYXNrUG9wdXAuY2xhc3NMaXN0LmFkZChcImQtbm9uZVwiKTtcclxufVxyXG4iLCJpbXBvcnQgeyBsb2FkUHJvamVjdHMgfSBmcm9tIFwiLi9idWlsZC1tYWluTGVmdFwiO1xyXG5pbXBvcnQge1xyXG4gIGdlbmVyYXRlSW5ib3gsXHJcbiAgZ2VuZXJhdGVQYWdlLFxyXG4gIGFkZExpc3RlbmVycyxcclxuICBsb2FkSW5ib3hUYXNrcyxcclxufSBmcm9tIFwiLi9idWlsZC1tYWluUmlnaHRcIjtcclxuXHJcbi8qXHJcbkZJWE1FOiBxdWkgc2NyaXZpYW1vIGxlIGNvc2UgZ2VuZXJhbGkgY2hlIG5vbiBcclxudmFubm8gbmVpIG1vZHVsaSBzcGVjaWZpY2ksIGNvbWUgcGVyIGVzZW1waW8gcXVlc3RhIHNvdHRvXHJcbnBlciBlc2VtcGlvIGRvYmJpYW1vIGFnZ2l1bmdlcmUgaWwgY29zbyBwZXIgbCdoYW1idXJnZXIgbWVudVxyXG4qL1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGR1cGxpY2F0ZUluQXJyYXkodGV4dCwgYXJyYXksIG9iaktleSkge1xyXG4gIGxldCByZXN1bHQ7XHJcbiAgYXJyYXkuZm9yRWFjaCgob2JqKSA9PiB7XHJcbiAgICBpZiAob2JqW29iaktleV0gPT09IHRleHQpIHtcclxuICAgICAgcmVzdWx0ID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJlc3VsdCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5mdW5jdGlvbiBoZWFkZXJIYW1idXJnZXJNZW51KCkge1xyXG4gIGNvbnN0IG1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaGVhZGVyIC5mYS1iYXJzXCIpO1xyXG4gIGNvbnN0IG1haW5MZWZ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtYWluX19sZWZ0XCIpO1xyXG5cclxuICBmdW5jdGlvbiBjbGlja0hhbmRsZXIoKSB7XHJcbiAgICBtYWluTGVmdC5jbGFzc0xpc3QudG9nZ2xlKFwiZC1ub25lXCIpO1xyXG4gIH1cclxuXHJcbiAgbWVudS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2xpY2tIYW5kbGVyKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYnVpbGRBbGwoKSB7XHJcbiAgaGVhZGVySGFtYnVyZ2VyTWVudSgpO1xyXG5cclxuICBsb2FkUHJvamVjdHMoKTtcclxuXHJcbiAgYWRkTGlzdGVuZXJzKCk7XHJcbiAgZ2VuZXJhdGVJbmJveCgpO1xyXG4gIGxvYWRJbmJveFRhc2tzKCk7XHJcbiAgLypGSVhNRTogb2NjaGlvIHBvaSBhIHF1YW5kbyBjaSBzYXLDoCBpbCBsb2NhbCBob3N0ICovXHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgYnVpbGRBbGwgZnJvbSBcIi4vYnVpbGQtd2ViXCI7XHJcblxyXG5idWlsZEFsbCgpO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=