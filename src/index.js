import "./reset.css";
// import "./style.css";
import "./main.css";

import "./globalVariable.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./sidePanel.css";
import "./main-leftPanel.css";
import "./mediaQueries.css";
import "./sidebar.css";
import "./form.css";

// Js file
import { displayForm, createForm, addProjectTolist } from "./addProject.js";
import sideBar from "./sideBar.js";

// const form = document.querySelector("#myForm");
// form.addEventListener("submit", (event) => {
//   event.preventDefault();
//   const doInput = document.querySelector("#doList").value;
//   const result = document.querySelector("#result");

//   const div = document.createElement("div");

//   div.innerHTML += doInput;
//   result.append(div);
//   //   div.append(removeButton);
//   removeList(div);
// });

// function removeList(div) {
//   const removeButton = document.createElement("button");
//   removeButton.textContent = "Remove";
//   div.append(removeButton);

//   removeButton.addEventListener("click", () => {
//     div.innerHTML = "";
//   });
// }

document.addEventListener("DOMContentLoaded", function () {
  sideBar();
  displayForm();
  addProjectTolist();
});
