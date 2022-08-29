import { duplicateInArray, putDNone, removeDNone } from "./build-web";

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

export const inboxTaskList = [];

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

export function setCurrentProj(proj) {
  currentProj = proj;
}

export function generatePage() {
  h2.innerText = currentProj.projectName;

  tasks.innerHTML = "";
  loadProjectTasks();

  removeHandlerInbox();
  removeHandlerProject();
  removeDNone(addTask);
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
    const checkDuplicate = duplicateInArray(name, array, "taskName");

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

export function generateInbox() {
  h2.innerText = "Inbox";

  removeDNone(addTask);
  taskAddBtn.addEventListener("click", addTaskInbox);
  modTaskAddBtn.addEventListener("click", modTaskEditBtn);
}

function addTaskInbox() {
  const name = taskName.value;
  const date = taskDate.value;

  if (name && date) {
    const checkDuplicate = duplicateInArray(name, inboxTaskList, "taskName");

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

export function deleteProjectRigth() {
  h2.innerText = "";
  putDNone(addTask);
}

export function removeHandlerInbox() {
  taskAddBtn.removeEventListener("click", addTaskInbox);
  modTaskAddBtn.removeEventListener("click", modTaskEditBtn);
}

export function removeHandlerProject() {
  taskAddBtn.removeEventListener("click", addTaskProject);
  modTaskAddBtn.removeEventListener("click", modTaskEditBtnProjects);
}

export function loadInboxTasks() {
  tasks.innerHTML = "";

  inboxTaskList.forEach((task) => {
    newLi(task);
  });
}

export function loadProjectTasks() {
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

export function addListeners() {
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
