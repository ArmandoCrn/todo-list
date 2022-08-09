const projects = document.querySelector("#projects");
const addProject = document.querySelector(".add-project");
const projectPopup = document.querySelector(".add-project-popup");
const projectCancelBtn = document.querySelector(".add-project-popup .btn-cancel");
const projectAddBtn = document.querySelector(".add-project-popup .btn-add");
const projectInput = document.querySelector("#project-name");

/*
List of strings, strings === name of the project
and we can use them as a "key" for load the page 
of the tasks list
*/
const projectList = [];

class Project {
  constructor(name) {
    this.projectName = name;
  }
}

function openProjectPopup() {
  projectPopup.classList.remove("d-none");
  addProject.classList.add("d-none");
}

function toggleProjectPopup(e) {
  e.preventDefault();
  this.reset();
  cancelProjectPopup();
}

function addProjectPopup() {
  const projectName = projectInput.value;
  const myProject = new Project(projectName);

  projectList.push(myProject);
  console.log(projectList);
}

function cancelProjectPopup() {
  projectPopup.classList.add("d-none");
  addProject.classList.remove("d-none");
}

addProject.addEventListener("click", openProjectPopup);
projectAddBtn.addEventListener("click", addProjectPopup);
projectCancelBtn.addEventListener("click", cancelProjectPopup);
projectPopup.addEventListener("submit", toggleProjectPopup);

export { projectInput };

/*
Logicamente sarà vuoto quando non ci sarà nessun
project, e poi pian piano verrà riempito di li che 
rappresentano i project creati in precedenza all'interno 
del local host
*/
