import { duplicateInArray } from "./build-web";
import generateToday from "./today";
import {
  Task,
  generateInbox,
  generatePage,
  removeHandlerProject,
  loadInboxTasks,
  setCurrentProj,
  deleteProjectRigth,
} from "./build-mainRight";

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

export const projectList = existLocalStorageProject();

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
        const obj = Object.assign(new Task(), task);

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
    const checkDuplicate = duplicateInArray(projectName, projectList, "projectName");

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
  deleteProjectRigth();
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
  li.addEventListener("click", () => setCurrentProj(name));
  li.addEventListener("click", generatePage);
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

export function loadProjects() {
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
inbox.addEventListener("click", generateInbox);
inbox.addEventListener("click", removeHandlerProject);
inbox.addEventListener("click", loadInboxTasks);

today.addEventListener("click", liClick);
today.addEventListener("click", generateToday);

addProject.addEventListener("click", openProjectPopup);
projectAddBtn.addEventListener("click", addProjectPopup);
projectCancelBtn.addEventListener("click", toggleProjectPopup);
projectPopup.addEventListener("submit", toggleProjectPopup);
