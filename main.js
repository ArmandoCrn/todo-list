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
/* harmony export */   "projectInput": () => (/* binding */ projectInput)
/* harmony export */ });
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




/***/ }),

/***/ "./src/build-web.js":
/*!**************************!*\
  !*** ./src/build-web.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ faicose)
/* harmony export */ });
/* harmony import */ var _build_mainLeft__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./build-mainLeft */ "./src/build-mainLeft.js");


function faicose() {
  console.log("ciao, sono in build-web");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLFdBQVc7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDd0I7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvR3dCO0FBQ2hEO0FBQ2U7QUFDZjtBQUNBOzs7Ozs7O1VDSkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05rQztBQUNsQztBQUNBLHNEQUFPIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vNC10b2RvLWxpc3QvLi9zcmMvYnVpbGQtbWFpbkxlZnQuanMiLCJ3ZWJwYWNrOi8vNC10b2RvLWxpc3QvLi9zcmMvYnVpbGQtd2ViLmpzIiwid2VicGFjazovLzQtdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLzQtdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly80LXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovLzQtdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vNC10b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgcHJvamVjdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2plY3RzXCIpO1xyXG5jb25zdCBhZGRQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtcHJvamVjdFwiKTtcclxuY29uc3QgcHJvamVjdFBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtcHJvamVjdC1wb3B1cFwiKTtcclxuY29uc3QgcHJvamVjdENhbmNlbEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXByb2plY3QtcG9wdXAgLmJ0bi1jYW5jZWxcIik7XHJcbmNvbnN0IHByb2plY3RBZGRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC1wcm9qZWN0LXBvcHVwIC5idG4tYWRkXCIpO1xyXG5jb25zdCBwcm9qZWN0SW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2plY3QtbmFtZVwiKTtcclxuXHJcbi8qXHJcblVzZSB0aGUgb2JqLnByb2plY3ROYW1lIGFzIGEgXCJrZXlcIiBmb3IgbG9hZCB0aGUgcGFnZSBcclxub2YgdGhlIHRhc2tzIGxpc3RcclxuKi9cclxuY29uc3QgcHJvamVjdExpc3QgPSBbXTtcclxuXHJcbmNsYXNzIFByb2plY3Qge1xyXG4gIGNvbnN0cnVjdG9yKG5hbWUsIGluZGV4KSB7XHJcbiAgICB0aGlzLnByb2plY3ROYW1lID0gbmFtZTtcclxuICAgIHRoaXMuaW5kZXggPSBpbmRleDtcclxuICB9XHJcbn1cclxuXHJcbi8qVGFrZSBhdXRvbWF0aWNseSB0aGUgbnVtYmVyIG9mIHRoZSBpbmRleCAodXNlZnVsbCB3aGVuIHdlIHVzZSBhIGxvY2FsSG9zdCkqL1xyXG5sZXQgaW5kZXhPZlByb2plY3QgPSBwcm9qZWN0TGlzdC5sZW5ndGg7XHJcblxyXG5mdW5jdGlvbiBsaUNsaWNrKCkge1xyXG4gIGlmICghdGhpcy5jbGFzc05hbWUuaW5jbHVkZXMoXCJhY3RpdmVcIikpIHtcclxuICAgIHRoaXMuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGxpc3RPZkxpID0gcHJvamVjdHMucXVlcnlTZWxlY3RvckFsbChcImxpXCIpO1xyXG4gIGxpc3RPZkxpLmZvckVhY2goKGVsKSA9PiB7XHJcbiAgICBpZiAoZWwgIT09IHRoaXMpIHtcclxuICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIH1cclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gZGVsZXRlUHJvamVjdChlKSB7XHJcbiAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICBjb25zdCBsaSA9IHRoaXMucGFyZW50RWxlbWVudDtcclxuICBjb25zdCBpbmRleCA9IGxpLmRhdGFzZXQuaW5kZXg7XHJcbiAgcHJvamVjdExpc3Quc3BsaWNlKGluZGV4LCAxKTtcclxuXHJcbiAgcHJvamVjdHMuaW5uZXJIVE1MID0gXCJcIjtcclxuICBsb2FkUHJvamVjdHMoKTtcclxuXHJcbiAgY29uc29sZS5sb2coeyBsaSwgaW5kZXggfSk7XHJcbiAgLypGSVhNRTogb2NjaGlvIGNoZSBxdWFuZG8gY2kgc2FyYW5ubyBwb2kgaSB0YXNrXHJcbiAgYWxsJ2ludGVybm8gZGVsIHByb2dldHRvLCBkb3ZyYW5ub1xyXG4gIGVzc2VyZSBlbGltaW5hdGkgaW4gYXV0b21hdGljbyBhbmNoJ2Vzc2kqL1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVOZXdMaShuYW1lKSB7XHJcbiAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XHJcbiAgbGkuY2xhc3NMaXN0LmFkZChcInByb2plY3RcIik7XHJcbiAgbGkuZGF0YXNldC5pbmRleCA9IGluZGV4T2ZQcm9qZWN0O1xyXG4gIGxpLmlubmVySFRNTCA9IGBcclxuICA8ZGl2PlxyXG4gIDxpIGNsYXNzPVwiZmEtc29saWQgZmEtbGlzdFwiPjwvaT5cclxuICAke25hbWUucHJvamVjdE5hbWV9XHJcbiAgPC9kaXY+XHJcbiAgYDtcclxuICAvLyA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLXRyYXNoLWNhblwiPjwvaT5cclxuXHJcbiAgY29uc3QgaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xyXG4gIGkuY2xhc3NMaXN0LmFkZChcImZhLXNvbGlkXCIsIFwiZmEtdHJhc2gtY2FuXCIpO1xyXG4gIGkuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGRlbGV0ZVByb2plY3QpO1xyXG4gIGxpLmFwcGVuZENoaWxkKGkpO1xyXG5cclxuICBsaS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgbGlDbGljayk7XHJcbiAgcHJvamVjdHMuYXBwZW5kQ2hpbGQobGkpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBsb2FkUHJvamVjdHMoKSB7XHJcbiAgcHJvamVjdExpc3QuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xyXG4gICAgY3JlYXRlTmV3TGkocHJvamVjdCk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG9wZW5Qcm9qZWN0UG9wdXAoKSB7XHJcbiAgcHJvamVjdFBvcHVwLmNsYXNzTGlzdC5yZW1vdmUoXCJkLW5vbmVcIik7XHJcbiAgYWRkUHJvamVjdC5jbGFzc0xpc3QuYWRkKFwiZC1ub25lXCIpO1xyXG4gIHNldFRpbWVvdXQoKCkgPT4gcHJvamVjdElucHV0LmZvY3VzKCksIDEwMCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRvZ2dsZVByb2plY3RQb3B1cChlKSB7XHJcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIHRoaXMucmVzZXQoKTtcclxuICBjYW5jZWxQcm9qZWN0UG9wdXAoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkUHJvamVjdFBvcHVwKCkge1xyXG4gIGNvbnN0IHByb2plY3ROYW1lID0gcHJvamVjdElucHV0LnZhbHVlO1xyXG4gIGNvbnN0IG15UHJvamVjdCA9IG5ldyBQcm9qZWN0KHByb2plY3ROYW1lLCBpbmRleE9mUHJvamVjdCk7XHJcblxyXG4gIHByb2plY3RMaXN0LnB1c2gobXlQcm9qZWN0KTtcclxuICBjcmVhdGVOZXdMaShteVByb2plY3QpO1xyXG4gIGluZGV4T2ZQcm9qZWN0Kys7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNhbmNlbFByb2plY3RQb3B1cCgpIHtcclxuICBwcm9qZWN0UG9wdXAuY2xhc3NMaXN0LmFkZChcImQtbm9uZVwiKTtcclxuICBhZGRQcm9qZWN0LmNsYXNzTGlzdC5yZW1vdmUoXCJkLW5vbmVcIik7XHJcbn1cclxuXHJcbmFkZFByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG9wZW5Qcm9qZWN0UG9wdXApO1xyXG5wcm9qZWN0QWRkQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhZGRQcm9qZWN0UG9wdXApO1xyXG5wcm9qZWN0Q2FuY2VsQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjYW5jZWxQcm9qZWN0UG9wdXApO1xyXG5wcm9qZWN0UG9wdXAuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCB0b2dnbGVQcm9qZWN0UG9wdXApO1xyXG5cclxubG9hZFByb2plY3RzKCk7XHJcblxyXG5leHBvcnQgeyBwcm9qZWN0SW5wdXQgfTtcclxuIiwiaW1wb3J0IHsgcHJvamVjdElucHV0IH0gZnJvbSBcIi4vYnVpbGQtbWFpbkxlZnRcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGZhaWNvc2UoKSB7XHJcbiAgY29uc29sZS5sb2coXCJjaWFvLCBzb25vIGluIGJ1aWxkLXdlYlwiKTtcclxufVxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBmYWlDb3NlIGZyb20gXCIuL2J1aWxkLXdlYlwiO1xyXG5cclxuZmFpQ29zZSgpO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=