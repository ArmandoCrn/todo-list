import { duplicateInArray } from "./build-web";

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

export function generatePage(projectName, taskList) {
  h2.innerText = projectName;

  function addTaskProjects() {}

  console.log(mainRight);
}

export function generateInbox() {
  h2.innerText = "Inbox";

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

export function addListeners() {
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
