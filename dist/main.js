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
  li.addEventListener("click", () => (0,_build_mainRight__WEBPACK_IMPORTED_MODULE_1__.generatePage)(name));
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
/* harmony export */   "removeHandlerProject": () => (/* binding */ removeHandlerProject)
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

function generatePage(project) {
  h2.innerText = project.projectName;

  currentProj = project;

  tasks.innerHTML = "";
  loadProjectTasks();

  removeHandlerInbox();
  removeHandlerProject();
  taskAddBtn.addEventListener("click", () => addTaskProject(project));
  // modTaskAddBtn.addEventListener("click", () => modTaskEditBtn(modObj));
}

function addTaskProject(proj) {
  const name = taskName.value;
  const date = taskDate.value;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQStDO0FBT3BCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLDREQUFnQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPLGlCQUFpQjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsOERBQVk7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQywyREFBYTtBQUM3QyxnQ0FBZ0Msa0VBQW9CO0FBQ3BELGdDQUFnQyw0REFBYztBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwSitDO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLDREQUFnQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLDREQUFnQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsYUFBYTtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsYUFBYTtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGFBQWE7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGFBQWE7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25XZ0Q7QUFNckI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ2U7QUFDZjtBQUNBO0FBQ0EsRUFBRSw2REFBWTtBQUNkO0FBQ0EsRUFBRSw4REFBWTtBQUNkLEVBQUUsK0RBQWE7QUFDZixFQUFFLGdFQUFjO0FBQ2hCO0FBQ0E7Ozs7Ozs7VUMvQ0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05tQztBQUNuQztBQUNBLHNEQUFRIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vNC10b2RvLWxpc3QvLi9zcmMvYnVpbGQtbWFpbkxlZnQuanMiLCJ3ZWJwYWNrOi8vNC10b2RvLWxpc3QvLi9zcmMvYnVpbGQtbWFpblJpZ2h0LmpzIiwid2VicGFjazovLzQtdG9kby1saXN0Ly4vc3JjL2J1aWxkLXdlYi5qcyIsIndlYnBhY2s6Ly80LXRvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly80LXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vNC10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly80LXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLzQtdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGR1cGxpY2F0ZUluQXJyYXkgfSBmcm9tIFwiLi9idWlsZC13ZWJcIjtcclxuaW1wb3J0IHtcclxuICBnZW5lcmF0ZUluYm94LFxyXG4gIGdlbmVyYXRlUGFnZSxcclxuICByZW1vdmVIYW5kbGVySW5ib3gsXHJcbiAgcmVtb3ZlSGFuZGxlclByb2plY3QsXHJcbiAgbG9hZEluYm94VGFza3MsXHJcbn0gZnJvbSBcIi4vYnVpbGQtbWFpblJpZ2h0XCI7XHJcblxyXG5jb25zdCBtYWluTGVmdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWFpbl9fbGVmdFwiKTtcclxuY29uc3QgaW5ib3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmluYm94XCIpO1xyXG5jb25zdCB0b2RheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kYXlcIik7XHJcblxyXG5jb25zdCBwcm9qZWN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdHNcIik7XHJcbmNvbnN0IGFkZFByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC1wcm9qZWN0XCIpO1xyXG5jb25zdCBwcm9qZWN0UG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC1wcm9qZWN0LXBvcHVwXCIpO1xyXG5jb25zdCBwcm9qZWN0Q2FuY2VsQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtcHJvamVjdC1wb3B1cCAuYnRuLWNhbmNlbFwiKTtcclxuY29uc3QgcHJvamVjdEFkZEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXByb2plY3QtcG9wdXAgLmJ0bi1hZGRcIik7XHJcbmNvbnN0IHByb2plY3RJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdC1uYW1lXCIpO1xyXG5cclxuLypcclxuVXNlIHRoZSBvYmoucHJvamVjdE5hbWUgYXMgYSBcImtleVwiIGZvciBsb2FkIHRoZSBwYWdlIFxyXG5vZiB0aGUgdGFza3MgbGlzdFxyXG4qL1xyXG5jb25zdCBwcm9qZWN0TGlzdCA9IFtdO1xyXG5cclxuY2xhc3MgUHJvamVjdCB7XHJcbiAgY29uc3RydWN0b3IobmFtZSkge1xyXG4gICAgdGhpcy5wcm9qZWN0TmFtZSA9IG5hbWU7XHJcbiAgICB0aGlzLnRhc2tMaXN0ID0gW107XHJcbiAgfVxyXG5cclxuICBhZGRUYXNrKHRhc2spIHtcclxuICAgIHRoaXMudGFza0xpc3QucHVzaCh0YXNrKTtcclxuICB9XHJcblxyXG4gIGdldExpc3QoKSB7XHJcbiAgICByZXR1cm4gdGhpcy50YXNrTGlzdDtcclxuICB9XHJcblxyXG4gIGdldE9iaigpIHtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gYWRkUHJvamVjdFBvcHVwKCkge1xyXG4gIGNvbnN0IHByb2plY3ROYW1lID0gcHJvamVjdElucHV0LnZhbHVlO1xyXG4gIGlmIChwcm9qZWN0TmFtZSkge1xyXG4gICAgY29uc3QgY2hlY2tEdXBsaWNhdGUgPSBkdXBsaWNhdGVJbkFycmF5KHByb2plY3ROYW1lLCBwcm9qZWN0TGlzdCwgXCJwcm9qZWN0TmFtZVwiKTtcclxuXHJcbiAgICBpZiAoY2hlY2tEdXBsaWNhdGUpIHtcclxuICAgICAgYWxlcnQoXCJQcm9qZWN0IG5hbWVzIG11c3QgYmUgZGlmZmVyZW50IVwiKTtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiBvcGVuUHJvamVjdFBvcHVwKCksIDApO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbXlQcm9qZWN0ID0gbmV3IFByb2plY3QocHJvamVjdE5hbWUpO1xyXG5cclxuICAgIHByb2plY3RMaXN0LnB1c2gobXlQcm9qZWN0KTtcclxuICAgIGNyZWF0ZU5ld0xpKG15UHJvamVjdCk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjaGVja0ZvckluZGV4KHRleHQpIHtcclxuICBjb25zdCByZXN1bHQgPSBwcm9qZWN0TGlzdC5maW5kSW5kZXgoKG9iaikgPT4gb2JqLnByb2plY3ROYW1lID09PSB0ZXh0KTtcclxuICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5mdW5jdGlvbiBkZWxldGVQcm9qZWN0KGUpIHtcclxuICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gIGNvbnN0IGxpID0gdGhpcy5wYXJlbnRFbGVtZW50O1xyXG4gIGNvbnN0IHRleHQgPSBsaS5xdWVyeVNlbGVjdG9yKFwiZGl2ID4gcFwiKS5pbm5lclRleHQ7XHJcbiAgY29uc3QgaW5kZXggPSBjaGVja0ZvckluZGV4KHRleHQpO1xyXG4gIHByb2plY3RMaXN0LnNwbGljZShpbmRleCwgMSk7XHJcblxyXG4gIHByb2plY3RzLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgbG9hZFByb2plY3RzKCk7XHJcblxyXG4gIC8qRklYTUU6IG9jY2hpbyBjaGUgcXVhbmRvIGNpIHNhcmFubm8gcG9pIGkgdGFza1xyXG4gIGFsbCdpbnRlcm5vIGRlbCBwcm9nZXR0bywgZG92cmFubm9cclxuICBlc3NlcmUgZWxpbWluYXRpIGluIGF1dG9tYXRpY28gYW5jaCdlc3NpKi9cclxuXHJcbiAgLypUT0RPOiBRdWFuZG8gZWxpbWluaSBpbCBwcm9nZXR0bywgcG9pIGlsIHJpZ3RoIG1haW5cclxuICBkYWxnaSB1biBpbm5lclRleHQgdnVvdG8gbyByb2JlIGNvc8OsXHJcbiAgYWx0cmltZW50aSBmYWxsbyBhbmRhcmUgc3UgaW5ib3gsbyBib2gsIHF1ZWwgY2hlIHRpIHBhcmVcclxuICAqL1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVOZXdMaShuYW1lKSB7XHJcbiAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XHJcbiAgbGkuY2xhc3NMaXN0LmFkZChcInByb2plY3RcIik7XHJcbiAgbGkuaW5uZXJIVE1MID0gYFxyXG4gIDxkaXY+XHJcbiAgPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1saXN0XCI+PC9pPlxyXG4gIDxwPiR7bmFtZS5wcm9qZWN0TmFtZX08L3A+XHJcbiAgPC9kaXY+XHJcbiAgYDtcclxuXHJcbiAgY29uc3QgaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xyXG4gIGkuY2xhc3NMaXN0LmFkZChcImZhLXNvbGlkXCIsIFwiZmEtdHJhc2gtY2FuXCIpO1xyXG4gIGkuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGRlbGV0ZVByb2plY3QpO1xyXG4gIGxpLmFwcGVuZENoaWxkKGkpO1xyXG5cclxuICBsaS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgbGlDbGljayk7XHJcbiAgbGkuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IGdlbmVyYXRlUGFnZShuYW1lKSk7XHJcbiAgcHJvamVjdHMuYXBwZW5kQ2hpbGQobGkpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBsaUNsaWNrKCkge1xyXG4gIGlmICghdGhpcy5jbGFzc05hbWUuaW5jbHVkZXMoXCJhY3RpdmVcIikpIHtcclxuICAgIHRoaXMuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGxpc3RPZkxpID0gbWFpbkxlZnQucXVlcnlTZWxlY3RvckFsbChcImxpXCIpO1xyXG4gIGxpc3RPZkxpLmZvckVhY2goKGVsKSA9PiB7XHJcbiAgICBpZiAoZWwgIT09IHRoaXMpIHtcclxuICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIH1cclxuICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRQcm9qZWN0cygpIHtcclxuICBwcm9qZWN0TGlzdC5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XHJcbiAgICBjcmVhdGVOZXdMaShwcm9qZWN0KTtcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gb3BlblByb2plY3RQb3B1cCgpIHtcclxuICBwcm9qZWN0UG9wdXAuY2xhc3NMaXN0LnJlbW92ZShcImQtbm9uZVwiKTtcclxuICBhZGRQcm9qZWN0LmNsYXNzTGlzdC5hZGQoXCJkLW5vbmVcIik7XHJcbiAgc2V0VGltZW91dCgoKSA9PiBwcm9qZWN0SW5wdXQuZm9jdXMoKSwgMTAwKTtcclxufVxyXG5cclxuZnVuY3Rpb24gdG9nZ2xlUHJvamVjdFBvcHVwKGUpIHtcclxuICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgcHJvamVjdFBvcHVwLnJlc2V0KCk7XHJcbiAgcHJvamVjdFBvcHVwLmNsYXNzTGlzdC5hZGQoXCJkLW5vbmVcIik7XHJcbiAgYWRkUHJvamVjdC5jbGFzc0xpc3QucmVtb3ZlKFwiZC1ub25lXCIpO1xyXG59XHJcblxyXG5pbmJveC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgbGlDbGljayk7XHJcbmluYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBnZW5lcmF0ZUluYm94KTtcclxuaW5ib3guYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHJlbW92ZUhhbmRsZXJQcm9qZWN0KTtcclxuaW5ib3guYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGxvYWRJbmJveFRhc2tzKTtcclxudG9kYXkuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGxpQ2xpY2spO1xyXG5hZGRQcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBvcGVuUHJvamVjdFBvcHVwKTtcclxucHJvamVjdEFkZEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYWRkUHJvamVjdFBvcHVwKTtcclxucHJvamVjdENhbmNlbEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdG9nZ2xlUHJvamVjdFBvcHVwKTtcclxucHJvamVjdFBvcHVwLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgdG9nZ2xlUHJvamVjdFBvcHVwKTtcclxuIiwiaW1wb3J0IHsgZHVwbGljYXRlSW5BcnJheSB9IGZyb20gXCIuL2J1aWxkLXdlYlwiO1xyXG5cclxuY29uc3QgdGFza3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2tzXCIpO1xyXG5jb25zdCBoMiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWFpbl9fcmlnaHQgPiBoMlwiKTtcclxuY29uc3QgYWRkVGFzayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXRhc2tcIik7XHJcbmNvbnN0IHRhc2tQb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXRhc2stcG9wdXBcIik7XHJcbmNvbnN0IG1vZFRhc2tQb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubW9kLXRhc2stcG9wdXBcIik7XHJcbmNvbnN0IHRhc2tDYW5jZWxCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC10YXNrLXBvcHVwIC5idG4tY2FuY2VsXCIpO1xyXG5jb25zdCBtb2RUYXNrQ2FuY2VsQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tb2QtdGFzay1wb3B1cCAuYnRuLWNhbmNlbFwiKTtcclxuY29uc3QgdGFza0FkZEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXRhc2stcG9wdXAgLmJ0bi1hZGRcIik7XHJcbmNvbnN0IG1vZFRhc2tBZGRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1vZC10YXNrLXBvcHVwIC5idG4tYWRkXCIpO1xyXG5jb25zdCB0YXNrTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFzay1uYW1lXCIpO1xyXG5jb25zdCBtb2RUYXNrTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFzay1uYW1lLW1vZFwiKTtcclxuY29uc3QgdGFza0RhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2stZGF0ZVwiKTtcclxuY29uc3QgbW9kVGFza0RhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2stZGF0ZS1tb2RcIik7XHJcblxyXG5jb25zdCBpbmJveFRhc2tMaXN0ID0gW107XHJcbmxldCBtb2RPYmo7XHJcbmxldCBjdXJyZW50UHJvajtcclxuXHJcbmNsYXNzIFRhc2sge1xyXG4gIGNvbnN0cnVjdG9yKG5hbWUsIGRhdGUsIHN0YXR1cykge1xyXG4gICAgdGhpcy50YXNrTmFtZSA9IG5hbWU7XHJcbiAgICB0aGlzLnRhc2tEYXRlID0gZGF0ZTtcclxuICAgIHRoaXMuY2hlY2tlZCA9IHN0YXR1cztcclxuICB9XHJcblxyXG4gIHNldE5hbWUobmFtZSkge1xyXG4gICAgdGhpcy50YXNrTmFtZSA9IG5hbWU7XHJcbiAgfVxyXG5cclxuICBnZXROYW1lKCkge1xyXG4gICAgcmV0dXJuIHRoaXMudGFza05hbWU7XHJcbiAgfVxyXG5cclxuICBzZXREYXRlKGRhdGUpIHtcclxuICAgIHRoaXMudGFza0RhdGUgPSBkYXRlO1xyXG4gIH1cclxuXHJcbiAgZ2V0RGF0ZSgpIHtcclxuICAgIHJldHVybiB0aGlzLnRhc2tEYXRlO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc2V0Q3VycmVudFByb2oocHJvaikge1xyXG4gIGN1cnJlbnRQcm9qID0gcHJvajtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlUGFnZShwcm9qZWN0KSB7XHJcbiAgaDIuaW5uZXJUZXh0ID0gcHJvamVjdC5wcm9qZWN0TmFtZTtcclxuXHJcbiAgY3VycmVudFByb2ogPSBwcm9qZWN0O1xyXG5cclxuICB0YXNrcy5pbm5lckhUTUwgPSBcIlwiO1xyXG4gIGxvYWRQcm9qZWN0VGFza3MoKTtcclxuXHJcbiAgcmVtb3ZlSGFuZGxlckluYm94KCk7XHJcbiAgcmVtb3ZlSGFuZGxlclByb2plY3QoKTtcclxuICB0YXNrQWRkQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBhZGRUYXNrUHJvamVjdChwcm9qZWN0KSk7XHJcbiAgLy8gbW9kVGFza0FkZEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gbW9kVGFza0VkaXRCdG4obW9kT2JqKSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFRhc2tQcm9qZWN0KHByb2opIHtcclxuICBjb25zdCBuYW1lID0gdGFza05hbWUudmFsdWU7XHJcbiAgY29uc3QgZGF0ZSA9IHRhc2tEYXRlLnZhbHVlO1xyXG4gIGNvbnN0IGFycmF5ID0gcHJvai5nZXRMaXN0KCk7XHJcblxyXG4gIGlmIChuYW1lICYmIGRhdGUpIHtcclxuICAgIGNvbnN0IGNoZWNrRHVwbGljYXRlID0gZHVwbGljYXRlSW5BcnJheShuYW1lLCBhcnJheSwgXCJ0YXNrTmFtZVwiKTtcclxuXHJcbiAgICBpZiAoY2hlY2tEdXBsaWNhdGUpIHtcclxuICAgICAgYWxlcnQoXCJUYXNrIG5hbWVzIG11c3QgYmUgZGlmZmVyZW50IVwiKTtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiBvcGVuVGFza1BvcHVwKCksIDApO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZm9ybWF0RGF0ZSA9IGRhdGUuc3BsaXQoXCItXCIpLnJldmVyc2UoKS5qb2luKFwiL1wiKTtcclxuXHJcbiAgICBjb25zdCBteVRhc2sgPSBuZXcgVGFzayhuYW1lLCBmb3JtYXREYXRlLCBmYWxzZSk7XHJcblxyXG4gICAgcHJvai5hZGRUYXNrKG15VGFzayk7XHJcbiAgICBjb25zb2xlLmxvZyhwcm9qLmdldE9iaigpKTtcclxuICAgIG5ld0xpRm9yUHJvamVjdChteVRhc2spO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlSW5ib3goKSB7XHJcbiAgaDIuaW5uZXJUZXh0ID0gXCJJbmJveFwiO1xyXG5cclxuICB0YXNrQWRkQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhZGRUYXNrSW5ib3gpO1xyXG4gIG1vZFRhc2tBZGRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IG1vZFRhc2tFZGl0QnRuKG1vZE9iaikpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRUYXNrSW5ib3goKSB7XHJcbiAgY29uc3QgbmFtZSA9IHRhc2tOYW1lLnZhbHVlO1xyXG4gIGNvbnN0IGRhdGUgPSB0YXNrRGF0ZS52YWx1ZTtcclxuXHJcbiAgaWYgKG5hbWUgJiYgZGF0ZSkge1xyXG4gICAgY29uc3QgY2hlY2tEdXBsaWNhdGUgPSBkdXBsaWNhdGVJbkFycmF5KG5hbWUsIGluYm94VGFza0xpc3QsIFwidGFza05hbWVcIik7XHJcblxyXG4gICAgaWYgKGNoZWNrRHVwbGljYXRlKSB7XHJcbiAgICAgIGFsZXJ0KFwiVGFzayBuYW1lcyBtdXN0IGJlIGRpZmZlcmVudCFcIik7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gb3BlblRhc2tQb3B1cCgpLCAwKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGZvcm1hdERhdGUgPSBkYXRlLnNwbGl0KFwiLVwiKS5yZXZlcnNlKCkuam9pbihcIi9cIik7XHJcblxyXG4gICAgY29uc3QgbXlUYXNrID0gbmV3IFRhc2sobmFtZSwgZm9ybWF0RGF0ZSwgZmFsc2UpO1xyXG5cclxuICAgIGluYm94VGFza0xpc3QucHVzaChteVRhc2spO1xyXG4gICAgbmV3TGkobXlUYXNrKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVIYW5kbGVySW5ib3goKSB7XHJcbiAgdGFza0FkZEJ0bi5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYWRkVGFza0luYm94KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUhhbmRsZXJQcm9qZWN0KCkge1xyXG4gIHRhc2tBZGRCdG4ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFkZFRhc2tQcm9qZWN0KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRJbmJveFRhc2tzKCkge1xyXG4gIGluYm94VGFza0xpc3QuZm9yRWFjaCgodGFzaykgPT4ge1xyXG4gICAgbmV3TGkodGFzayk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxvYWRQcm9qZWN0VGFza3MoKSB7XHJcbiAgY3VycmVudFByb2ouZ2V0TGlzdCgpLmZvckVhY2goKHRhc2spID0+IHtcclxuICAgIG5ld0xpRm9yUHJvamVjdCh0YXNrKTtcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2hlY2tJbmRleFRhc2sodGV4dCkge1xyXG4gIGNvbnN0IHJlc3VsdCA9IGluYm94VGFza0xpc3QuZmluZEluZGV4KChvYmopID0+IG9iai50YXNrTmFtZSA9PT0gdGV4dCk7XHJcbiAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZnVuY3Rpb24gY2hlY2tQcm9qZWN0VGFzayh0ZXh0KSB7XHJcbiAgY29uc3QgcmVzdWx0ID0gY3VycmVudFByb2ouZ2V0TGlzdCgpLmZpbmRJbmRleCgob2JqKSA9PiBvYmoudGFza05hbWUgPT09IHRleHQpO1xyXG4gIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNoZWNrTGkob2JqLCBpY29uKSB7XHJcbiAgaWYgKG9iai5jaGVja2VkKSB7XHJcbiAgICBpY29uLmNsYXNzTGlzdC5yZW1vdmUoXCJmYS1zcXVhcmVcIik7XHJcbiAgICBpY29uLmNsYXNzTGlzdC5hZGQoXCJmYS1zcXVhcmUtY2hlY2tcIik7XHJcbiAgfSBlbHNlIHtcclxuICAgIGljb24uY2xhc3NMaXN0LnJlbW92ZShcImZhLXNxdWFyZS1jaGVja1wiKTtcclxuICAgIGljb24uY2xhc3NMaXN0LmFkZChcImZhLXNxdWFyZVwiKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNoYW5nZVRhc2tTdGF0dXMoKSB7XHJcbiAgY29uc3QgdGFzayA9IHRoaXMubmV4dFNpYmxpbmcuaW5uZXJUZXh0O1xyXG4gIGNvbnN0IGluZGV4ID0gY2hlY2tJbmRleFRhc2sodGFzayk7XHJcbiAgY29uc3Qgb2JqID0gaW5ib3hUYXNrTGlzdFtpbmRleF07XHJcbiAgb2JqLmNoZWNrZWQgPSAhb2JqLmNoZWNrZWQ7XHJcblxyXG4gIGNoZWNrTGkob2JqLCB0aGlzKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2hhbmdlVGFza1Byb2plY3RTdGF0dXMoKSB7XHJcbiAgY29uc3QgdGFzayA9IHRoaXMubmV4dFNpYmxpbmcuaW5uZXJUZXh0O1xyXG4gIGNvbnN0IGluZGV4ID0gY2hlY2tQcm9qZWN0VGFzayh0YXNrKTtcclxuICBjb25zdCBvYmogPSBjdXJyZW50UHJvai5nZXRMaXN0KClbaW5kZXhdO1xyXG4gIG9iai5jaGVja2VkID0gIW9iai5jaGVja2VkO1xyXG5cclxuICBjaGVja0xpKG9iaiwgdGhpcyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRlbGV0ZVRhc2soKSB7XHJcbiAgY29uc3QgbGkgPSB0aGlzLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcclxuICBjb25zdCB0ZXh0ID0gbGkucXVlcnlTZWxlY3RvcihcIi5uYW1lLXRhc2sgPiBwXCIpLmlubmVyVGV4dDtcclxuICBjb25zdCBpbmRleCA9IGNoZWNrSW5kZXhUYXNrKHRleHQpO1xyXG4gIGluYm94VGFza0xpc3Quc3BsaWNlKGluZGV4LCAxKTtcclxuXHJcbiAgdGFza3MuaW5uZXJIVE1MID0gXCJcIjtcclxuICBsb2FkSW5ib3hUYXNrcygpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkZWxldGVUYXNrUHJvamVjdCgpIHtcclxuICBjb25zdCBsaSA9IHRoaXMucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xyXG4gIGNvbnN0IHRleHQgPSBsaS5xdWVyeVNlbGVjdG9yKFwiLm5hbWUtdGFzayA+IHBcIikuaW5uZXJUZXh0O1xyXG4gIGNvbnN0IGluZGV4ID0gY2hlY2tQcm9qZWN0VGFzayh0ZXh0KTtcclxuICBjdXJyZW50UHJvai5nZXRMaXN0KCkuc3BsaWNlKGluZGV4LCAxKTtcclxuXHJcbiAgdGFza3MuaW5uZXJIVE1MID0gXCJcIjtcclxuICBsb2FkUHJvamVjdFRhc2tzKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1vZFRhc2soKSB7XHJcbiAgY29uc3QgbGkgPSB0aGlzLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcclxuICBjb25zdCB0ZXh0ID0gbGkucXVlcnlTZWxlY3RvcihcIi5uYW1lLXRhc2sgPiBwXCIpLmlubmVyVGV4dDtcclxuICBjb25zdCBpbmRleCA9IGNoZWNrSW5kZXhUYXNrKHRleHQpO1xyXG4gIGNvbnN0IG9iaiA9IGluYm94VGFza0xpc3RbaW5kZXhdO1xyXG5cclxuICBtb2RPYmogPSBvYmo7XHJcblxyXG4gIGNvbnN0IG5hbWUgPSBvYmouZ2V0TmFtZSgpO1xyXG4gIGNvbnN0IGRhdGUgPSBvYmouZ2V0RGF0ZSgpO1xyXG5cclxuICBjb25zdCBmb3JtYXREYXRlID0gZGF0ZS5zcGxpdChcIi9cIikucmV2ZXJzZSgpLmpvaW4oXCItXCIpO1xyXG5cclxuICBvcGVuTW9kVGFza1BvcHVwKCk7XHJcblxyXG4gIG1vZFRhc2tOYW1lLnZhbHVlID0gbmFtZTtcclxuICBtb2RUYXNrRGF0ZS52YWx1ZSA9IGZvcm1hdERhdGU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1vZFRhc2tFZGl0QnRuKG9iaikge1xyXG4gIGNvbnN0IG5hbWUgPSBtb2RUYXNrTmFtZS52YWx1ZTtcclxuICBjb25zdCBkYXRlID0gbW9kVGFza0RhdGUudmFsdWU7XHJcblxyXG4gIGNvbnN0IGZvcm1hdERhdGUgPSBkYXRlLnNwbGl0KFwiLVwiKS5yZXZlcnNlKCkuam9pbihcIi9cIik7XHJcblxyXG4gIG9iai5zZXROYW1lKG5hbWUpO1xyXG4gIG9iai5zZXREYXRlKGZvcm1hdERhdGUpO1xyXG5cclxuICB0YXNrcy5pbm5lckhUTUwgPSBcIlwiO1xyXG4gIGxvYWRJbmJveFRhc2tzKCk7XHJcbn1cclxuXHJcbi8vVE9ETzogb2NjaGlvIGNoZSBzaSBwb3RyZWJiZXJvIGF2ZXJlIHByb2JsZW1pIGNvbCBsb2NhbHN0b3JhZ2VcclxuLy9wZXIgbCdhdXRvIGNoZWNrZXIgZGF0byBjaGUgbGkgc29uIHR1dHRlIHN0cmluZ2hlLFxyXG4vL2Ugbm9uIHNvIGNvbWUgc2kgcmlzb2x2ZSBpbCBmYXR0byBjaGUgc2lhIHVuIGJvb2xlYW5cclxuZnVuY3Rpb24gbmV3TGkob2JqKSB7XHJcbiAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XHJcbiAgbGkuY2xhc3NMaXN0LmFkZChcInRhc2tcIik7XHJcblxyXG4gIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgZGl2LmNsYXNzTGlzdC5hZGQoXCJuYW1lLXRhc2tcIik7XHJcblxyXG4gIGNvbnN0IGlTcXVhcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcclxuICBpU3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJmYS1zb2xpZFwiKTtcclxuXHJcbiAgLy9hdXRvLWNoZWNrZXIgd2hlbiB3ZSByZWNyYWl0ZSB0aGUgbGkgZnJvbSBMb2NhbFN0b3JhZ2VcclxuICBpZiAob2JqLmNoZWNrZWQpIHtcclxuICAgIGlTcXVhcmUuY2xhc3NMaXN0LmFkZChcImZhLXNxdWFyZS1jaGVja1wiKTtcclxuICB9IGVsc2Uge1xyXG4gICAgaVNxdWFyZS5jbGFzc0xpc3QuYWRkKFwiZmEtc3F1YXJlXCIpO1xyXG4gIH1cclxuXHJcbiAgaVNxdWFyZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2hhbmdlVGFza1N0YXR1cyk7XHJcblxyXG4gIGNvbnN0IHBOYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XHJcbiAgcE5hbWUuaW5uZXJUZXh0ID0gYCR7b2JqLnRhc2tOYW1lfWA7XHJcblxyXG4gIGRpdi5hcHBlbmRDaGlsZChpU3F1YXJlKTtcclxuICBkaXYuYXBwZW5kQ2hpbGQocE5hbWUpO1xyXG4gIGxpLmFwcGVuZENoaWxkKGRpdik7XHJcblxyXG4gIGNvbnN0IGRldGFpbHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gIGRldGFpbHMuY2xhc3NMaXN0LmFkZChcImRldGFpbHNcIik7XHJcblxyXG4gIGNvbnN0IHBEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XHJcbiAgcERhdGUuaW5uZXJUZXh0ID0gYCR7b2JqLnRhc2tEYXRlfWA7XHJcblxyXG4gIGNvbnN0IGlQZW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcclxuICBpUGVuLmNsYXNzTGlzdC5hZGQoXCJmYS1zb2xpZFwiLCBcImZhLXBlbi10by1zcXVhcmVcIik7XHJcbiAgaVBlbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgbW9kVGFzayk7XHJcblxyXG4gIGNvbnN0IGlUcmFzaCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xyXG4gIGlUcmFzaC5jbGFzc0xpc3QuYWRkKFwiZmEtc29saWRcIiwgXCJmYS10cmFzaC1jYW5cIik7XHJcbiAgaVRyYXNoLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBkZWxldGVUYXNrKTtcclxuXHJcbiAgZGV0YWlscy5hcHBlbmRDaGlsZChwRGF0ZSk7XHJcbiAgZGV0YWlscy5hcHBlbmRDaGlsZChpUGVuKTtcclxuICBkZXRhaWxzLmFwcGVuZENoaWxkKGlUcmFzaCk7XHJcbiAgbGkuYXBwZW5kQ2hpbGQoZGV0YWlscyk7XHJcblxyXG4gIHRhc2tzLmFwcGVuZENoaWxkKGxpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gbmV3TGlGb3JQcm9qZWN0KG9iaikge1xyXG4gIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xyXG4gIGxpLmNsYXNzTGlzdC5hZGQoXCJ0YXNrXCIpO1xyXG5cclxuICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gIGRpdi5jbGFzc0xpc3QuYWRkKFwibmFtZS10YXNrXCIpO1xyXG5cclxuICBjb25zdCBpU3F1YXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XHJcbiAgaVNxdWFyZS5jbGFzc0xpc3QuYWRkKFwiZmEtc29saWRcIik7XHJcblxyXG4gIC8vYXV0by1jaGVja2VyIHdoZW4gd2UgcmVjcmFpdGUgdGhlIGxpIGZyb20gTG9jYWxTdG9yYWdlXHJcbiAgaWYgKG9iai5jaGVja2VkKSB7XHJcbiAgICBpU3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJmYS1zcXVhcmUtY2hlY2tcIik7XHJcbiAgfSBlbHNlIHtcclxuICAgIGlTcXVhcmUuY2xhc3NMaXN0LmFkZChcImZhLXNxdWFyZVwiKTtcclxuICB9XHJcblxyXG4gIGlTcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNoYW5nZVRhc2tQcm9qZWN0U3RhdHVzKTtcclxuXHJcbiAgY29uc3QgcE5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcclxuICBwTmFtZS5pbm5lclRleHQgPSBgJHtvYmoudGFza05hbWV9YDtcclxuXHJcbiAgZGl2LmFwcGVuZENoaWxkKGlTcXVhcmUpO1xyXG4gIGRpdi5hcHBlbmRDaGlsZChwTmFtZSk7XHJcbiAgbGkuYXBwZW5kQ2hpbGQoZGl2KTtcclxuXHJcbiAgY29uc3QgZGV0YWlscyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgZGV0YWlscy5jbGFzc0xpc3QuYWRkKFwiZGV0YWlsc1wiKTtcclxuXHJcbiAgY29uc3QgcERhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcclxuICBwRGF0ZS5pbm5lclRleHQgPSBgJHtvYmoudGFza0RhdGV9YDtcclxuXHJcbiAgY29uc3QgaVBlbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xyXG4gIGlQZW4uY2xhc3NMaXN0LmFkZChcImZhLXNvbGlkXCIsIFwiZmEtcGVuLXRvLXNxdWFyZVwiKTtcclxuICBpUGVuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBtb2RUYXNrKTtcclxuXHJcbiAgY29uc3QgaVRyYXNoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XHJcbiAgaVRyYXNoLmNsYXNzTGlzdC5hZGQoXCJmYS1zb2xpZFwiLCBcImZhLXRyYXNoLWNhblwiKTtcclxuICBpVHJhc2guYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGRlbGV0ZVRhc2tQcm9qZWN0KTtcclxuXHJcbiAgZGV0YWlscy5hcHBlbmRDaGlsZChwRGF0ZSk7XHJcbiAgZGV0YWlscy5hcHBlbmRDaGlsZChpUGVuKTtcclxuICBkZXRhaWxzLmFwcGVuZENoaWxkKGlUcmFzaCk7XHJcbiAgbGkuYXBwZW5kQ2hpbGQoZGV0YWlscyk7XHJcblxyXG4gIHRhc2tzLmFwcGVuZENoaWxkKGxpKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZExpc3RlbmVycygpIHtcclxuICBhZGRUYXNrLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBvcGVuVGFza1BvcHVwKTtcclxuICB0YXNrQ2FuY2VsQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0b2dnbGVUYXNrUG9wdXApO1xyXG4gIHRhc2tQb3B1cC5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIHRvZ2dsZVRhc2tQb3B1cCk7XHJcblxyXG4gIG1vZFRhc2tDYW5jZWxCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRvZ2dsZU1vZFRhc2tQb3B1cCk7XHJcbiAgbW9kVGFza1BvcHVwLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgdG9nZ2xlTW9kVGFza1BvcHVwKTtcclxufVxyXG5cclxuZnVuY3Rpb24gb3BlblRhc2tQb3B1cCgpIHtcclxuICB0YXNrUG9wdXAuY2xhc3NMaXN0LnJlbW92ZShcImQtbm9uZVwiKTtcclxuICBhZGRUYXNrLmNsYXNzTGlzdC5hZGQoXCJkLW5vbmVcIik7XHJcbiAgc2V0VGltZW91dCgoKSA9PiB0YXNrTmFtZS5mb2N1cygpLCAxMDApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBvcGVuTW9kVGFza1BvcHVwKCkge1xyXG4gIG1vZFRhc2tQb3B1cC5jbGFzc0xpc3QucmVtb3ZlKFwiZC1ub25lXCIpO1xyXG4gIHNldFRpbWVvdXQoKCkgPT4gbW9kVGFza05hbWUuZm9jdXMoKSwgMTAwKTtcclxufVxyXG5cclxuZnVuY3Rpb24gdG9nZ2xlVGFza1BvcHVwKGUpIHtcclxuICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgdGFza1BvcHVwLnJlc2V0KCk7XHJcbiAgdGFza1BvcHVwLmNsYXNzTGlzdC5hZGQoXCJkLW5vbmVcIik7XHJcbiAgYWRkVGFzay5jbGFzc0xpc3QucmVtb3ZlKFwiZC1ub25lXCIpO1xyXG59XHJcblxyXG5mdW5jdGlvbiB0b2dnbGVNb2RUYXNrUG9wdXAoZSkge1xyXG4gIGUucHJldmVudERlZmF1bHQoKTtcclxuICBtb2RUYXNrUG9wdXAucmVzZXQoKTtcclxuICBtb2RUYXNrUG9wdXAuY2xhc3NMaXN0LmFkZChcImQtbm9uZVwiKTtcclxufVxyXG4iLCJpbXBvcnQgeyBsb2FkUHJvamVjdHMgfSBmcm9tIFwiLi9idWlsZC1tYWluTGVmdFwiO1xyXG5pbXBvcnQge1xyXG4gIGdlbmVyYXRlSW5ib3gsXHJcbiAgZ2VuZXJhdGVQYWdlLFxyXG4gIGFkZExpc3RlbmVycyxcclxuICBsb2FkSW5ib3hUYXNrcyxcclxufSBmcm9tIFwiLi9idWlsZC1tYWluUmlnaHRcIjtcclxuXHJcbi8qXHJcbkZJWE1FOiBxdWkgc2NyaXZpYW1vIGxlIGNvc2UgZ2VuZXJhbGkgY2hlIG5vbiBcclxudmFubm8gbmVpIG1vZHVsaSBzcGVjaWZpY2ksIGNvbWUgcGVyIGVzZW1waW8gcXVlc3RhIHNvdHRvXHJcbnBlciBlc2VtcGlvIGRvYmJpYW1vIGFnZ2l1bmdlcmUgaWwgY29zbyBwZXIgbCdoYW1idXJnZXIgbWVudVxyXG4qL1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGR1cGxpY2F0ZUluQXJyYXkodGV4dCwgYXJyYXksIG9iaktleSkge1xyXG4gIGxldCByZXN1bHQ7XHJcbiAgYXJyYXkuZm9yRWFjaCgob2JqKSA9PiB7XHJcbiAgICBpZiAob2JqW29iaktleV0gPT09IHRleHQpIHtcclxuICAgICAgcmVzdWx0ID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJlc3VsdCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5mdW5jdGlvbiBoZWFkZXJIYW1idXJnZXJNZW51KCkge1xyXG4gIGNvbnN0IG1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaGVhZGVyIC5mYS1iYXJzXCIpO1xyXG4gIGNvbnN0IG1haW5MZWZ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtYWluX19sZWZ0XCIpO1xyXG5cclxuICBmdW5jdGlvbiBjbGlja0hhbmRsZXIoKSB7XHJcbiAgICBtYWluTGVmdC5jbGFzc0xpc3QudG9nZ2xlKFwiZC1ub25lXCIpO1xyXG4gIH1cclxuXHJcbiAgbWVudS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2xpY2tIYW5kbGVyKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYnVpbGRBbGwoKSB7XHJcbiAgaGVhZGVySGFtYnVyZ2VyTWVudSgpO1xyXG5cclxuICBsb2FkUHJvamVjdHMoKTtcclxuXHJcbiAgYWRkTGlzdGVuZXJzKCk7XHJcbiAgZ2VuZXJhdGVJbmJveCgpO1xyXG4gIGxvYWRJbmJveFRhc2tzKCk7XHJcbiAgLypGSVhNRTogb2NjaGlvIHBvaSBhIHF1YW5kbyBjaSBzYXLDoCBpbCBsb2NhbCBob3N0ICovXHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgYnVpbGRBbGwgZnJvbSBcIi4vYnVpbGQtd2ViXCI7XHJcblxyXG5idWlsZEFsbCgpO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=