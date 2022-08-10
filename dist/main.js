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
/* harmony import */ var _build_web__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./build-web */ "./src/build-web.js");


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
  constructor(name) {
    this.projectName = name;
  }
}

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

function checkForIndex(text) {
  const result = projectList.findIndex((obj) => obj.projectName === text);
  return result;
}

function deleteProject(e) {
  e.stopPropagation();
  const li = this.parentElement;
  const text = li.querySelector("div > p").innerText;
  const index = checkForIndex(text);
  projectList.splice(index, 1);

  projects.innerHTML = "";
  loadProjects();

  /*FIXME: occhio che quando ci saranno poi i task
  all'interno del progetto, dovranno
  essere eliminati in automatico anch'essi*/
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
/* harmony export */   "default": () => (/* binding */ faicose),
/* harmony export */   "duplicateInArray": () => (/* binding */ duplicateInArray)
/* harmony export */ });
/* harmony import */ var _build_mainLeft__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./build-mainLeft */ "./src/build-mainLeft.js");


function duplicateInArray(text, array, objKey) {
  let result;
  array.forEach((obj) => {
    if (obj[objKey] === text) {
      result = true;
    }
  });

  return result;
}

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBK0M7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTyxpQkFBaUI7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsNERBQWdCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDd0I7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekh3QjtBQUNoRDtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNlO0FBQ2Y7QUFDQTs7Ozs7OztVQ2ZBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOa0M7QUFDbEM7QUFDQSxzREFBTyIsInNvdXJjZXMiOlsid2VicGFjazovLzQtdG9kby1saXN0Ly4vc3JjL2J1aWxkLW1haW5MZWZ0LmpzIiwid2VicGFjazovLzQtdG9kby1saXN0Ly4vc3JjL2J1aWxkLXdlYi5qcyIsIndlYnBhY2s6Ly80LXRvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly80LXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vNC10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly80LXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLzQtdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGR1cGxpY2F0ZUluQXJyYXkgfSBmcm9tIFwiLi9idWlsZC13ZWJcIjtcclxuXHJcbmNvbnN0IHByb2plY3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9qZWN0c1wiKTtcclxuY29uc3QgYWRkUHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXByb2plY3RcIik7XHJcbmNvbnN0IHByb2plY3RQb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXByb2plY3QtcG9wdXBcIik7XHJcbmNvbnN0IHByb2plY3RDYW5jZWxCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC1wcm9qZWN0LXBvcHVwIC5idG4tY2FuY2VsXCIpO1xyXG5jb25zdCBwcm9qZWN0QWRkQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtcHJvamVjdC1wb3B1cCAuYnRuLWFkZFwiKTtcclxuY29uc3QgcHJvamVjdElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9qZWN0LW5hbWVcIik7XHJcblxyXG4vKlxyXG5Vc2UgdGhlIG9iai5wcm9qZWN0TmFtZSBhcyBhIFwia2V5XCIgZm9yIGxvYWQgdGhlIHBhZ2UgXHJcbm9mIHRoZSB0YXNrcyBsaXN0XHJcbiovXHJcbmNvbnN0IHByb2plY3RMaXN0ID0gW107XHJcblxyXG5jbGFzcyBQcm9qZWN0IHtcclxuICBjb25zdHJ1Y3RvcihuYW1lKSB7XHJcbiAgICB0aGlzLnByb2plY3ROYW1lID0gbmFtZTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxpQ2xpY2soKSB7XHJcbiAgaWYgKCF0aGlzLmNsYXNzTmFtZS5pbmNsdWRlcyhcImFjdGl2ZVwiKSkge1xyXG4gICAgdGhpcy5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgbGlzdE9mTGkgPSBwcm9qZWN0cy5xdWVyeVNlbGVjdG9yQWxsKFwibGlcIik7XHJcbiAgbGlzdE9mTGkuZm9yRWFjaCgoZWwpID0+IHtcclxuICAgIGlmIChlbCAhPT0gdGhpcykge1xyXG4gICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjaGVja0ZvckluZGV4KHRleHQpIHtcclxuICBjb25zdCByZXN1bHQgPSBwcm9qZWN0TGlzdC5maW5kSW5kZXgoKG9iaikgPT4gb2JqLnByb2plY3ROYW1lID09PSB0ZXh0KTtcclxuICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5mdW5jdGlvbiBkZWxldGVQcm9qZWN0KGUpIHtcclxuICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gIGNvbnN0IGxpID0gdGhpcy5wYXJlbnRFbGVtZW50O1xyXG4gIGNvbnN0IHRleHQgPSBsaS5xdWVyeVNlbGVjdG9yKFwiZGl2ID4gcFwiKS5pbm5lclRleHQ7XHJcbiAgY29uc3QgaW5kZXggPSBjaGVja0ZvckluZGV4KHRleHQpO1xyXG4gIHByb2plY3RMaXN0LnNwbGljZShpbmRleCwgMSk7XHJcblxyXG4gIHByb2plY3RzLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgbG9hZFByb2plY3RzKCk7XHJcblxyXG4gIC8qRklYTUU6IG9jY2hpbyBjaGUgcXVhbmRvIGNpIHNhcmFubm8gcG9pIGkgdGFza1xyXG4gIGFsbCdpbnRlcm5vIGRlbCBwcm9nZXR0bywgZG92cmFubm9cclxuICBlc3NlcmUgZWxpbWluYXRpIGluIGF1dG9tYXRpY28gYW5jaCdlc3NpKi9cclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlTmV3TGkobmFtZSkge1xyXG4gIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xyXG4gIGxpLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0XCIpO1xyXG4gIGxpLmlubmVySFRNTCA9IGBcclxuICA8ZGl2PlxyXG4gIDxpIGNsYXNzPVwiZmEtc29saWQgZmEtbGlzdFwiPjwvaT5cclxuICA8cD4ke25hbWUucHJvamVjdE5hbWV9PC9wPlxyXG4gIDwvZGl2PlxyXG4gIGA7XHJcblxyXG4gIGNvbnN0IGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcclxuICBpLmNsYXNzTGlzdC5hZGQoXCJmYS1zb2xpZFwiLCBcImZhLXRyYXNoLWNhblwiKTtcclxuICBpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBkZWxldGVQcm9qZWN0KTtcclxuICBsaS5hcHBlbmRDaGlsZChpKTtcclxuXHJcbiAgbGkuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGxpQ2xpY2spO1xyXG4gIHByb2plY3RzLmFwcGVuZENoaWxkKGxpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gbG9hZFByb2plY3RzKCkge1xyXG4gIHByb2plY3RMaXN0LmZvckVhY2goKHByb2plY3QpID0+IHtcclxuICAgIGNyZWF0ZU5ld0xpKHByb2plY3QpO1xyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBvcGVuUHJvamVjdFBvcHVwKCkge1xyXG4gIHByb2plY3RQb3B1cC5jbGFzc0xpc3QucmVtb3ZlKFwiZC1ub25lXCIpO1xyXG4gIGFkZFByb2plY3QuY2xhc3NMaXN0LmFkZChcImQtbm9uZVwiKTtcclxuICBzZXRUaW1lb3V0KCgpID0+IHByb2plY3RJbnB1dC5mb2N1cygpLCAxMDApO1xyXG59XHJcblxyXG5mdW5jdGlvbiB0b2dnbGVQcm9qZWN0UG9wdXAoZSkge1xyXG4gIGUucHJldmVudERlZmF1bHQoKTtcclxuICB0aGlzLnJlc2V0KCk7XHJcbiAgY2FuY2VsUHJvamVjdFBvcHVwKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFByb2plY3RQb3B1cCgpIHtcclxuICBjb25zdCBwcm9qZWN0TmFtZSA9IHByb2plY3RJbnB1dC52YWx1ZTtcclxuICBpZiAocHJvamVjdE5hbWUpIHtcclxuICAgIGNvbnN0IGNoZWNrRHVwbGljYXRlID0gZHVwbGljYXRlSW5BcnJheShwcm9qZWN0TmFtZSwgcHJvamVjdExpc3QsIFwicHJvamVjdE5hbWVcIik7XHJcblxyXG4gICAgaWYgKGNoZWNrRHVwbGljYXRlKSB7XHJcbiAgICAgIGFsZXJ0KFwiUHJvamVjdCBuYW1lcyBtdXN0IGJlIGRpZmZlcmVudCFcIik7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gb3BlblByb2plY3RQb3B1cCgpLCAwKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG15UHJvamVjdCA9IG5ldyBQcm9qZWN0KHByb2plY3ROYW1lKTtcclxuXHJcbiAgICBwcm9qZWN0TGlzdC5wdXNoKG15UHJvamVjdCk7XHJcbiAgICBjcmVhdGVOZXdMaShteVByb2plY3QpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY2FuY2VsUHJvamVjdFBvcHVwKCkge1xyXG4gIHByb2plY3RQb3B1cC5jbGFzc0xpc3QuYWRkKFwiZC1ub25lXCIpO1xyXG4gIGFkZFByb2plY3QuY2xhc3NMaXN0LnJlbW92ZShcImQtbm9uZVwiKTtcclxufVxyXG5cclxuYWRkUHJvamVjdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgb3BlblByb2plY3RQb3B1cCk7XHJcbnByb2plY3RBZGRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFkZFByb2plY3RQb3B1cCk7XHJcbnByb2plY3RDYW5jZWxCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNhbmNlbFByb2plY3RQb3B1cCk7XHJcbnByb2plY3RQb3B1cC5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIHRvZ2dsZVByb2plY3RQb3B1cCk7XHJcblxyXG5sb2FkUHJvamVjdHMoKTtcclxuXHJcbmV4cG9ydCB7IHByb2plY3RJbnB1dCB9O1xyXG4iLCJpbXBvcnQgeyBwcm9qZWN0SW5wdXQgfSBmcm9tIFwiLi9idWlsZC1tYWluTGVmdFwiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGR1cGxpY2F0ZUluQXJyYXkodGV4dCwgYXJyYXksIG9iaktleSkge1xyXG4gIGxldCByZXN1bHQ7XHJcbiAgYXJyYXkuZm9yRWFjaCgob2JqKSA9PiB7XHJcbiAgICBpZiAob2JqW29iaktleV0gPT09IHRleHQpIHtcclxuICAgICAgcmVzdWx0ID0gdHJ1ZTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZmFpY29zZSgpIHtcclxuICBjb25zb2xlLmxvZyhcImNpYW8sIHNvbm8gaW4gYnVpbGQtd2ViXCIpO1xyXG59XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IGZhaUNvc2UgZnJvbSBcIi4vYnVpbGQtd2ViXCI7XHJcblxyXG5mYWlDb3NlKCk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==