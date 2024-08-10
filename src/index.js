//Index.Js file
import "./reset.css";
// import "./style.css";
import "./main.css";

import "./globalVariable.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./sidePanel.css";
import "./main-leftPanel.css";
import "./mediaQueries.css";
import "./form.css";

// Js file
import { displayForm, createForm, addProjectTolist } from "./addProject.js";
import sideBar from "./sideBar.js";
import { addToDo } from "./addToDo.js";

document.addEventListener("DOMContentLoaded", function () {
  sideBar();
  displayForm();
  addProjectTolist();
  addToDo();
});
