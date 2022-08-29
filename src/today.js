import { putDNone } from "./build-web";
import { inboxTaskList } from "./build-mainRight";
import { projectList } from "./build-mainLeft";

const TODAY_DATE = getToday();

const tasks = document.querySelector("#tasks");

const h2 = document.querySelector("#main__right > h2");

const addTask = document.querySelector(".add-task");
/**
 * ora ci serve prendere tutti i task giusti, in base alla data del giorno
 */

export default function generateToday() {
  h2.innerText = "Today";
  tasks.innerHTML = "";

  const arrayIndex = filteredInbox();
  const arrayProjects = filteredProjects();

  arrayIndex.forEach((x) => newLiToday(x));
  arrayProjects.forEach((y) => newLiToday(y));

  putDNone(addTask);
}

function filteredInbox() {
  return inboxTaskList.filter((task) => task.taskDate === TODAY_DATE);
}

function filteredProjects() {
  const result = [];

  const list = projectList.forEach((proj) => {
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
