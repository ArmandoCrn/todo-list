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

class Project {
  constructor(name) {
    this.projectName = name;
    this.taskList = [];
  }

  addTask(task) {
    this.taskList.push(task);
  }

  changeList(newList) {
    this.taskList = newList;
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

/*
Use the obj.projectName as a "key" for load the page 
of the tasks list
*/

const projectList = existLocalStorageProject();

function existLocalStorageProject() {
  let check = JSON.parse(localStorage.getItem("projectList")) ?? [];

  if (localStorage.hasOwnProperty("projectList") && check !== []) {
    check = JSON.parse(localStorage.getItem("projectList")).map((proj) =>
      Object.assign(new Project(), proj)
    );

    /*
    This is for change every task, in an object, with all the method, like getName()...
    whn we take the obj from the localStorage
    */
    check.forEach((proj) => {
      const list = proj.getList();
      const newList = [];

      for (let task of list) {
        const obj = Object.assign(new _build_mainRight__WEBPACK_IMPORTED_MODULE_2__.Task(), task);

        newList.push(obj);
      }

      proj.changeList(newList);
    });
  }

  return check;
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
    localStorage.setItem("projectList", JSON.stringify(projectList));
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
  localStorage.setItem("projectList", JSON.stringify(projectList));
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
/* harmony export */   "Task": () => (/* binding */ Task),
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
/* harmony import */ var _build_mainLeft__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./build-mainLeft */ "./src/build-mainLeft.js");



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

const inboxTaskList = existLocalStorageInbox();

/*
This is for change of inbox tasks in new tasks when they are inthe localStorage 
*/
function existLocalStorageInbox() {
  let check = JSON.parse(localStorage.getItem("inboxTaskList")) ?? [];

  if (localStorage.hasOwnProperty("inboxTaskList") && check !== []) {
    check = JSON.parse(localStorage.getItem("inboxTaskList")).map((task) =>
      Object.assign(new Task(), task)
    );
  }

  return check;
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
    localStorage.setItem("projectList", JSON.stringify(_build_mainLeft__WEBPACK_IMPORTED_MODULE_1__.projectList));
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
    localStorage.setItem("inboxTaskList", JSON.stringify(inboxTaskList));
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

  localStorage.setItem("inboxTaskList", JSON.stringify(inboxTaskList));
}

function loadProjectTasks() {
  tasks.innerHTML = "";

  currentProj.getList().forEach((task) => {
    newLiForProject(task);
  });

  localStorage.setItem("projectList", JSON.stringify(_build_mainLeft__WEBPACK_IMPORTED_MODULE_1__.projectList));
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
  localStorage.setItem("inboxTaskList", JSON.stringify(inboxTaskList));
}

function changeTaskProjectStatus() {
  const task = this.nextSibling.innerText;
  const index = checkProjectTask(task);
  const obj = currentProj.getList()[index];
  obj.checked = !obj.checked;

  checkLi(obj, this);
  localStorage.setItem("projectList", JSON.stringify(_build_mainLeft__WEBPACK_IMPORTED_MODULE_1__.projectList));
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
  console.log(obj);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLDREQUFnQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBLEVBQUUsb0RBQVE7QUFDVjtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLHFEQUFxRCx3REFBVztBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFEQUFxRCx3REFBVztBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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O1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05tQztBQUNuQztBQUNBLHNEQUFRIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vNC10b2RvLWxpc3QvLi9zcmMvYnVpbGQtbWFpbkxlZnQuanMiLCJ3ZWJwYWNrOi8vNC10b2RvLWxpc3QvLi9zcmMvYnVpbGQtbWFpblJpZ2h0LmpzIiwid2VicGFjazovLzQtdG9kby1saXN0Ly4vc3JjL2J1aWxkLXdlYi5qcyIsIndlYnBhY2s6Ly80LXRvZG8tbGlzdC8uL3NyYy90b2RheS5qcyIsIndlYnBhY2s6Ly80LXRvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly80LXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vNC10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly80LXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLzQtdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGR1cGxpY2F0ZUluQXJyYXkgfSBmcm9tIFwiLi9idWlsZC13ZWJcIjtcclxuaW1wb3J0IGdlbmVyYXRlVG9kYXkgZnJvbSBcIi4vdG9kYXlcIjtcclxuaW1wb3J0IHtcclxuICBUYXNrLFxyXG4gIGdlbmVyYXRlSW5ib3gsXHJcbiAgZ2VuZXJhdGVQYWdlLFxyXG4gIHJlbW92ZUhhbmRsZXJQcm9qZWN0LFxyXG4gIGxvYWRJbmJveFRhc2tzLFxyXG4gIHNldEN1cnJlbnRQcm9qLFxyXG4gIGRlbGV0ZVByb2plY3RSaWd0aCxcclxufSBmcm9tIFwiLi9idWlsZC1tYWluUmlnaHRcIjtcclxuXHJcbmNvbnN0IG1haW5MZWZ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtYWluX19sZWZ0XCIpO1xyXG5jb25zdCBpbmJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW5ib3hcIik7XHJcbmNvbnN0IHRvZGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RheVwiKTtcclxuXHJcbmNvbnN0IHByb2plY3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9qZWN0c1wiKTtcclxuY29uc3QgdGFza3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2tzXCIpO1xyXG5jb25zdCBhZGRQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtcHJvamVjdFwiKTtcclxuY29uc3QgcHJvamVjdFBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtcHJvamVjdC1wb3B1cFwiKTtcclxuY29uc3QgcHJvamVjdENhbmNlbEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXByb2plY3QtcG9wdXAgLmJ0bi1jYW5jZWxcIik7XHJcbmNvbnN0IHByb2plY3RBZGRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC1wcm9qZWN0LXBvcHVwIC5idG4tYWRkXCIpO1xyXG5jb25zdCBwcm9qZWN0SW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2plY3QtbmFtZVwiKTtcclxuXHJcbmNsYXNzIFByb2plY3Qge1xyXG4gIGNvbnN0cnVjdG9yKG5hbWUpIHtcclxuICAgIHRoaXMucHJvamVjdE5hbWUgPSBuYW1lO1xyXG4gICAgdGhpcy50YXNrTGlzdCA9IFtdO1xyXG4gIH1cclxuXHJcbiAgYWRkVGFzayh0YXNrKSB7XHJcbiAgICB0aGlzLnRhc2tMaXN0LnB1c2godGFzayk7XHJcbiAgfVxyXG5cclxuICBjaGFuZ2VMaXN0KG5ld0xpc3QpIHtcclxuICAgIHRoaXMudGFza0xpc3QgPSBuZXdMaXN0O1xyXG4gIH1cclxuXHJcbiAgZ2V0UHJvak5hbWUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5wcm9qZWN0TmFtZTtcclxuICB9XHJcblxyXG4gIGdldExpc3QoKSB7XHJcbiAgICByZXR1cm4gdGhpcy50YXNrTGlzdDtcclxuICB9XHJcblxyXG4gIGdldE9iaigpIHtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxufVxyXG5cclxuLypcclxuVXNlIHRoZSBvYmoucHJvamVjdE5hbWUgYXMgYSBcImtleVwiIGZvciBsb2FkIHRoZSBwYWdlIFxyXG5vZiB0aGUgdGFza3MgbGlzdFxyXG4qL1xyXG5cclxuZXhwb3J0IGNvbnN0IHByb2plY3RMaXN0ID0gZXhpc3RMb2NhbFN0b3JhZ2VQcm9qZWN0KCk7XHJcblxyXG5mdW5jdGlvbiBleGlzdExvY2FsU3RvcmFnZVByb2plY3QoKSB7XHJcbiAgbGV0IGNoZWNrID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInByb2plY3RMaXN0XCIpKSA/PyBbXTtcclxuXHJcbiAgaWYgKGxvY2FsU3RvcmFnZS5oYXNPd25Qcm9wZXJ0eShcInByb2plY3RMaXN0XCIpICYmIGNoZWNrICE9PSBbXSkge1xyXG4gICAgY2hlY2sgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwicHJvamVjdExpc3RcIikpLm1hcCgocHJvaikgPT5cclxuICAgICAgT2JqZWN0LmFzc2lnbihuZXcgUHJvamVjdCgpLCBwcm9qKVxyXG4gICAgKTtcclxuXHJcbiAgICAvKlxyXG4gICAgVGhpcyBpcyBmb3IgY2hhbmdlIGV2ZXJ5IHRhc2ssIGluIGFuIG9iamVjdCwgd2l0aCBhbGwgdGhlIG1ldGhvZCwgbGlrZSBnZXROYW1lKCkuLi5cclxuICAgIHdobiB3ZSB0YWtlIHRoZSBvYmogZnJvbSB0aGUgbG9jYWxTdG9yYWdlXHJcbiAgICAqL1xyXG4gICAgY2hlY2suZm9yRWFjaCgocHJvaikgPT4ge1xyXG4gICAgICBjb25zdCBsaXN0ID0gcHJvai5nZXRMaXN0KCk7XHJcbiAgICAgIGNvbnN0IG5ld0xpc3QgPSBbXTtcclxuXHJcbiAgICAgIGZvciAobGV0IHRhc2sgb2YgbGlzdCkge1xyXG4gICAgICAgIGNvbnN0IG9iaiA9IE9iamVjdC5hc3NpZ24obmV3IFRhc2soKSwgdGFzayk7XHJcblxyXG4gICAgICAgIG5ld0xpc3QucHVzaChvYmopO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBwcm9qLmNoYW5nZUxpc3QobmV3TGlzdCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHJldHVybiBjaGVjaztcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkUHJvamVjdFBvcHVwKCkge1xyXG4gIGNvbnN0IHByb2plY3ROYW1lID0gcHJvamVjdElucHV0LnZhbHVlO1xyXG4gIGlmIChwcm9qZWN0TmFtZSkge1xyXG4gICAgY29uc3QgY2hlY2tEdXBsaWNhdGUgPSBkdXBsaWNhdGVJbkFycmF5KHByb2plY3ROYW1lLCBwcm9qZWN0TGlzdCwgXCJwcm9qZWN0TmFtZVwiKTtcclxuXHJcbiAgICBpZiAoY2hlY2tEdXBsaWNhdGUpIHtcclxuICAgICAgYWxlcnQoXCJQcm9qZWN0IG5hbWVzIG11c3QgYmUgZGlmZmVyZW50IVwiKTtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiBvcGVuUHJvamVjdFBvcHVwKCksIDApO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbXlQcm9qZWN0ID0gbmV3IFByb2plY3QocHJvamVjdE5hbWUpO1xyXG5cclxuICAgIHByb2plY3RMaXN0LnB1c2gobXlQcm9qZWN0KTtcclxuICAgIGNyZWF0ZU5ld0xpKG15UHJvamVjdCk7XHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInByb2plY3RMaXN0XCIsIEpTT04uc3RyaW5naWZ5KHByb2plY3RMaXN0KSk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjaGVja0ZvckluZGV4KHRleHQpIHtcclxuICBjb25zdCByZXN1bHQgPSBwcm9qZWN0TGlzdC5maW5kSW5kZXgoKG9iaikgPT4gb2JqLnByb2plY3ROYW1lID09PSB0ZXh0KTtcclxuICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5mdW5jdGlvbiBkZWxldGVQcm9qZWN0KGUpIHtcclxuICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gIGNvbnN0IGxpID0gdGhpcy5wYXJlbnRFbGVtZW50O1xyXG4gIGNvbnN0IHRleHQgPSBsaS5xdWVyeVNlbGVjdG9yKFwiZGl2ID4gcFwiKS5pbm5lclRleHQ7XHJcbiAgY29uc3QgaW5kZXggPSBjaGVja0ZvckluZGV4KHRleHQpO1xyXG4gIGNvbnN0IHRyYXNoID0gcHJvamVjdExpc3Quc3BsaWNlKGluZGV4LCAxKTtcclxuICBkZWxldGUgdHJhc2hbMF07XHJcblxyXG4gIHByb2plY3RzLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgdGFza3MuaW5uZXJIVE1MID0gXCJcIjtcclxuICBsb2FkUHJvamVjdHMoKTtcclxuICBkZWxldGVQcm9qZWN0UmlndGgoKTtcclxuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInByb2plY3RMaXN0XCIsIEpTT04uc3RyaW5naWZ5KHByb2plY3RMaXN0KSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZU5ld0xpKG5hbWUpIHtcclxuICBjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcclxuICBsaS5jbGFzc0xpc3QuYWRkKFwicHJvamVjdFwiKTtcclxuICBsaS5pbm5lckhUTUwgPSBgXHJcbiAgPGRpdj5cclxuICA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLWxpc3RcIj48L2k+XHJcbiAgPHA+JHtuYW1lLnByb2plY3ROYW1lfTwvcD5cclxuICA8L2Rpdj5cclxuICBgO1xyXG5cclxuICBjb25zdCBpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XHJcbiAgaS5jbGFzc0xpc3QuYWRkKFwiZmEtc29saWRcIiwgXCJmYS10cmFzaC1jYW5cIik7XHJcbiAgaS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZGVsZXRlUHJvamVjdCk7XHJcbiAgbGkuYXBwZW5kQ2hpbGQoaSk7XHJcblxyXG4gIGxpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBsaUNsaWNrKTtcclxuICBsaS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gc2V0Q3VycmVudFByb2oobmFtZSkpO1xyXG4gIGxpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBnZW5lcmF0ZVBhZ2UpO1xyXG4gIHByb2plY3RzLmFwcGVuZENoaWxkKGxpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gbGlDbGljaygpIHtcclxuICBpZiAoIXRoaXMuY2xhc3NOYW1lLmluY2x1ZGVzKFwiYWN0aXZlXCIpKSB7XHJcbiAgICB0aGlzLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgfVxyXG5cclxuICBjb25zdCBsaXN0T2ZMaSA9IG1haW5MZWZ0LnF1ZXJ5U2VsZWN0b3JBbGwoXCJsaVwiKTtcclxuICBsaXN0T2ZMaS5mb3JFYWNoKChlbCkgPT4ge1xyXG4gICAgaWYgKGVsICE9PSB0aGlzKSB7XHJcbiAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBsb2FkUHJvamVjdHMoKSB7XHJcbiAgcHJvamVjdExpc3QuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xyXG4gICAgY3JlYXRlTmV3TGkocHJvamVjdCk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG9wZW5Qcm9qZWN0UG9wdXAoKSB7XHJcbiAgcHJvamVjdFBvcHVwLmNsYXNzTGlzdC5yZW1vdmUoXCJkLW5vbmVcIik7XHJcbiAgYWRkUHJvamVjdC5jbGFzc0xpc3QuYWRkKFwiZC1ub25lXCIpO1xyXG4gIHNldFRpbWVvdXQoKCkgPT4gcHJvamVjdElucHV0LmZvY3VzKCksIDEwMCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRvZ2dsZVByb2plY3RQb3B1cChlKSB7XHJcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIHByb2plY3RQb3B1cC5yZXNldCgpO1xyXG4gIHByb2plY3RQb3B1cC5jbGFzc0xpc3QuYWRkKFwiZC1ub25lXCIpO1xyXG4gIGFkZFByb2plY3QuY2xhc3NMaXN0LnJlbW92ZShcImQtbm9uZVwiKTtcclxufVxyXG5cclxuaW5ib3guYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGxpQ2xpY2spO1xyXG5pbmJveC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZ2VuZXJhdGVJbmJveCk7XHJcbmluYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCByZW1vdmVIYW5kbGVyUHJvamVjdCk7XHJcbmluYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBsb2FkSW5ib3hUYXNrcyk7XHJcblxyXG50b2RheS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgbGlDbGljayk7XHJcbnRvZGF5LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBnZW5lcmF0ZVRvZGF5KTtcclxuXHJcbmFkZFByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG9wZW5Qcm9qZWN0UG9wdXApO1xyXG5wcm9qZWN0QWRkQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhZGRQcm9qZWN0UG9wdXApO1xyXG5wcm9qZWN0Q2FuY2VsQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0b2dnbGVQcm9qZWN0UG9wdXApO1xyXG5wcm9qZWN0UG9wdXAuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCB0b2dnbGVQcm9qZWN0UG9wdXApO1xyXG4iLCJpbXBvcnQgeyBkdXBsaWNhdGVJbkFycmF5LCBwdXRETm9uZSwgcmVtb3ZlRE5vbmUgfSBmcm9tIFwiLi9idWlsZC13ZWJcIjtcclxuaW1wb3J0IHsgcHJvamVjdExpc3QgfSBmcm9tIFwiLi9idWlsZC1tYWluTGVmdFwiO1xyXG5cclxuY29uc3QgdGFza3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2tzXCIpO1xyXG5cclxuY29uc3QgaDIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21haW5fX3JpZ2h0ID4gaDJcIik7XHJcblxyXG5jb25zdCBhZGRUYXNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtdGFza1wiKTtcclxuY29uc3QgdGFza1BvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtdGFzay1wb3B1cFwiKTtcclxuY29uc3QgbW9kVGFza1BvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tb2QtdGFzay1wb3B1cFwiKTtcclxuY29uc3QgdGFza0NhbmNlbEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXRhc2stcG9wdXAgLmJ0bi1jYW5jZWxcIik7XHJcbmNvbnN0IG1vZFRhc2tDYW5jZWxCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1vZC10YXNrLXBvcHVwIC5idG4tY2FuY2VsXCIpO1xyXG5jb25zdCB0YXNrQWRkQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtdGFzay1wb3B1cCAuYnRuLWFkZFwiKTtcclxuY29uc3QgbW9kVGFza0FkZEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubW9kLXRhc2stcG9wdXAgLmJ0bi1hZGRcIik7XHJcbmNvbnN0IHRhc2tOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrLW5hbWVcIik7XHJcbmNvbnN0IG1vZFRhc2tOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrLW5hbWUtbW9kXCIpO1xyXG5jb25zdCB0YXNrRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFzay1kYXRlXCIpO1xyXG5jb25zdCBtb2RUYXNrRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFzay1kYXRlLW1vZFwiKTtcclxuXHJcbmxldCBtb2RPYmo7XHJcbmxldCBjdXJyZW50UHJvajtcclxuXHJcbmV4cG9ydCBjbGFzcyBUYXNrIHtcclxuICBjb25zdHJ1Y3RvcihuYW1lLCBkYXRlLCBzdGF0dXMsIHByb2opIHtcclxuICAgIHRoaXMudGFza05hbWUgPSBuYW1lO1xyXG4gICAgdGhpcy50YXNrRGF0ZSA9IGRhdGU7XHJcbiAgICB0aGlzLmNoZWNrZWQgPSBzdGF0dXM7XHJcbiAgICB0aGlzLmZyb20gPSBwcm9qO1xyXG4gIH1cclxuXHJcbiAgc2V0TmFtZShuYW1lKSB7XHJcbiAgICB0aGlzLnRhc2tOYW1lID0gbmFtZTtcclxuICB9XHJcblxyXG4gIGdldE5hbWUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy50YXNrTmFtZTtcclxuICB9XHJcblxyXG4gIHNldERhdGUoZGF0ZSkge1xyXG4gICAgdGhpcy50YXNrRGF0ZSA9IGRhdGU7XHJcbiAgfVxyXG5cclxuICBnZXREYXRlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMudGFza0RhdGU7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgaW5ib3hUYXNrTGlzdCA9IGV4aXN0TG9jYWxTdG9yYWdlSW5ib3goKTtcclxuXHJcbi8qXHJcblRoaXMgaXMgZm9yIGNoYW5nZSBvZiBpbmJveCB0YXNrcyBpbiBuZXcgdGFza3Mgd2hlbiB0aGV5IGFyZSBpbnRoZSBsb2NhbFN0b3JhZ2UgXHJcbiovXHJcbmZ1bmN0aW9uIGV4aXN0TG9jYWxTdG9yYWdlSW5ib3goKSB7XHJcbiAgbGV0IGNoZWNrID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImluYm94VGFza0xpc3RcIikpID8/IFtdO1xyXG5cclxuICBpZiAobG9jYWxTdG9yYWdlLmhhc093blByb3BlcnR5KFwiaW5ib3hUYXNrTGlzdFwiKSAmJiBjaGVjayAhPT0gW10pIHtcclxuICAgIGNoZWNrID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImluYm94VGFza0xpc3RcIikpLm1hcCgodGFzaykgPT5cclxuICAgICAgT2JqZWN0LmFzc2lnbihuZXcgVGFzaygpLCB0YXNrKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBjaGVjaztcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNldEN1cnJlbnRQcm9qKHByb2opIHtcclxuICBjdXJyZW50UHJvaiA9IHByb2o7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZVBhZ2UoKSB7XHJcbiAgaDIuaW5uZXJUZXh0ID0gY3VycmVudFByb2oucHJvamVjdE5hbWU7XHJcblxyXG4gIHRhc2tzLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgbG9hZFByb2plY3RUYXNrcygpO1xyXG5cclxuICByZW1vdmVIYW5kbGVySW5ib3goKTtcclxuICByZW1vdmVIYW5kbGVyUHJvamVjdCgpO1xyXG4gIHJlbW92ZUROb25lKGFkZFRhc2spO1xyXG4gIHRhc2tBZGRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFkZFRhc2tQcm9qZWN0KTtcclxuICBtb2RUYXNrQWRkQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBtb2RUYXNrRWRpdEJ0blByb2plY3RzKTtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkVGFza1Byb2plY3QoKSB7XHJcbiAgY29uc3QgbmFtZSA9IHRhc2tOYW1lLnZhbHVlO1xyXG4gIGNvbnN0IGRhdGUgPSB0YXNrRGF0ZS52YWx1ZTtcclxuICBjb25zdCBwcm9qID0gY3VycmVudFByb2o7XHJcbiAgY29uc3Qgb2JqTmFtZSA9IGN1cnJlbnRQcm9qLmdldFByb2pOYW1lKCk7XHJcbiAgY29uc3QgYXJyYXkgPSBwcm9qLmdldExpc3QoKTtcclxuXHJcbiAgaWYgKG5hbWUgJiYgZGF0ZSkge1xyXG4gICAgY29uc3QgY2hlY2tEdXBsaWNhdGUgPSBkdXBsaWNhdGVJbkFycmF5KG5hbWUsIGFycmF5LCBcInRhc2tOYW1lXCIpO1xyXG5cclxuICAgIGlmIChjaGVja0R1cGxpY2F0ZSkge1xyXG4gICAgICBhbGVydChcIlRhc2sgbmFtZXMgbXVzdCBiZSBkaWZmZXJlbnQhXCIpO1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IG9wZW5UYXNrUG9wdXAoKSwgMCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBmb3JtYXREYXRlID0gZGF0ZS5zcGxpdChcIi1cIikucmV2ZXJzZSgpLmpvaW4oXCIvXCIpO1xyXG5cclxuICAgIGNvbnN0IG15VGFzayA9IG5ldyBUYXNrKG5hbWUsIGZvcm1hdERhdGUsIGZhbHNlLCBvYmpOYW1lKTtcclxuXHJcbiAgICBwcm9qLmFkZFRhc2sobXlUYXNrKTtcclxuICAgIG5ld0xpRm9yUHJvamVjdChteVRhc2spO1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJwcm9qZWN0TGlzdFwiLCBKU09OLnN0cmluZ2lmeShwcm9qZWN0TGlzdCkpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlSW5ib3goKSB7XHJcbiAgaDIuaW5uZXJUZXh0ID0gXCJJbmJveFwiO1xyXG5cclxuICByZW1vdmVETm9uZShhZGRUYXNrKTtcclxuICB0YXNrQWRkQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhZGRUYXNrSW5ib3gpO1xyXG4gIG1vZFRhc2tBZGRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG1vZFRhc2tFZGl0QnRuKTtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkVGFza0luYm94KCkge1xyXG4gIGNvbnN0IG5hbWUgPSB0YXNrTmFtZS52YWx1ZTtcclxuICBjb25zdCBkYXRlID0gdGFza0RhdGUudmFsdWU7XHJcblxyXG4gIGlmIChuYW1lICYmIGRhdGUpIHtcclxuICAgIGNvbnN0IGNoZWNrRHVwbGljYXRlID0gZHVwbGljYXRlSW5BcnJheShuYW1lLCBpbmJveFRhc2tMaXN0LCBcInRhc2tOYW1lXCIpO1xyXG5cclxuICAgIGlmIChjaGVja0R1cGxpY2F0ZSkge1xyXG4gICAgICBhbGVydChcIlRhc2sgbmFtZXMgbXVzdCBiZSBkaWZmZXJlbnQhXCIpO1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IG9wZW5UYXNrUG9wdXAoKSwgMCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBmb3JtYXREYXRlID0gZGF0ZS5zcGxpdChcIi1cIikucmV2ZXJzZSgpLmpvaW4oXCIvXCIpO1xyXG5cclxuICAgIGNvbnN0IG15VGFzayA9IG5ldyBUYXNrKG5hbWUsIGZvcm1hdERhdGUsIGZhbHNlLCBcIkluYm94XCIpO1xyXG5cclxuICAgIGluYm94VGFza0xpc3QucHVzaChteVRhc2spO1xyXG4gICAgbmV3TGkobXlUYXNrKTtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiaW5ib3hUYXNrTGlzdFwiLCBKU09OLnN0cmluZ2lmeShpbmJveFRhc2tMaXN0KSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZGVsZXRlUHJvamVjdFJpZ3RoKCkge1xyXG4gIGgyLmlubmVyVGV4dCA9IFwiXCI7XHJcbiAgcHV0RE5vbmUoYWRkVGFzayk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVIYW5kbGVySW5ib3goKSB7XHJcbiAgdGFza0FkZEJ0bi5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYWRkVGFza0luYm94KTtcclxuICBtb2RUYXNrQWRkQnRuLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBtb2RUYXNrRWRpdEJ0bik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVIYW5kbGVyUHJvamVjdCgpIHtcclxuICB0YXNrQWRkQnRuLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhZGRUYXNrUHJvamVjdCk7XHJcbiAgbW9kVGFza0FkZEJ0bi5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgbW9kVGFza0VkaXRCdG5Qcm9qZWN0cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBsb2FkSW5ib3hUYXNrcygpIHtcclxuICB0YXNrcy5pbm5lckhUTUwgPSBcIlwiO1xyXG5cclxuICBpbmJveFRhc2tMaXN0LmZvckVhY2goKHRhc2spID0+IHtcclxuICAgIG5ld0xpKHRhc2spO1xyXG4gIH0pO1xyXG5cclxuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImluYm94VGFza0xpc3RcIiwgSlNPTi5zdHJpbmdpZnkoaW5ib3hUYXNrTGlzdCkpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbG9hZFByb2plY3RUYXNrcygpIHtcclxuICB0YXNrcy5pbm5lckhUTUwgPSBcIlwiO1xyXG5cclxuICBjdXJyZW50UHJvai5nZXRMaXN0KCkuZm9yRWFjaCgodGFzaykgPT4ge1xyXG4gICAgbmV3TGlGb3JQcm9qZWN0KHRhc2spO1xyXG4gIH0pO1xyXG5cclxuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInByb2plY3RMaXN0XCIsIEpTT04uc3RyaW5naWZ5KHByb2plY3RMaXN0KSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNoZWNrSW5kZXhUYXNrKHRleHQpIHtcclxuICBjb25zdCByZXN1bHQgPSBpbmJveFRhc2tMaXN0LmZpbmRJbmRleCgob2JqKSA9PiBvYmoudGFza05hbWUgPT09IHRleHQpO1xyXG4gIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNoZWNrUHJvamVjdFRhc2sodGV4dCkge1xyXG4gIGNvbnN0IHJlc3VsdCA9IGN1cnJlbnRQcm9qLmdldExpc3QoKS5maW5kSW5kZXgoKG9iaikgPT4gb2JqLnRhc2tOYW1lID09PSB0ZXh0KTtcclxuICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5mdW5jdGlvbiBjaGVja0xpKG9iaiwgaWNvbikge1xyXG4gIGlmIChvYmouY2hlY2tlZCkge1xyXG4gICAgaWNvbi5jbGFzc0xpc3QucmVtb3ZlKFwiZmEtc3F1YXJlXCIpO1xyXG4gICAgaWNvbi5jbGFzc0xpc3QuYWRkKFwiZmEtc3F1YXJlLWNoZWNrXCIpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBpY29uLmNsYXNzTGlzdC5yZW1vdmUoXCJmYS1zcXVhcmUtY2hlY2tcIik7XHJcbiAgICBpY29uLmNsYXNzTGlzdC5hZGQoXCJmYS1zcXVhcmVcIik7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjaGFuZ2VUYXNrU3RhdHVzKCkge1xyXG4gIGNvbnN0IHRhc2sgPSB0aGlzLm5leHRTaWJsaW5nLmlubmVyVGV4dDtcclxuICBjb25zdCBpbmRleCA9IGNoZWNrSW5kZXhUYXNrKHRhc2spO1xyXG4gIGNvbnN0IG9iaiA9IGluYm94VGFza0xpc3RbaW5kZXhdO1xyXG4gIG9iai5jaGVja2VkID0gIW9iai5jaGVja2VkO1xyXG5cclxuICBjaGVja0xpKG9iaiwgdGhpcyk7XHJcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJpbmJveFRhc2tMaXN0XCIsIEpTT04uc3RyaW5naWZ5KGluYm94VGFza0xpc3QpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2hhbmdlVGFza1Byb2plY3RTdGF0dXMoKSB7XHJcbiAgY29uc3QgdGFzayA9IHRoaXMubmV4dFNpYmxpbmcuaW5uZXJUZXh0O1xyXG4gIGNvbnN0IGluZGV4ID0gY2hlY2tQcm9qZWN0VGFzayh0YXNrKTtcclxuICBjb25zdCBvYmogPSBjdXJyZW50UHJvai5nZXRMaXN0KClbaW5kZXhdO1xyXG4gIG9iai5jaGVja2VkID0gIW9iai5jaGVja2VkO1xyXG5cclxuICBjaGVja0xpKG9iaiwgdGhpcyk7XHJcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJwcm9qZWN0TGlzdFwiLCBKU09OLnN0cmluZ2lmeShwcm9qZWN0TGlzdCkpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkZWxldGVUYXNrKCkge1xyXG4gIGNvbnN0IGxpID0gdGhpcy5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XHJcbiAgY29uc3QgdGV4dCA9IGxpLnF1ZXJ5U2VsZWN0b3IoXCIubmFtZS10YXNrID4gcFwiKS5pbm5lclRleHQ7XHJcbiAgY29uc3QgaW5kZXggPSBjaGVja0luZGV4VGFzayh0ZXh0KTtcclxuICBpbmJveFRhc2tMaXN0LnNwbGljZShpbmRleCwgMSk7XHJcblxyXG4gIHRhc2tzLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgbG9hZEluYm94VGFza3MoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZGVsZXRlVGFza1Byb2plY3QoKSB7XHJcbiAgY29uc3QgbGkgPSB0aGlzLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcclxuICBjb25zdCB0ZXh0ID0gbGkucXVlcnlTZWxlY3RvcihcIi5uYW1lLXRhc2sgPiBwXCIpLmlubmVyVGV4dDtcclxuICBjb25zdCBpbmRleCA9IGNoZWNrUHJvamVjdFRhc2sodGV4dCk7XHJcbiAgY3VycmVudFByb2ouZ2V0TGlzdCgpLnNwbGljZShpbmRleCwgMSk7XHJcblxyXG4gIHRhc2tzLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgbG9hZFByb2plY3RUYXNrcygpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBtb2RUYXNrKCkge1xyXG4gIGNvbnN0IGxpID0gdGhpcy5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XHJcbiAgY29uc3QgdGV4dCA9IGxpLnF1ZXJ5U2VsZWN0b3IoXCIubmFtZS10YXNrID4gcFwiKS5pbm5lclRleHQ7XHJcbiAgY29uc3QgaW5kZXggPSBjaGVja0luZGV4VGFzayh0ZXh0KTtcclxuICBjb25zdCBvYmogPSBpbmJveFRhc2tMaXN0W2luZGV4XTtcclxuICBtb2RPYmogPSBvYmo7XHJcbiAgY29uc29sZS5sb2cob2JqKTtcclxuXHJcbiAgY29uc3QgbmFtZSA9IG9iai5nZXROYW1lKCk7XHJcbiAgY29uc3QgZGF0ZSA9IG9iai5nZXREYXRlKCk7XHJcblxyXG4gIGNvbnN0IGZvcm1hdERhdGUgPSBkYXRlLnNwbGl0KFwiL1wiKS5yZXZlcnNlKCkuam9pbihcIi1cIik7XHJcblxyXG4gIG9wZW5Nb2RUYXNrUG9wdXAoKTtcclxuXHJcbiAgbW9kVGFza05hbWUudmFsdWUgPSBuYW1lO1xyXG4gIG1vZFRhc2tEYXRlLnZhbHVlID0gZm9ybWF0RGF0ZTtcclxufVxyXG5cclxuZnVuY3Rpb24gbW9kVGFza1Byb2plY3RzKCkge1xyXG4gIGNvbnN0IGxpID0gdGhpcy5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XHJcbiAgY29uc3QgdGV4dCA9IGxpLnF1ZXJ5U2VsZWN0b3IoXCIubmFtZS10YXNrID4gcFwiKS5pbm5lclRleHQ7XHJcbiAgY29uc3QgaW5kZXggPSBjaGVja1Byb2plY3RUYXNrKHRleHQpO1xyXG4gIGNvbnN0IG9iaiA9IGN1cnJlbnRQcm9qLmdldExpc3QoKVtpbmRleF07XHJcblxyXG4gIG1vZE9iaiA9IG9iajtcclxuXHJcbiAgY29uc3QgbmFtZSA9IG9iai5nZXROYW1lKCk7XHJcbiAgY29uc3QgZGF0ZSA9IG9iai5nZXREYXRlKCk7XHJcblxyXG4gIGNvbnN0IGZvcm1hdERhdGUgPSBkYXRlLnNwbGl0KFwiL1wiKS5yZXZlcnNlKCkuam9pbihcIi1cIik7XHJcblxyXG4gIG9wZW5Nb2RUYXNrUG9wdXAoKTtcclxuXHJcbiAgbW9kVGFza05hbWUudmFsdWUgPSBuYW1lO1xyXG4gIG1vZFRhc2tEYXRlLnZhbHVlID0gZm9ybWF0RGF0ZTtcclxufVxyXG5cclxuZnVuY3Rpb24gbW9kVGFza0VkaXRCdG4oKSB7XHJcbiAgY29uc3QgbmFtZSA9IG1vZFRhc2tOYW1lLnZhbHVlO1xyXG4gIGNvbnN0IGRhdGUgPSBtb2RUYXNrRGF0ZS52YWx1ZTtcclxuXHJcbiAgY29uc3QgZm9ybWF0RGF0ZSA9IGRhdGUuc3BsaXQoXCItXCIpLnJldmVyc2UoKS5qb2luKFwiL1wiKTtcclxuXHJcbiAgbW9kT2JqLnNldE5hbWUobmFtZSk7XHJcbiAgbW9kT2JqLnNldERhdGUoZm9ybWF0RGF0ZSk7XHJcblxyXG4gIHRhc2tzLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgbG9hZEluYm94VGFza3MoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gbW9kVGFza0VkaXRCdG5Qcm9qZWN0cygpIHtcclxuICBjb25zdCBuYW1lID0gbW9kVGFza05hbWUudmFsdWU7XHJcbiAgY29uc3QgZGF0ZSA9IG1vZFRhc2tEYXRlLnZhbHVlO1xyXG5cclxuICBjb25zdCBmb3JtYXREYXRlID0gZGF0ZS5zcGxpdChcIi1cIikucmV2ZXJzZSgpLmpvaW4oXCIvXCIpO1xyXG5cclxuICBtb2RPYmouc2V0TmFtZShuYW1lKTtcclxuICBtb2RPYmouc2V0RGF0ZShmb3JtYXREYXRlKTtcclxuXHJcbiAgdGFza3MuaW5uZXJIVE1MID0gXCJcIjtcclxuICBsb2FkUHJvamVjdFRhc2tzKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG5ld0xpKG9iaikge1xyXG4gIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xyXG4gIGxpLmNsYXNzTGlzdC5hZGQoXCJ0YXNrXCIpO1xyXG5cclxuICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gIGRpdi5jbGFzc0xpc3QuYWRkKFwibmFtZS10YXNrXCIpO1xyXG5cclxuICBjb25zdCBpU3F1YXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XHJcbiAgaVNxdWFyZS5jbGFzc0xpc3QuYWRkKFwiZmEtc29saWRcIik7XHJcblxyXG4gIC8vYXV0by1jaGVja2VyXHJcbiAgaWYgKG9iai5jaGVja2VkKSB7XHJcbiAgICBpU3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJmYS1zcXVhcmUtY2hlY2tcIik7XHJcbiAgfSBlbHNlIHtcclxuICAgIGlTcXVhcmUuY2xhc3NMaXN0LmFkZChcImZhLXNxdWFyZVwiKTtcclxuICB9XHJcblxyXG4gIGlTcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNoYW5nZVRhc2tTdGF0dXMpO1xyXG5cclxuICBjb25zdCBwTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xyXG4gIHBOYW1lLmlubmVyVGV4dCA9IGAke29iai50YXNrTmFtZX1gO1xyXG5cclxuICBkaXYuYXBwZW5kQ2hpbGQoaVNxdWFyZSk7XHJcbiAgZGl2LmFwcGVuZENoaWxkKHBOYW1lKTtcclxuICBsaS5hcHBlbmRDaGlsZChkaXYpO1xyXG5cclxuICBjb25zdCBkZXRhaWxzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICBkZXRhaWxzLmNsYXNzTGlzdC5hZGQoXCJkZXRhaWxzXCIpO1xyXG5cclxuICBjb25zdCBwRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xyXG4gIHBEYXRlLmlubmVyVGV4dCA9IGAke29iai50YXNrRGF0ZX1gO1xyXG5cclxuICBjb25zdCBpUGVuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XHJcbiAgaVBlbi5jbGFzc0xpc3QuYWRkKFwiZmEtc29saWRcIiwgXCJmYS1wZW4tdG8tc3F1YXJlXCIpO1xyXG4gIGlQZW4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG1vZFRhc2spO1xyXG5cclxuICBjb25zdCBpVHJhc2ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcclxuICBpVHJhc2guY2xhc3NMaXN0LmFkZChcImZhLXNvbGlkXCIsIFwiZmEtdHJhc2gtY2FuXCIpO1xyXG4gIGlUcmFzaC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZGVsZXRlVGFzayk7XHJcblxyXG4gIGRldGFpbHMuYXBwZW5kQ2hpbGQocERhdGUpO1xyXG4gIGRldGFpbHMuYXBwZW5kQ2hpbGQoaVBlbik7XHJcbiAgZGV0YWlscy5hcHBlbmRDaGlsZChpVHJhc2gpO1xyXG4gIGxpLmFwcGVuZENoaWxkKGRldGFpbHMpO1xyXG5cclxuICB0YXNrcy5hcHBlbmRDaGlsZChsaSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG5ld0xpRm9yUHJvamVjdChvYmopIHtcclxuICBjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcclxuICBsaS5jbGFzc0xpc3QuYWRkKFwidGFza1wiKTtcclxuXHJcbiAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICBkaXYuY2xhc3NMaXN0LmFkZChcIm5hbWUtdGFza1wiKTtcclxuXHJcbiAgY29uc3QgaVNxdWFyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xyXG4gIGlTcXVhcmUuY2xhc3NMaXN0LmFkZChcImZhLXNvbGlkXCIpO1xyXG5cclxuICAvL2F1dG8tY2hlY2tlclxyXG4gIGlmIChvYmouY2hlY2tlZCkge1xyXG4gICAgaVNxdWFyZS5jbGFzc0xpc3QuYWRkKFwiZmEtc3F1YXJlLWNoZWNrXCIpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBpU3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJmYS1zcXVhcmVcIik7XHJcbiAgfVxyXG5cclxuICBpU3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjaGFuZ2VUYXNrUHJvamVjdFN0YXR1cyk7XHJcblxyXG4gIGNvbnN0IHBOYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XHJcbiAgcE5hbWUuaW5uZXJUZXh0ID0gYCR7b2JqLnRhc2tOYW1lfWA7XHJcblxyXG4gIGRpdi5hcHBlbmRDaGlsZChpU3F1YXJlKTtcclxuICBkaXYuYXBwZW5kQ2hpbGQocE5hbWUpO1xyXG4gIGxpLmFwcGVuZENoaWxkKGRpdik7XHJcblxyXG4gIGNvbnN0IGRldGFpbHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gIGRldGFpbHMuY2xhc3NMaXN0LmFkZChcImRldGFpbHNcIik7XHJcblxyXG4gIGNvbnN0IHBEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XHJcbiAgcERhdGUuaW5uZXJUZXh0ID0gYCR7b2JqLnRhc2tEYXRlfWA7XHJcblxyXG4gIGNvbnN0IGlQZW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcclxuICBpUGVuLmNsYXNzTGlzdC5hZGQoXCJmYS1zb2xpZFwiLCBcImZhLXBlbi10by1zcXVhcmVcIik7XHJcbiAgaVBlbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgbW9kVGFza1Byb2plY3RzKTtcclxuXHJcbiAgY29uc3QgaVRyYXNoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XHJcbiAgaVRyYXNoLmNsYXNzTGlzdC5hZGQoXCJmYS1zb2xpZFwiLCBcImZhLXRyYXNoLWNhblwiKTtcclxuICBpVHJhc2guYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGRlbGV0ZVRhc2tQcm9qZWN0KTtcclxuXHJcbiAgZGV0YWlscy5hcHBlbmRDaGlsZChwRGF0ZSk7XHJcbiAgZGV0YWlscy5hcHBlbmRDaGlsZChpUGVuKTtcclxuICBkZXRhaWxzLmFwcGVuZENoaWxkKGlUcmFzaCk7XHJcbiAgbGkuYXBwZW5kQ2hpbGQoZGV0YWlscyk7XHJcblxyXG4gIHRhc2tzLmFwcGVuZENoaWxkKGxpKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZExpc3RlbmVycygpIHtcclxuICBhZGRUYXNrLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBvcGVuVGFza1BvcHVwKTtcclxuICB0YXNrQ2FuY2VsQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0b2dnbGVUYXNrUG9wdXApO1xyXG4gIHRhc2tQb3B1cC5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIHRvZ2dsZVRhc2tQb3B1cCk7XHJcblxyXG4gIG1vZFRhc2tDYW5jZWxCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRvZ2dsZU1vZFRhc2tQb3B1cCk7XHJcbiAgbW9kVGFza1BvcHVwLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgdG9nZ2xlTW9kVGFza1BvcHVwKTtcclxufVxyXG5cclxuZnVuY3Rpb24gb3BlblRhc2tQb3B1cCgpIHtcclxuICB0YXNrUG9wdXAuY2xhc3NMaXN0LnJlbW92ZShcImQtbm9uZVwiKTtcclxuICBhZGRUYXNrLmNsYXNzTGlzdC5hZGQoXCJkLW5vbmVcIik7XHJcbiAgc2V0VGltZW91dCgoKSA9PiB0YXNrTmFtZS5mb2N1cygpLCAxMDApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBvcGVuTW9kVGFza1BvcHVwKCkge1xyXG4gIG1vZFRhc2tQb3B1cC5jbGFzc0xpc3QucmVtb3ZlKFwiZC1ub25lXCIpO1xyXG4gIHNldFRpbWVvdXQoKCkgPT4gbW9kVGFza05hbWUuZm9jdXMoKSwgMTAwKTtcclxufVxyXG5cclxuZnVuY3Rpb24gdG9nZ2xlVGFza1BvcHVwKGUpIHtcclxuICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgdGFza1BvcHVwLnJlc2V0KCk7XHJcbiAgdGFza1BvcHVwLmNsYXNzTGlzdC5hZGQoXCJkLW5vbmVcIik7XHJcbiAgYWRkVGFzay5jbGFzc0xpc3QucmVtb3ZlKFwiZC1ub25lXCIpO1xyXG59XHJcblxyXG5mdW5jdGlvbiB0b2dnbGVNb2RUYXNrUG9wdXAoZSkge1xyXG4gIGUucHJldmVudERlZmF1bHQoKTtcclxuICBtb2RUYXNrUG9wdXAucmVzZXQoKTtcclxuICBtb2RUYXNrUG9wdXAuY2xhc3NMaXN0LmFkZChcImQtbm9uZVwiKTtcclxufVxyXG4iLCJpbXBvcnQgeyBsb2FkUHJvamVjdHMgfSBmcm9tIFwiLi9idWlsZC1tYWluTGVmdFwiO1xyXG5pbXBvcnQge1xyXG4gIGdlbmVyYXRlSW5ib3gsXHJcbiAgZ2VuZXJhdGVQYWdlLFxyXG4gIGFkZExpc3RlbmVycyxcclxuICBsb2FkSW5ib3hUYXNrcyxcclxufSBmcm9tIFwiLi9idWlsZC1tYWluUmlnaHRcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwdXRETm9uZShlbGVtZW50KSB7XHJcbiAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiZC1ub25lXCIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlRE5vbmUoZWxlbWVudCkge1xyXG4gIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImQtbm9uZVwiKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGR1cGxpY2F0ZUluQXJyYXkodGV4dCwgYXJyYXksIG9iaktleSkge1xyXG4gIGxldCByZXN1bHQ7XHJcbiAgYXJyYXkuZm9yRWFjaCgob2JqKSA9PiB7XHJcbiAgICBpZiAob2JqW29iaktleV0gPT09IHRleHQpIHtcclxuICAgICAgcmVzdWx0ID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJlc3VsdCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5mdW5jdGlvbiBoZWFkZXJIYW1idXJnZXJNZW51KCkge1xyXG4gIGNvbnN0IG1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaGVhZGVyIC5mYS1iYXJzXCIpO1xyXG4gIGNvbnN0IG1haW5MZWZ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtYWluX19sZWZ0XCIpO1xyXG5cclxuICBmdW5jdGlvbiBjbGlja0hhbmRsZXIoKSB7XHJcbiAgICBtYWluTGVmdC5jbGFzc0xpc3QudG9nZ2xlKFwiZC1ub25lXCIpO1xyXG4gIH1cclxuXHJcbiAgbWVudS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2xpY2tIYW5kbGVyKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYnVpbGRBbGwoKSB7XHJcbiAgaGVhZGVySGFtYnVyZ2VyTWVudSgpO1xyXG5cclxuICBsb2FkUHJvamVjdHMoKTtcclxuXHJcbiAgYWRkTGlzdGVuZXJzKCk7XHJcbiAgZ2VuZXJhdGVJbmJveCgpO1xyXG4gIGxvYWRJbmJveFRhc2tzKCk7XHJcbn1cclxuIiwiaW1wb3J0IHsgcHV0RE5vbmUgfSBmcm9tIFwiLi9idWlsZC13ZWJcIjtcclxuaW1wb3J0IHsgaW5ib3hUYXNrTGlzdCB9IGZyb20gXCIuL2J1aWxkLW1haW5SaWdodFwiO1xyXG5pbXBvcnQgeyBwcm9qZWN0TGlzdCB9IGZyb20gXCIuL2J1aWxkLW1haW5MZWZ0XCI7XHJcblxyXG5jb25zdCBUT0RBWV9EQVRFID0gZ2V0VG9kYXkoKTtcclxuXHJcbmNvbnN0IHRhc2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrc1wiKTtcclxuXHJcbmNvbnN0IGgyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtYWluX19yaWdodCA+IGgyXCIpO1xyXG5cclxuY29uc3QgYWRkVGFzayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXRhc2tcIik7XHJcbi8qKlxyXG4gKiBvcmEgY2kgc2VydmUgcHJlbmRlcmUgdHV0dGkgaSB0YXNrIGdpdXN0aSwgaW4gYmFzZSBhbGxhIGRhdGEgZGVsIGdpb3Jub1xyXG4gKi9cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdlbmVyYXRlVG9kYXkoKSB7XHJcbiAgaDIuaW5uZXJUZXh0ID0gXCJUb2RheVwiO1xyXG4gIHRhc2tzLmlubmVySFRNTCA9IFwiXCI7XHJcblxyXG4gIGNvbnN0IGFycmF5SW5kZXggPSBmaWx0ZXJlZEluYm94KCk7XHJcbiAgY29uc3QgYXJyYXlQcm9qZWN0cyA9IGZpbHRlcmVkUHJvamVjdHMoKTtcclxuXHJcbiAgYXJyYXlJbmRleC5mb3JFYWNoKCh4KSA9PiBuZXdMaVRvZGF5KHgpKTtcclxuICBhcnJheVByb2plY3RzLmZvckVhY2goKHkpID0+IG5ld0xpVG9kYXkoeSkpO1xyXG5cclxuICBwdXRETm9uZShhZGRUYXNrKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZmlsdGVyZWRJbmJveCgpIHtcclxuICByZXR1cm4gaW5ib3hUYXNrTGlzdC5maWx0ZXIoKHRhc2spID0+IHRhc2sudGFza0RhdGUgPT09IFRPREFZX0RBVEUpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBmaWx0ZXJlZFByb2plY3RzKCkge1xyXG4gIGNvbnN0IHJlc3VsdCA9IFtdO1xyXG5cclxuICBjb25zdCBsaXN0ID0gcHJvamVjdExpc3QuZm9yRWFjaCgocHJvaikgPT4ge1xyXG4gICAgY29uc3QgbGlzdCA9IHByb2ouZ2V0TGlzdCgpO1xyXG5cclxuICAgIGxpc3QuZm9yRWFjaCgodGFzaykgPT4gKHRhc2sudGFza0RhdGUgPT09IFRPREFZX0RBVEUgPyByZXN1bHQucHVzaCh0YXNrKSA6IG51bGwpKTtcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZnVuY3Rpb24gbmV3TGlUb2RheShvYmopIHtcclxuICBjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcclxuICBsaS5jbGFzc0xpc3QuYWRkKFwidGFza1wiKTtcclxuXHJcbiAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICBkaXYuY2xhc3NMaXN0LmFkZChcIm5hbWUtdGFza1wiKTtcclxuXHJcbiAgY29uc3QgaWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xyXG4gIGljb24uY2xhc3NMaXN0LmFkZChcImZhLXNvbGlkXCIsIFwiZmEtYW5nbGUtcmlnaHRcIik7XHJcblxyXG4gIGNvbnN0IHBOYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XHJcbiAgcE5hbWUuaW5uZXJUZXh0ID0gYCR7b2JqLnRhc2tOYW1lfWA7XHJcblxyXG4gIGNvbnN0IHBGcm9tID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XHJcbiAgcEZyb20uY2xhc3NMaXN0LmFkZChcInRvZGF5LWZyb21cIik7XHJcbiAgcEZyb20uaW5uZXJUZXh0ID0gYCgke29iai5mcm9tfSlgO1xyXG5cclxuICBkaXYuYXBwZW5kQ2hpbGQoaWNvbik7XHJcbiAgZGl2LmFwcGVuZENoaWxkKHBOYW1lKTtcclxuICBkaXYuYXBwZW5kQ2hpbGQocEZyb20pO1xyXG4gIGxpLmFwcGVuZENoaWxkKGRpdik7XHJcblxyXG4gIGNvbnN0IGRldGFpbHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gIGRldGFpbHMuY2xhc3NMaXN0LmFkZChcImRldGFpbHNcIik7XHJcblxyXG4gIGNvbnN0IHBEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XHJcbiAgcERhdGUuaW5uZXJUZXh0ID0gYCR7b2JqLnRhc2tEYXRlfWA7XHJcblxyXG4gIGRldGFpbHMuYXBwZW5kQ2hpbGQocERhdGUpO1xyXG4gIGxpLmFwcGVuZENoaWxkKGRldGFpbHMpO1xyXG5cclxuICB0YXNrcy5hcHBlbmRDaGlsZChsaSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFRvZGF5KCkge1xyXG4gIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gIGNvbnN0IGRheSA9IGRhdGUuZ2V0RGF0ZSgpO1xyXG4gIGNvbnN0IG1vbnRoID0gZGF0ZS5nZXRNb250aCgpICsgMTtcclxuICBjb25zdCBuZXdNb250aCA9IG1vbnRoIDwgMTAgPyBgMCR7bW9udGh9YCA6IG1vbnRoO1xyXG4gIGNvbnN0IHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XHJcblxyXG4gIHJldHVybiBgJHtkYXl9LyR7bmV3TW9udGh9LyR7eWVhcn1gO1xyXG59XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IGJ1aWxkQWxsIGZyb20gXCIuL2J1aWxkLXdlYlwiO1xyXG5cclxuYnVpbGRBbGwoKTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9