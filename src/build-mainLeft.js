const projects = document.querySelector("#projects");
const addProject = document.querySelector(".add-project");
const projectPopup = document.querySelector(".add-project-popup");
const projectCancelBtn = document.querySelector(".add-project-popup .btn-cancel");
const projectAddBtn = document.querySelector(".add-project-popup .btn-add");
/*
List of strings, strings === name of the project
and we can use them as a "key" for load the page 
of the tasks list
*/
const projectList = [];

function openProjectPopup() {
  projectPopup.classList.remove("d-none");
  addProject.classList.add("d-none");
}

function addProjectPopup() {}

function cancelProjectPopup(e) {
  // e.preventDefault();
  projectPopup.classList.add("d-none");
  addProject.classList.remove("d-none");
}

addProject.addEventListener("click", openProjectPopup);
projectCancelBtn.addEventListener("click", cancelProjectPopup);

export { projectCancelBtn, projectAddBtn };

/*
Logicamente sarà vuoto quando non ci sarà nessun
project, e poi pian piano verrà riempito di li che 
rappresentano i project creati in precedenza all'interno 
del local host
*/
