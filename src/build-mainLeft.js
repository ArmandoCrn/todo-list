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
  constructor(name, index) {
    this.projectName = name;
    this.index = index;
  }
}

/*Take automaticly the number of the index (usefull when we use a localHost)*/
let indexOfProject = projectList.length;

function liClick() {
  if (!this.className.includes("active")) {
    this.classList.add("active");
  }

  const listOfLi = projects.querySelectorAll("li");
  listOfLi.forEach((el) => {
    if (el !== this) {
      el.classList.remove("active");
    }
  });
}

function deleteProject(e) {
  e.stopPropagation();
  const li = this.parentElement;
  const index = li.dataset.index;
  projectList.splice(index, 1);

  projects.innerHTML = "";
  loadProjects();

  console.log({ li, index });
  /*FIXME: occhio che quando ci saranno poi i task
  all'interno del progetto, dovranno
  essere eliminati in automatico anch'essi*/
}

function createNewLi(name) {
  const li = document.createElement("li");
  li.classList.add("project");
  li.dataset.index = indexOfProject;
  li.innerHTML = `
  <div>
  <i class="fa-solid fa-list"></i>
  ${name.projectName}
  </div>
  `;
  // <i class="fa-solid fa-trash-can"></i>

  const i = document.createElement("i");
  i.classList.add("fa-solid", "fa-trash-can");
  i.addEventListener("click", deleteProject);
  li.appendChild(i);

  li.addEventListener("click", liClick);
  projects.appendChild(li);
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
  this.reset();
  cancelProjectPopup();
}

function addProjectPopup() {
  const projectName = projectInput.value;
  const myProject = new Project(projectName, indexOfProject);

  projectList.push(myProject);
  createNewLi(myProject);
  indexOfProject++;
}

function cancelProjectPopup() {
  projectPopup.classList.add("d-none");
  addProject.classList.remove("d-none");
}

addProject.addEventListener("click", openProjectPopup);
projectAddBtn.addEventListener("click", addProjectPopup);
projectCancelBtn.addEventListener("click", cancelProjectPopup);
projectPopup.addEventListener("submit", toggleProjectPopup);

loadProjects();

export { projectInput };
