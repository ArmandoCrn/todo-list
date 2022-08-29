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
/* harmony export */   "loadProjects": () => (/* binding */ loadProjects),
/* harmony export */   "projectList": () => (/* binding */ projectList)
/* harmony export */ });
/* harmony import */ var _build_web__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./build-web */ "./src/build-web.js");
/* harmony import */ var _today__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./today */ "./src/today.js");
/* harmony import */ var _build_mainRight__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./build-mainRight */ "./src/build-mainRight.js");




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

  getProjName() {
    return this.projectName;
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
  const trash = projectList.splice(index, 1);
  delete trash[0];

  projects.innerHTML = "";
  tasks.innerHTML = "";
  loadProjects();
  (0,_build_mainRight__WEBPACK_IMPORTED_MODULE_2__.deleteProjectRigth)();

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
  li.addEventListener("click", () => (0,_build_mainRight__WEBPACK_IMPORTED_MODULE_2__.setCurrentProj)(name));
  li.addEventListener("click", _build_mainRight__WEBPACK_IMPORTED_MODULE_2__.generatePage);
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
inbox.addEventListener("click", _build_mainRight__WEBPACK_IMPORTED_MODULE_2__.generateInbox);
inbox.addEventListener("click", _build_mainRight__WEBPACK_IMPORTED_MODULE_2__.removeHandlerProject);
inbox.addEventListener("click", _build_mainRight__WEBPACK_IMPORTED_MODULE_2__.loadInboxTasks);

today.addEventListener("click", liClick);
today.addEventListener("click", _today__WEBPACK_IMPORTED_MODULE_1__["default"]);

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
/* harmony export */   "inboxTaskList": () => (/* binding */ inboxTaskList),
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
  constructor(name, date, status, proj) {
    this.taskName = name;
    this.taskDate = date;
    this.checked = status;
    this.from = proj;
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
  (0,_build_web__WEBPACK_IMPORTED_MODULE_0__.removeDNone)(addTask);
  taskAddBtn.addEventListener("click", addTaskProject);
  modTaskAddBtn.addEventListener("click", modTaskEditBtnProjects);
}

function addTaskProject() {
  const name = taskName.value;
  const date = taskDate.value;
  const proj = currentProj;
  const objName = currentProj.getProjName();
  const array = proj.getList();

  if (name && date) {
    const checkDuplicate = (0,_build_web__WEBPACK_IMPORTED_MODULE_0__.duplicateInArray)(name, array, "taskName");

    if (checkDuplicate) {
      alert("Task names must be different!");
      setTimeout(() => openTaskPopup(), 0);
      return;
    }

    const formatDate = date.split("-").reverse().join("/");

    const myTask = new Task(name, formatDate, false, objName);

    proj.addTask(myTask);
    newLiForProject(myTask);
  }
}

function generateInbox() {
  h2.innerText = "Inbox";

  (0,_build_web__WEBPACK_IMPORTED_MODULE_0__.removeDNone)(addTask);
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

    const myTask = new Task(name, formatDate, false, "Inbox");

    inboxTaskList.push(myTask);
    newLi(myTask);
  }
}

function deleteProjectRigth() {
  h2.innerText = "";
  (0,_build_web__WEBPACK_IMPORTED_MODULE_0__.putDNone)(addTask);
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

function newLi(obj) {
  const li = document.createElement("li");
  li.classList.add("task");

  const div = document.createElement("div");
  div.classList.add("name-task");

  const iSquare = document.createElement("i");
  iSquare.classList.add("fa-solid");

  //auto-checker
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

  //auto-checker
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
/* harmony export */   "duplicateInArray": () => (/* binding */ duplicateInArray),
/* harmony export */   "putDNone": () => (/* binding */ putDNone),
/* harmony export */   "removeDNone": () => (/* binding */ removeDNone)
/* harmony export */ });
/* harmony import */ var _build_mainLeft__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./build-mainLeft */ "./src/build-mainLeft.js");
/* harmony import */ var _build_mainRight__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./build-mainRight */ "./src/build-mainRight.js");



function putDNone(element) {
  element.classList.add("d-none");
}

function removeDNone(element) {
  element.classList.remove("d-none");
}

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
}


/***/ }),

/***/ "./src/today.js":
/*!**********************!*\
  !*** ./src/today.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ generateToday)
/* harmony export */ });
/* harmony import */ var _build_web__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./build-web */ "./src/build-web.js");
/* harmony import */ var _build_mainRight__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./build-mainRight */ "./src/build-mainRight.js");
/* harmony import */ var _build_mainLeft__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./build-mainLeft */ "./src/build-mainLeft.js");




const TODAY_DATE = getToday();

const tasks = document.querySelector("#tasks");

const h2 = document.querySelector("#main__right > h2");

const addTask = document.querySelector(".add-task");
/**
 * ora ci serve prendere tutti i task giusti, in base alla data del giorno
 */

function generateToday() {
  h2.innerText = "Today";
  tasks.innerHTML = "";

  const arrayIndex = filteredInbox();
  const arrayProjects = filteredProjects();

  arrayIndex.forEach((x) => newLiToday(x));
  arrayProjects.forEach((y) => newLiToday(y));

  (0,_build_web__WEBPACK_IMPORTED_MODULE_0__.putDNone)(addTask);
}

function filteredInbox() {
  return _build_mainRight__WEBPACK_IMPORTED_MODULE_1__.inboxTaskList.filter((task) => task.taskDate === TODAY_DATE);
}

function filteredProjects() {
  const result = [];

  const list = _build_mainLeft__WEBPACK_IMPORTED_MODULE_2__.projectList.forEach((proj) => {
    const list = proj.getList();

    list.forEach((task) => (task.taskDate === TODAY_DATE ? result.push(task) : null));
  });

  return result;
}

function newLiToday(obj) {
  const li = document.createElement("li");
  li.classList.add("task");

  const div = document.createElement("div");
  div.classList.add("name-task");

  const icon = document.createElement("i");
  icon.classList.add("fa-solid", "fa-angle-right");

  const pName = document.createElement("p");
  pName.innerText = `${obj.taskName}`;

  const pFrom = document.createElement("p");
  pFrom.classList.add("today-from");
  pFrom.innerText = `(${obj.from})`;

  div.appendChild(icon);
  div.appendChild(pName);
  div.appendChild(pFrom);
  li.appendChild(div);

  const details = document.createElement("div");
  details.classList.add("details");

  const pDate = document.createElement("p");
  pDate.innerText = `${obj.taskDate}`;

  details.appendChild(pDate);
  li.appendChild(details);

  tasks.appendChild(li);
}

function getToday() {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const newMonth = month < 10 ? `0${month}` : month;
  const year = date.getFullYear();

  return `${day}/${newMonth}/${year}`;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGFBQWE7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGFBQWE7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixhQUFhO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixhQUFhO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQy9ZZ0Q7QUFNckI7QUFDM0I7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNlO0FBQ2Y7QUFDQTtBQUNBLEVBQUUsNkRBQVk7QUFDZDtBQUNBLEVBQUUsOERBQVk7QUFDZCxFQUFFLCtEQUFhO0FBQ2YsRUFBRSxnRUFBYztBQUNoQjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaER1QztBQUNXO0FBQ0g7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ2U7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFLG9EQUFRO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsU0FBUyxrRUFBb0I7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsZ0VBQW1CO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsYUFBYTtBQUNwQztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsU0FBUztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixhQUFhO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsTUFBTTtBQUMxQztBQUNBO0FBQ0EsWUFBWSxJQUFJLEdBQUcsU0FBUyxHQUFHLEtBQUs7QUFDcEM7Ozs7Ozs7VUN0RkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05tQztBQUNuQztBQUNBLHNEQUFRIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vNC10b2RvLWxpc3QvLi9zcmMvYnVpbGQtbWFpbkxlZnQuanMiLCJ3ZWJwYWNrOi8vNC10b2RvLWxpc3QvLi9zcmMvYnVpbGQtbWFpblJpZ2h0LmpzIiwid2VicGFjazovLzQtdG9kby1saXN0Ly4vc3JjL2J1aWxkLXdlYi5qcyIsIndlYnBhY2s6Ly80LXRvZG8tbGlzdC8uL3NyYy90b2RheS5qcyIsIndlYnBhY2s6Ly80LXRvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly80LXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vNC10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly80LXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLzQtdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGR1cGxpY2F0ZUluQXJyYXkgfSBmcm9tIFwiLi9idWlsZC13ZWJcIjtcclxuaW1wb3J0IGdlbmVyYXRlVG9kYXkgZnJvbSBcIi4vdG9kYXlcIjtcclxuaW1wb3J0IHtcclxuICBnZW5lcmF0ZUluYm94LFxyXG4gIGdlbmVyYXRlUGFnZSxcclxuICByZW1vdmVIYW5kbGVySW5ib3gsXHJcbiAgcmVtb3ZlSGFuZGxlclByb2plY3QsXHJcbiAgbG9hZEluYm94VGFza3MsXHJcbiAgbG9hZFByb2plY3RUYXNrcyxcclxuICBzZXRDdXJyZW50UHJvaixcclxuICBkZWxldGVQcm9qZWN0UmlndGgsXHJcbn0gZnJvbSBcIi4vYnVpbGQtbWFpblJpZ2h0XCI7XHJcblxyXG5jb25zdCBtYWluTGVmdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWFpbl9fbGVmdFwiKTtcclxuY29uc3QgaW5ib3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmluYm94XCIpO1xyXG5jb25zdCB0b2RheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kYXlcIik7XHJcblxyXG5jb25zdCBwcm9qZWN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdHNcIik7XHJcbmNvbnN0IHRhc2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrc1wiKTtcclxuY29uc3QgYWRkUHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXByb2plY3RcIik7XHJcbmNvbnN0IHByb2plY3RQb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXByb2plY3QtcG9wdXBcIik7XHJcbmNvbnN0IHByb2plY3RDYW5jZWxCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC1wcm9qZWN0LXBvcHVwIC5idG4tY2FuY2VsXCIpO1xyXG5jb25zdCBwcm9qZWN0QWRkQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtcHJvamVjdC1wb3B1cCAuYnRuLWFkZFwiKTtcclxuY29uc3QgcHJvamVjdElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9qZWN0LW5hbWVcIik7XHJcblxyXG4vKlxyXG5Vc2UgdGhlIG9iai5wcm9qZWN0TmFtZSBhcyBhIFwia2V5XCIgZm9yIGxvYWQgdGhlIHBhZ2UgXHJcbm9mIHRoZSB0YXNrcyBsaXN0XHJcbiovXHJcbmV4cG9ydCBjb25zdCBwcm9qZWN0TGlzdCA9IFtdO1xyXG5cclxuY2xhc3MgUHJvamVjdCB7XHJcbiAgY29uc3RydWN0b3IobmFtZSkge1xyXG4gICAgdGhpcy5wcm9qZWN0TmFtZSA9IG5hbWU7XHJcbiAgICB0aGlzLnRhc2tMaXN0ID0gW107XHJcbiAgfVxyXG5cclxuICBhZGRUYXNrKHRhc2spIHtcclxuICAgIHRoaXMudGFza0xpc3QucHVzaCh0YXNrKTtcclxuICB9XHJcblxyXG4gIGdldFByb2pOYW1lKCkge1xyXG4gICAgcmV0dXJuIHRoaXMucHJvamVjdE5hbWU7XHJcbiAgfVxyXG5cclxuICBnZXRMaXN0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMudGFza0xpc3Q7XHJcbiAgfVxyXG5cclxuICBnZXRPYmooKSB7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFByb2plY3RQb3B1cCgpIHtcclxuICBjb25zdCBwcm9qZWN0TmFtZSA9IHByb2plY3RJbnB1dC52YWx1ZTtcclxuICBpZiAocHJvamVjdE5hbWUpIHtcclxuICAgIGNvbnN0IGNoZWNrRHVwbGljYXRlID0gZHVwbGljYXRlSW5BcnJheShwcm9qZWN0TmFtZSwgcHJvamVjdExpc3QsIFwicHJvamVjdE5hbWVcIik7XHJcblxyXG4gICAgaWYgKGNoZWNrRHVwbGljYXRlKSB7XHJcbiAgICAgIGFsZXJ0KFwiUHJvamVjdCBuYW1lcyBtdXN0IGJlIGRpZmZlcmVudCFcIik7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gb3BlblByb2plY3RQb3B1cCgpLCAwKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG15UHJvamVjdCA9IG5ldyBQcm9qZWN0KHByb2plY3ROYW1lKTtcclxuXHJcbiAgICBwcm9qZWN0TGlzdC5wdXNoKG15UHJvamVjdCk7XHJcbiAgICBjcmVhdGVOZXdMaShteVByb2plY3QpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY2hlY2tGb3JJbmRleCh0ZXh0KSB7XHJcbiAgY29uc3QgcmVzdWx0ID0gcHJvamVjdExpc3QuZmluZEluZGV4KChvYmopID0+IG9iai5wcm9qZWN0TmFtZSA9PT0gdGV4dCk7XHJcbiAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZnVuY3Rpb24gZGVsZXRlUHJvamVjdChlKSB7XHJcbiAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICBjb25zdCBsaSA9IHRoaXMucGFyZW50RWxlbWVudDtcclxuICBjb25zdCB0ZXh0ID0gbGkucXVlcnlTZWxlY3RvcihcImRpdiA+IHBcIikuaW5uZXJUZXh0O1xyXG4gIGNvbnN0IGluZGV4ID0gY2hlY2tGb3JJbmRleCh0ZXh0KTtcclxuICBjb25zdCB0cmFzaCA9IHByb2plY3RMaXN0LnNwbGljZShpbmRleCwgMSk7XHJcbiAgZGVsZXRlIHRyYXNoWzBdO1xyXG5cclxuICBwcm9qZWN0cy5pbm5lckhUTUwgPSBcIlwiO1xyXG4gIHRhc2tzLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgbG9hZFByb2plY3RzKCk7XHJcbiAgZGVsZXRlUHJvamVjdFJpZ3RoKCk7XHJcblxyXG4gIC8qRklYTUU6IG9jY2hpbyBjaGUgcXVhbmRvIGNpIHNhcmFubm8gcG9pIGkgdGFza1xyXG4gIGFsbCdpbnRlcm5vIGRlbCBwcm9nZXR0bywgZG92cmFubm9cclxuICBlc3NlcmUgZWxpbWluYXRpIGluIGF1dG9tYXRpY28gYW5jaCdlc3NpKi9cclxuXHJcbiAgLypUT0RPOiBRdWFuZG8gZWxpbWluaSBpbCBwcm9nZXR0bywgcG9pIGlsIHJpZ3RoIG1haW5cclxuICBkYWxnaSB1biBpbm5lclRleHQgdnVvdG8gbyByb2JlIGNvc8OsXHJcbiAgYWx0cmltZW50aSBmYWxsbyBhbmRhcmUgc3UgaW5ib3gsbyBib2gsIHF1ZWwgY2hlIHRpIHBhcmVcclxuICAqL1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVOZXdMaShuYW1lKSB7XHJcbiAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XHJcbiAgbGkuY2xhc3NMaXN0LmFkZChcInByb2plY3RcIik7XHJcbiAgbGkuaW5uZXJIVE1MID0gYFxyXG4gIDxkaXY+XHJcbiAgPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1saXN0XCI+PC9pPlxyXG4gIDxwPiR7bmFtZS5wcm9qZWN0TmFtZX08L3A+XHJcbiAgPC9kaXY+XHJcbiAgYDtcclxuXHJcbiAgY29uc3QgaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xyXG4gIGkuY2xhc3NMaXN0LmFkZChcImZhLXNvbGlkXCIsIFwiZmEtdHJhc2gtY2FuXCIpO1xyXG4gIGkuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGRlbGV0ZVByb2plY3QpO1xyXG4gIGxpLmFwcGVuZENoaWxkKGkpO1xyXG5cclxuICBsaS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgbGlDbGljayk7XHJcbiAgbGkuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHNldEN1cnJlbnRQcm9qKG5hbWUpKTtcclxuICBsaS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZ2VuZXJhdGVQYWdlKTtcclxuICBwcm9qZWN0cy5hcHBlbmRDaGlsZChsaSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxpQ2xpY2soKSB7XHJcbiAgaWYgKCF0aGlzLmNsYXNzTmFtZS5pbmNsdWRlcyhcImFjdGl2ZVwiKSkge1xyXG4gICAgdGhpcy5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgbGlzdE9mTGkgPSBtYWluTGVmdC5xdWVyeVNlbGVjdG9yQWxsKFwibGlcIik7XHJcbiAgbGlzdE9mTGkuZm9yRWFjaCgoZWwpID0+IHtcclxuICAgIGlmIChlbCAhPT0gdGhpcykge1xyXG4gICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbG9hZFByb2plY3RzKCkge1xyXG4gIHByb2plY3RMaXN0LmZvckVhY2goKHByb2plY3QpID0+IHtcclxuICAgIGNyZWF0ZU5ld0xpKHByb2plY3QpO1xyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBvcGVuUHJvamVjdFBvcHVwKCkge1xyXG4gIHByb2plY3RQb3B1cC5jbGFzc0xpc3QucmVtb3ZlKFwiZC1ub25lXCIpO1xyXG4gIGFkZFByb2plY3QuY2xhc3NMaXN0LmFkZChcImQtbm9uZVwiKTtcclxuICBzZXRUaW1lb3V0KCgpID0+IHByb2plY3RJbnB1dC5mb2N1cygpLCAxMDApO1xyXG59XHJcblxyXG5mdW5jdGlvbiB0b2dnbGVQcm9qZWN0UG9wdXAoZSkge1xyXG4gIGUucHJldmVudERlZmF1bHQoKTtcclxuICBwcm9qZWN0UG9wdXAucmVzZXQoKTtcclxuICBwcm9qZWN0UG9wdXAuY2xhc3NMaXN0LmFkZChcImQtbm9uZVwiKTtcclxuICBhZGRQcm9qZWN0LmNsYXNzTGlzdC5yZW1vdmUoXCJkLW5vbmVcIik7XHJcbn1cclxuXHJcbmluYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBsaUNsaWNrKTtcclxuaW5ib3guYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGdlbmVyYXRlSW5ib3gpO1xyXG5pbmJveC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcmVtb3ZlSGFuZGxlclByb2plY3QpO1xyXG5pbmJveC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgbG9hZEluYm94VGFza3MpO1xyXG5cclxudG9kYXkuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGxpQ2xpY2spO1xyXG50b2RheS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZ2VuZXJhdGVUb2RheSk7XHJcblxyXG5hZGRQcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBvcGVuUHJvamVjdFBvcHVwKTtcclxucHJvamVjdEFkZEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYWRkUHJvamVjdFBvcHVwKTtcclxucHJvamVjdENhbmNlbEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdG9nZ2xlUHJvamVjdFBvcHVwKTtcclxucHJvamVjdFBvcHVwLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgdG9nZ2xlUHJvamVjdFBvcHVwKTtcclxuIiwiaW1wb3J0IHsgZHVwbGljYXRlSW5BcnJheSwgcHV0RE5vbmUsIHJlbW92ZUROb25lIH0gZnJvbSBcIi4vYnVpbGQtd2ViXCI7XHJcblxyXG5jb25zdCB0YXNrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFza3NcIik7XHJcblxyXG5jb25zdCBoMiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWFpbl9fcmlnaHQgPiBoMlwiKTtcclxuXHJcbmNvbnN0IGFkZFRhc2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC10YXNrXCIpO1xyXG5jb25zdCB0YXNrUG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC10YXNrLXBvcHVwXCIpO1xyXG5jb25zdCBtb2RUYXNrUG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1vZC10YXNrLXBvcHVwXCIpO1xyXG5jb25zdCB0YXNrQ2FuY2VsQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtdGFzay1wb3B1cCAuYnRuLWNhbmNlbFwiKTtcclxuY29uc3QgbW9kVGFza0NhbmNlbEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubW9kLXRhc2stcG9wdXAgLmJ0bi1jYW5jZWxcIik7XHJcbmNvbnN0IHRhc2tBZGRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC10YXNrLXBvcHVwIC5idG4tYWRkXCIpO1xyXG5jb25zdCBtb2RUYXNrQWRkQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tb2QtdGFzay1wb3B1cCAuYnRuLWFkZFwiKTtcclxuY29uc3QgdGFza05hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2stbmFtZVwiKTtcclxuY29uc3QgbW9kVGFza05hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2stbmFtZS1tb2RcIik7XHJcbmNvbnN0IHRhc2tEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrLWRhdGVcIik7XHJcbmNvbnN0IG1vZFRhc2tEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrLWRhdGUtbW9kXCIpO1xyXG5cclxuZXhwb3J0IGNvbnN0IGluYm94VGFza0xpc3QgPSBbXTtcclxuXHJcbmxldCBtb2RPYmo7XHJcbmxldCBjdXJyZW50UHJvajtcclxuXHJcbmNsYXNzIFRhc2sge1xyXG4gIGNvbnN0cnVjdG9yKG5hbWUsIGRhdGUsIHN0YXR1cywgcHJvaikge1xyXG4gICAgdGhpcy50YXNrTmFtZSA9IG5hbWU7XHJcbiAgICB0aGlzLnRhc2tEYXRlID0gZGF0ZTtcclxuICAgIHRoaXMuY2hlY2tlZCA9IHN0YXR1cztcclxuICAgIHRoaXMuZnJvbSA9IHByb2o7XHJcbiAgfVxyXG5cclxuICBzZXROYW1lKG5hbWUpIHtcclxuICAgIHRoaXMudGFza05hbWUgPSBuYW1lO1xyXG4gIH1cclxuXHJcbiAgZ2V0TmFtZSgpIHtcclxuICAgIHJldHVybiB0aGlzLnRhc2tOYW1lO1xyXG4gIH1cclxuXHJcbiAgc2V0RGF0ZShkYXRlKSB7XHJcbiAgICB0aGlzLnRhc2tEYXRlID0gZGF0ZTtcclxuICB9XHJcblxyXG4gIGdldERhdGUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy50YXNrRGF0ZTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRDdXJyZW50UHJvaihwcm9qKSB7XHJcbiAgY3VycmVudFByb2ogPSBwcm9qO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVQYWdlKCkge1xyXG4gIGgyLmlubmVyVGV4dCA9IGN1cnJlbnRQcm9qLnByb2plY3ROYW1lO1xyXG5cclxuICB0YXNrcy5pbm5lckhUTUwgPSBcIlwiO1xyXG4gIGxvYWRQcm9qZWN0VGFza3MoKTtcclxuXHJcbiAgcmVtb3ZlSGFuZGxlckluYm94KCk7XHJcbiAgcmVtb3ZlSGFuZGxlclByb2plY3QoKTtcclxuICByZW1vdmVETm9uZShhZGRUYXNrKTtcclxuICB0YXNrQWRkQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhZGRUYXNrUHJvamVjdCk7XHJcbiAgbW9kVGFza0FkZEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgbW9kVGFza0VkaXRCdG5Qcm9qZWN0cyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFRhc2tQcm9qZWN0KCkge1xyXG4gIGNvbnN0IG5hbWUgPSB0YXNrTmFtZS52YWx1ZTtcclxuICBjb25zdCBkYXRlID0gdGFza0RhdGUudmFsdWU7XHJcbiAgY29uc3QgcHJvaiA9IGN1cnJlbnRQcm9qO1xyXG4gIGNvbnN0IG9iak5hbWUgPSBjdXJyZW50UHJvai5nZXRQcm9qTmFtZSgpO1xyXG4gIGNvbnN0IGFycmF5ID0gcHJvai5nZXRMaXN0KCk7XHJcblxyXG4gIGlmIChuYW1lICYmIGRhdGUpIHtcclxuICAgIGNvbnN0IGNoZWNrRHVwbGljYXRlID0gZHVwbGljYXRlSW5BcnJheShuYW1lLCBhcnJheSwgXCJ0YXNrTmFtZVwiKTtcclxuXHJcbiAgICBpZiAoY2hlY2tEdXBsaWNhdGUpIHtcclxuICAgICAgYWxlcnQoXCJUYXNrIG5hbWVzIG11c3QgYmUgZGlmZmVyZW50IVwiKTtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiBvcGVuVGFza1BvcHVwKCksIDApO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZm9ybWF0RGF0ZSA9IGRhdGUuc3BsaXQoXCItXCIpLnJldmVyc2UoKS5qb2luKFwiL1wiKTtcclxuXHJcbiAgICBjb25zdCBteVRhc2sgPSBuZXcgVGFzayhuYW1lLCBmb3JtYXREYXRlLCBmYWxzZSwgb2JqTmFtZSk7XHJcblxyXG4gICAgcHJvai5hZGRUYXNrKG15VGFzayk7XHJcbiAgICBuZXdMaUZvclByb2plY3QobXlUYXNrKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZUluYm94KCkge1xyXG4gIGgyLmlubmVyVGV4dCA9IFwiSW5ib3hcIjtcclxuXHJcbiAgcmVtb3ZlRE5vbmUoYWRkVGFzayk7XHJcbiAgdGFza0FkZEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYWRkVGFza0luYm94KTtcclxuICBtb2RUYXNrQWRkQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBtb2RUYXNrRWRpdEJ0bik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFRhc2tJbmJveCgpIHtcclxuICBjb25zdCBuYW1lID0gdGFza05hbWUudmFsdWU7XHJcbiAgY29uc3QgZGF0ZSA9IHRhc2tEYXRlLnZhbHVlO1xyXG5cclxuICBpZiAobmFtZSAmJiBkYXRlKSB7XHJcbiAgICBjb25zdCBjaGVja0R1cGxpY2F0ZSA9IGR1cGxpY2F0ZUluQXJyYXkobmFtZSwgaW5ib3hUYXNrTGlzdCwgXCJ0YXNrTmFtZVwiKTtcclxuXHJcbiAgICBpZiAoY2hlY2tEdXBsaWNhdGUpIHtcclxuICAgICAgYWxlcnQoXCJUYXNrIG5hbWVzIG11c3QgYmUgZGlmZmVyZW50IVwiKTtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiBvcGVuVGFza1BvcHVwKCksIDApO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZm9ybWF0RGF0ZSA9IGRhdGUuc3BsaXQoXCItXCIpLnJldmVyc2UoKS5qb2luKFwiL1wiKTtcclxuXHJcbiAgICBjb25zdCBteVRhc2sgPSBuZXcgVGFzayhuYW1lLCBmb3JtYXREYXRlLCBmYWxzZSwgXCJJbmJveFwiKTtcclxuXHJcbiAgICBpbmJveFRhc2tMaXN0LnB1c2gobXlUYXNrKTtcclxuICAgIG5ld0xpKG15VGFzayk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZGVsZXRlUHJvamVjdFJpZ3RoKCkge1xyXG4gIGgyLmlubmVyVGV4dCA9IFwiXCI7XHJcbiAgcHV0RE5vbmUoYWRkVGFzayk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVIYW5kbGVySW5ib3goKSB7XHJcbiAgdGFza0FkZEJ0bi5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYWRkVGFza0luYm94KTtcclxuICBtb2RUYXNrQWRkQnRuLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBtb2RUYXNrRWRpdEJ0bik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVIYW5kbGVyUHJvamVjdCgpIHtcclxuICB0YXNrQWRkQnRuLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhZGRUYXNrUHJvamVjdCk7XHJcbiAgbW9kVGFza0FkZEJ0bi5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgbW9kVGFza0VkaXRCdG5Qcm9qZWN0cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBsb2FkSW5ib3hUYXNrcygpIHtcclxuICB0YXNrcy5pbm5lckhUTUwgPSBcIlwiO1xyXG5cclxuICBpbmJveFRhc2tMaXN0LmZvckVhY2goKHRhc2spID0+IHtcclxuICAgIG5ld0xpKHRhc2spO1xyXG4gIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbG9hZFByb2plY3RUYXNrcygpIHtcclxuICB0YXNrcy5pbm5lckhUTUwgPSBcIlwiO1xyXG5cclxuICBjdXJyZW50UHJvai5nZXRMaXN0KCkuZm9yRWFjaCgodGFzaykgPT4ge1xyXG4gICAgbmV3TGlGb3JQcm9qZWN0KHRhc2spO1xyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjaGVja0luZGV4VGFzayh0ZXh0KSB7XHJcbiAgY29uc3QgcmVzdWx0ID0gaW5ib3hUYXNrTGlzdC5maW5kSW5kZXgoKG9iaikgPT4gb2JqLnRhc2tOYW1lID09PSB0ZXh0KTtcclxuICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5mdW5jdGlvbiBjaGVja1Byb2plY3RUYXNrKHRleHQpIHtcclxuICBjb25zdCByZXN1bHQgPSBjdXJyZW50UHJvai5nZXRMaXN0KCkuZmluZEluZGV4KChvYmopID0+IG9iai50YXNrTmFtZSA9PT0gdGV4dCk7XHJcbiAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZnVuY3Rpb24gY2hlY2tMaShvYmosIGljb24pIHtcclxuICBpZiAob2JqLmNoZWNrZWQpIHtcclxuICAgIGljb24uY2xhc3NMaXN0LnJlbW92ZShcImZhLXNxdWFyZVwiKTtcclxuICAgIGljb24uY2xhc3NMaXN0LmFkZChcImZhLXNxdWFyZS1jaGVja1wiKTtcclxuICB9IGVsc2Uge1xyXG4gICAgaWNvbi5jbGFzc0xpc3QucmVtb3ZlKFwiZmEtc3F1YXJlLWNoZWNrXCIpO1xyXG4gICAgaWNvbi5jbGFzc0xpc3QuYWRkKFwiZmEtc3F1YXJlXCIpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY2hhbmdlVGFza1N0YXR1cygpIHtcclxuICBjb25zdCB0YXNrID0gdGhpcy5uZXh0U2libGluZy5pbm5lclRleHQ7XHJcbiAgY29uc3QgaW5kZXggPSBjaGVja0luZGV4VGFzayh0YXNrKTtcclxuICBjb25zdCBvYmogPSBpbmJveFRhc2tMaXN0W2luZGV4XTtcclxuICBvYmouY2hlY2tlZCA9ICFvYmouY2hlY2tlZDtcclxuXHJcbiAgY2hlY2tMaShvYmosIHRoaXMpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjaGFuZ2VUYXNrUHJvamVjdFN0YXR1cygpIHtcclxuICBjb25zdCB0YXNrID0gdGhpcy5uZXh0U2libGluZy5pbm5lclRleHQ7XHJcbiAgY29uc3QgaW5kZXggPSBjaGVja1Byb2plY3RUYXNrKHRhc2spO1xyXG4gIGNvbnN0IG9iaiA9IGN1cnJlbnRQcm9qLmdldExpc3QoKVtpbmRleF07XHJcbiAgb2JqLmNoZWNrZWQgPSAhb2JqLmNoZWNrZWQ7XHJcblxyXG4gIGNoZWNrTGkob2JqLCB0aGlzKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZGVsZXRlVGFzaygpIHtcclxuICBjb25zdCBsaSA9IHRoaXMucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xyXG4gIGNvbnN0IHRleHQgPSBsaS5xdWVyeVNlbGVjdG9yKFwiLm5hbWUtdGFzayA+IHBcIikuaW5uZXJUZXh0O1xyXG4gIGNvbnN0IGluZGV4ID0gY2hlY2tJbmRleFRhc2sodGV4dCk7XHJcbiAgaW5ib3hUYXNrTGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xyXG5cclxuICB0YXNrcy5pbm5lckhUTUwgPSBcIlwiO1xyXG4gIGxvYWRJbmJveFRhc2tzKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRlbGV0ZVRhc2tQcm9qZWN0KCkge1xyXG4gIGNvbnN0IGxpID0gdGhpcy5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XHJcbiAgY29uc3QgdGV4dCA9IGxpLnF1ZXJ5U2VsZWN0b3IoXCIubmFtZS10YXNrID4gcFwiKS5pbm5lclRleHQ7XHJcbiAgY29uc3QgaW5kZXggPSBjaGVja1Byb2plY3RUYXNrKHRleHQpO1xyXG4gIGN1cnJlbnRQcm9qLmdldExpc3QoKS5zcGxpY2UoaW5kZXgsIDEpO1xyXG5cclxuICB0YXNrcy5pbm5lckhUTUwgPSBcIlwiO1xyXG4gIGxvYWRQcm9qZWN0VGFza3MoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gbW9kVGFzaygpIHtcclxuICBjb25zdCBsaSA9IHRoaXMucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xyXG4gIGNvbnN0IHRleHQgPSBsaS5xdWVyeVNlbGVjdG9yKFwiLm5hbWUtdGFzayA+IHBcIikuaW5uZXJUZXh0O1xyXG4gIGNvbnN0IGluZGV4ID0gY2hlY2tJbmRleFRhc2sodGV4dCk7XHJcbiAgY29uc3Qgb2JqID0gaW5ib3hUYXNrTGlzdFtpbmRleF07XHJcbiAgbW9kT2JqID0gb2JqO1xyXG5cclxuICBjb25zdCBuYW1lID0gb2JqLmdldE5hbWUoKTtcclxuICBjb25zdCBkYXRlID0gb2JqLmdldERhdGUoKTtcclxuXHJcbiAgY29uc3QgZm9ybWF0RGF0ZSA9IGRhdGUuc3BsaXQoXCIvXCIpLnJldmVyc2UoKS5qb2luKFwiLVwiKTtcclxuXHJcbiAgb3Blbk1vZFRhc2tQb3B1cCgpO1xyXG5cclxuICBtb2RUYXNrTmFtZS52YWx1ZSA9IG5hbWU7XHJcbiAgbW9kVGFza0RhdGUudmFsdWUgPSBmb3JtYXREYXRlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBtb2RUYXNrUHJvamVjdHMoKSB7XHJcbiAgY29uc3QgbGkgPSB0aGlzLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcclxuICBjb25zdCB0ZXh0ID0gbGkucXVlcnlTZWxlY3RvcihcIi5uYW1lLXRhc2sgPiBwXCIpLmlubmVyVGV4dDtcclxuICBjb25zdCBpbmRleCA9IGNoZWNrUHJvamVjdFRhc2sodGV4dCk7XHJcbiAgY29uc3Qgb2JqID0gY3VycmVudFByb2ouZ2V0TGlzdCgpW2luZGV4XTtcclxuXHJcbiAgbW9kT2JqID0gb2JqO1xyXG5cclxuICBjb25zdCBuYW1lID0gb2JqLmdldE5hbWUoKTtcclxuICBjb25zdCBkYXRlID0gb2JqLmdldERhdGUoKTtcclxuXHJcbiAgY29uc3QgZm9ybWF0RGF0ZSA9IGRhdGUuc3BsaXQoXCIvXCIpLnJldmVyc2UoKS5qb2luKFwiLVwiKTtcclxuXHJcbiAgb3Blbk1vZFRhc2tQb3B1cCgpO1xyXG5cclxuICBtb2RUYXNrTmFtZS52YWx1ZSA9IG5hbWU7XHJcbiAgbW9kVGFza0RhdGUudmFsdWUgPSBmb3JtYXREYXRlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBtb2RUYXNrRWRpdEJ0bigpIHtcclxuICBjb25zdCBuYW1lID0gbW9kVGFza05hbWUudmFsdWU7XHJcbiAgY29uc3QgZGF0ZSA9IG1vZFRhc2tEYXRlLnZhbHVlO1xyXG5cclxuICBjb25zdCBmb3JtYXREYXRlID0gZGF0ZS5zcGxpdChcIi1cIikucmV2ZXJzZSgpLmpvaW4oXCIvXCIpO1xyXG5cclxuICBtb2RPYmouc2V0TmFtZShuYW1lKTtcclxuICBtb2RPYmouc2V0RGF0ZShmb3JtYXREYXRlKTtcclxuXHJcbiAgdGFza3MuaW5uZXJIVE1MID0gXCJcIjtcclxuICBsb2FkSW5ib3hUYXNrcygpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBtb2RUYXNrRWRpdEJ0blByb2plY3RzKCkge1xyXG4gIGNvbnN0IG5hbWUgPSBtb2RUYXNrTmFtZS52YWx1ZTtcclxuICBjb25zdCBkYXRlID0gbW9kVGFza0RhdGUudmFsdWU7XHJcblxyXG4gIGNvbnN0IGZvcm1hdERhdGUgPSBkYXRlLnNwbGl0KFwiLVwiKS5yZXZlcnNlKCkuam9pbihcIi9cIik7XHJcblxyXG4gIG1vZE9iai5zZXROYW1lKG5hbWUpO1xyXG4gIG1vZE9iai5zZXREYXRlKGZvcm1hdERhdGUpO1xyXG5cclxuICB0YXNrcy5pbm5lckhUTUwgPSBcIlwiO1xyXG4gIGxvYWRQcm9qZWN0VGFza3MoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gbmV3TGkob2JqKSB7XHJcbiAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XHJcbiAgbGkuY2xhc3NMaXN0LmFkZChcInRhc2tcIik7XHJcblxyXG4gIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgZGl2LmNsYXNzTGlzdC5hZGQoXCJuYW1lLXRhc2tcIik7XHJcblxyXG4gIGNvbnN0IGlTcXVhcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcclxuICBpU3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJmYS1zb2xpZFwiKTtcclxuXHJcbiAgLy9hdXRvLWNoZWNrZXJcclxuICBpZiAob2JqLmNoZWNrZWQpIHtcclxuICAgIGlTcXVhcmUuY2xhc3NMaXN0LmFkZChcImZhLXNxdWFyZS1jaGVja1wiKTtcclxuICB9IGVsc2Uge1xyXG4gICAgaVNxdWFyZS5jbGFzc0xpc3QuYWRkKFwiZmEtc3F1YXJlXCIpO1xyXG4gIH1cclxuXHJcbiAgaVNxdWFyZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2hhbmdlVGFza1N0YXR1cyk7XHJcblxyXG4gIGNvbnN0IHBOYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XHJcbiAgcE5hbWUuaW5uZXJUZXh0ID0gYCR7b2JqLnRhc2tOYW1lfWA7XHJcblxyXG4gIGRpdi5hcHBlbmRDaGlsZChpU3F1YXJlKTtcclxuICBkaXYuYXBwZW5kQ2hpbGQocE5hbWUpO1xyXG4gIGxpLmFwcGVuZENoaWxkKGRpdik7XHJcblxyXG4gIGNvbnN0IGRldGFpbHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gIGRldGFpbHMuY2xhc3NMaXN0LmFkZChcImRldGFpbHNcIik7XHJcblxyXG4gIGNvbnN0IHBEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XHJcbiAgcERhdGUuaW5uZXJUZXh0ID0gYCR7b2JqLnRhc2tEYXRlfWA7XHJcblxyXG4gIGNvbnN0IGlQZW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcclxuICBpUGVuLmNsYXNzTGlzdC5hZGQoXCJmYS1zb2xpZFwiLCBcImZhLXBlbi10by1zcXVhcmVcIik7XHJcbiAgaVBlbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgbW9kVGFzayk7XHJcblxyXG4gIGNvbnN0IGlUcmFzaCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xyXG4gIGlUcmFzaC5jbGFzc0xpc3QuYWRkKFwiZmEtc29saWRcIiwgXCJmYS10cmFzaC1jYW5cIik7XHJcbiAgaVRyYXNoLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBkZWxldGVUYXNrKTtcclxuXHJcbiAgZGV0YWlscy5hcHBlbmRDaGlsZChwRGF0ZSk7XHJcbiAgZGV0YWlscy5hcHBlbmRDaGlsZChpUGVuKTtcclxuICBkZXRhaWxzLmFwcGVuZENoaWxkKGlUcmFzaCk7XHJcbiAgbGkuYXBwZW5kQ2hpbGQoZGV0YWlscyk7XHJcblxyXG4gIHRhc2tzLmFwcGVuZENoaWxkKGxpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gbmV3TGlGb3JQcm9qZWN0KG9iaikge1xyXG4gIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xyXG4gIGxpLmNsYXNzTGlzdC5hZGQoXCJ0YXNrXCIpO1xyXG5cclxuICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gIGRpdi5jbGFzc0xpc3QuYWRkKFwibmFtZS10YXNrXCIpO1xyXG5cclxuICBjb25zdCBpU3F1YXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XHJcbiAgaVNxdWFyZS5jbGFzc0xpc3QuYWRkKFwiZmEtc29saWRcIik7XHJcblxyXG4gIC8vYXV0by1jaGVja2VyXHJcbiAgaWYgKG9iai5jaGVja2VkKSB7XHJcbiAgICBpU3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJmYS1zcXVhcmUtY2hlY2tcIik7XHJcbiAgfSBlbHNlIHtcclxuICAgIGlTcXVhcmUuY2xhc3NMaXN0LmFkZChcImZhLXNxdWFyZVwiKTtcclxuICB9XHJcblxyXG4gIGlTcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNoYW5nZVRhc2tQcm9qZWN0U3RhdHVzKTtcclxuXHJcbiAgY29uc3QgcE5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcclxuICBwTmFtZS5pbm5lclRleHQgPSBgJHtvYmoudGFza05hbWV9YDtcclxuXHJcbiAgZGl2LmFwcGVuZENoaWxkKGlTcXVhcmUpO1xyXG4gIGRpdi5hcHBlbmRDaGlsZChwTmFtZSk7XHJcbiAgbGkuYXBwZW5kQ2hpbGQoZGl2KTtcclxuXHJcbiAgY29uc3QgZGV0YWlscyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgZGV0YWlscy5jbGFzc0xpc3QuYWRkKFwiZGV0YWlsc1wiKTtcclxuXHJcbiAgY29uc3QgcERhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcclxuICBwRGF0ZS5pbm5lclRleHQgPSBgJHtvYmoudGFza0RhdGV9YDtcclxuXHJcbiAgY29uc3QgaVBlbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xyXG4gIGlQZW4uY2xhc3NMaXN0LmFkZChcImZhLXNvbGlkXCIsIFwiZmEtcGVuLXRvLXNxdWFyZVwiKTtcclxuICBpUGVuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBtb2RUYXNrUHJvamVjdHMpO1xyXG5cclxuICBjb25zdCBpVHJhc2ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcclxuICBpVHJhc2guY2xhc3NMaXN0LmFkZChcImZhLXNvbGlkXCIsIFwiZmEtdHJhc2gtY2FuXCIpO1xyXG4gIGlUcmFzaC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZGVsZXRlVGFza1Byb2plY3QpO1xyXG5cclxuICBkZXRhaWxzLmFwcGVuZENoaWxkKHBEYXRlKTtcclxuICBkZXRhaWxzLmFwcGVuZENoaWxkKGlQZW4pO1xyXG4gIGRldGFpbHMuYXBwZW5kQ2hpbGQoaVRyYXNoKTtcclxuICBsaS5hcHBlbmRDaGlsZChkZXRhaWxzKTtcclxuXHJcbiAgdGFza3MuYXBwZW5kQ2hpbGQobGkpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYWRkTGlzdGVuZXJzKCkge1xyXG4gIGFkZFRhc2suYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG9wZW5UYXNrUG9wdXApO1xyXG4gIHRhc2tDYW5jZWxCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRvZ2dsZVRhc2tQb3B1cCk7XHJcbiAgdGFza1BvcHVwLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgdG9nZ2xlVGFza1BvcHVwKTtcclxuXHJcbiAgbW9kVGFza0NhbmNlbEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdG9nZ2xlTW9kVGFza1BvcHVwKTtcclxuICBtb2RUYXNrUG9wdXAuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCB0b2dnbGVNb2RUYXNrUG9wdXApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBvcGVuVGFza1BvcHVwKCkge1xyXG4gIHRhc2tQb3B1cC5jbGFzc0xpc3QucmVtb3ZlKFwiZC1ub25lXCIpO1xyXG4gIGFkZFRhc2suY2xhc3NMaXN0LmFkZChcImQtbm9uZVwiKTtcclxuICBzZXRUaW1lb3V0KCgpID0+IHRhc2tOYW1lLmZvY3VzKCksIDEwMCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG9wZW5Nb2RUYXNrUG9wdXAoKSB7XHJcbiAgbW9kVGFza1BvcHVwLmNsYXNzTGlzdC5yZW1vdmUoXCJkLW5vbmVcIik7XHJcbiAgc2V0VGltZW91dCgoKSA9PiBtb2RUYXNrTmFtZS5mb2N1cygpLCAxMDApO1xyXG59XHJcblxyXG5mdW5jdGlvbiB0b2dnbGVUYXNrUG9wdXAoZSkge1xyXG4gIGUucHJldmVudERlZmF1bHQoKTtcclxuICB0YXNrUG9wdXAucmVzZXQoKTtcclxuICB0YXNrUG9wdXAuY2xhc3NMaXN0LmFkZChcImQtbm9uZVwiKTtcclxuICBhZGRUYXNrLmNsYXNzTGlzdC5yZW1vdmUoXCJkLW5vbmVcIik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRvZ2dsZU1vZFRhc2tQb3B1cChlKSB7XHJcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIG1vZFRhc2tQb3B1cC5yZXNldCgpO1xyXG4gIG1vZFRhc2tQb3B1cC5jbGFzc0xpc3QuYWRkKFwiZC1ub25lXCIpO1xyXG59XHJcbiIsImltcG9ydCB7IGxvYWRQcm9qZWN0cyB9IGZyb20gXCIuL2J1aWxkLW1haW5MZWZ0XCI7XHJcbmltcG9ydCB7XHJcbiAgZ2VuZXJhdGVJbmJveCxcclxuICBnZW5lcmF0ZVBhZ2UsXHJcbiAgYWRkTGlzdGVuZXJzLFxyXG4gIGxvYWRJbmJveFRhc2tzLFxyXG59IGZyb20gXCIuL2J1aWxkLW1haW5SaWdodFwiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHB1dEROb25lKGVsZW1lbnQpIHtcclxuICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJkLW5vbmVcIik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVETm9uZShlbGVtZW50KSB7XHJcbiAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiZC1ub25lXCIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZHVwbGljYXRlSW5BcnJheSh0ZXh0LCBhcnJheSwgb2JqS2V5KSB7XHJcbiAgbGV0IHJlc3VsdDtcclxuICBhcnJheS5mb3JFYWNoKChvYmopID0+IHtcclxuICAgIGlmIChvYmpbb2JqS2V5XSA9PT0gdGV4dCkge1xyXG4gICAgICByZXN1bHQgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmVzdWx0ID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhlYWRlckhhbWJ1cmdlck1lbnUoKSB7XHJcbiAgY29uc3QgbWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJoZWFkZXIgLmZhLWJhcnNcIik7XHJcbiAgY29uc3QgbWFpbkxlZnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21haW5fX2xlZnRcIik7XHJcblxyXG4gIGZ1bmN0aW9uIGNsaWNrSGFuZGxlcigpIHtcclxuICAgIG1haW5MZWZ0LmNsYXNzTGlzdC50b2dnbGUoXCJkLW5vbmVcIik7XHJcbiAgfVxyXG5cclxuICBtZW51LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjbGlja0hhbmRsZXIpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZEFsbCgpIHtcclxuICBoZWFkZXJIYW1idXJnZXJNZW51KCk7XHJcblxyXG4gIGxvYWRQcm9qZWN0cygpO1xyXG5cclxuICBhZGRMaXN0ZW5lcnMoKTtcclxuICBnZW5lcmF0ZUluYm94KCk7XHJcbiAgbG9hZEluYm94VGFza3MoKTtcclxufVxyXG4iLCJpbXBvcnQgeyBwdXRETm9uZSB9IGZyb20gXCIuL2J1aWxkLXdlYlwiO1xyXG5pbXBvcnQgeyBpbmJveFRhc2tMaXN0IH0gZnJvbSBcIi4vYnVpbGQtbWFpblJpZ2h0XCI7XHJcbmltcG9ydCB7IHByb2plY3RMaXN0IH0gZnJvbSBcIi4vYnVpbGQtbWFpbkxlZnRcIjtcclxuXHJcbmNvbnN0IFRPREFZX0RBVEUgPSBnZXRUb2RheSgpO1xyXG5cclxuY29uc3QgdGFza3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2tzXCIpO1xyXG5cclxuY29uc3QgaDIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21haW5fX3JpZ2h0ID4gaDJcIik7XHJcblxyXG5jb25zdCBhZGRUYXNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtdGFza1wiKTtcclxuLyoqXHJcbiAqIG9yYSBjaSBzZXJ2ZSBwcmVuZGVyZSB0dXR0aSBpIHRhc2sgZ2l1c3RpLCBpbiBiYXNlIGFsbGEgZGF0YSBkZWwgZ2lvcm5vXHJcbiAqL1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2VuZXJhdGVUb2RheSgpIHtcclxuICBoMi5pbm5lclRleHQgPSBcIlRvZGF5XCI7XHJcbiAgdGFza3MuaW5uZXJIVE1MID0gXCJcIjtcclxuXHJcbiAgY29uc3QgYXJyYXlJbmRleCA9IGZpbHRlcmVkSW5ib3goKTtcclxuICBjb25zdCBhcnJheVByb2plY3RzID0gZmlsdGVyZWRQcm9qZWN0cygpO1xyXG5cclxuICBhcnJheUluZGV4LmZvckVhY2goKHgpID0+IG5ld0xpVG9kYXkoeCkpO1xyXG4gIGFycmF5UHJvamVjdHMuZm9yRWFjaCgoeSkgPT4gbmV3TGlUb2RheSh5KSk7XHJcblxyXG4gIHB1dEROb25lKGFkZFRhc2spO1xyXG59XHJcblxyXG5mdW5jdGlvbiBmaWx0ZXJlZEluYm94KCkge1xyXG4gIHJldHVybiBpbmJveFRhc2tMaXN0LmZpbHRlcigodGFzaykgPT4gdGFzay50YXNrRGF0ZSA9PT0gVE9EQVlfREFURSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZpbHRlcmVkUHJvamVjdHMoKSB7XHJcbiAgY29uc3QgcmVzdWx0ID0gW107XHJcblxyXG4gIGNvbnN0IGxpc3QgPSBwcm9qZWN0TGlzdC5mb3JFYWNoKChwcm9qKSA9PiB7XHJcbiAgICBjb25zdCBsaXN0ID0gcHJvai5nZXRMaXN0KCk7XHJcblxyXG4gICAgbGlzdC5mb3JFYWNoKCh0YXNrKSA9PiAodGFzay50YXNrRGF0ZSA9PT0gVE9EQVlfREFURSA/IHJlc3VsdC5wdXNoKHRhc2spIDogbnVsbCkpO1xyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5mdW5jdGlvbiBuZXdMaVRvZGF5KG9iaikge1xyXG4gIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xyXG4gIGxpLmNsYXNzTGlzdC5hZGQoXCJ0YXNrXCIpO1xyXG5cclxuICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gIGRpdi5jbGFzc0xpc3QuYWRkKFwibmFtZS10YXNrXCIpO1xyXG5cclxuICBjb25zdCBpY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XHJcbiAgaWNvbi5jbGFzc0xpc3QuYWRkKFwiZmEtc29saWRcIiwgXCJmYS1hbmdsZS1yaWdodFwiKTtcclxuXHJcbiAgY29uc3QgcE5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcclxuICBwTmFtZS5pbm5lclRleHQgPSBgJHtvYmoudGFza05hbWV9YDtcclxuXHJcbiAgY29uc3QgcEZyb20gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcclxuICBwRnJvbS5jbGFzc0xpc3QuYWRkKFwidG9kYXktZnJvbVwiKTtcclxuICBwRnJvbS5pbm5lclRleHQgPSBgKCR7b2JqLmZyb219KWA7XHJcblxyXG4gIGRpdi5hcHBlbmRDaGlsZChpY29uKTtcclxuICBkaXYuYXBwZW5kQ2hpbGQocE5hbWUpO1xyXG4gIGRpdi5hcHBlbmRDaGlsZChwRnJvbSk7XHJcbiAgbGkuYXBwZW5kQ2hpbGQoZGl2KTtcclxuXHJcbiAgY29uc3QgZGV0YWlscyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgZGV0YWlscy5jbGFzc0xpc3QuYWRkKFwiZGV0YWlsc1wiKTtcclxuXHJcbiAgY29uc3QgcERhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcclxuICBwRGF0ZS5pbm5lclRleHQgPSBgJHtvYmoudGFza0RhdGV9YDtcclxuXHJcbiAgZGV0YWlscy5hcHBlbmRDaGlsZChwRGF0ZSk7XHJcbiAgbGkuYXBwZW5kQ2hpbGQoZGV0YWlscyk7XHJcblxyXG4gIHRhc2tzLmFwcGVuZENoaWxkKGxpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0VG9kYXkoKSB7XHJcbiAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgY29uc3QgZGF5ID0gZGF0ZS5nZXREYXRlKCk7XHJcbiAgY29uc3QgbW9udGggPSBkYXRlLmdldE1vbnRoKCkgKyAxO1xyXG4gIGNvbnN0IG5ld01vbnRoID0gbW9udGggPCAxMCA/IGAwJHttb250aH1gIDogbW9udGg7XHJcbiAgY29uc3QgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcclxuXHJcbiAgcmV0dXJuIGAke2RheX0vJHtuZXdNb250aH0vJHt5ZWFyfWA7XHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgYnVpbGRBbGwgZnJvbSBcIi4vYnVpbGQtd2ViXCI7XHJcblxyXG5idWlsZEFsbCgpO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=