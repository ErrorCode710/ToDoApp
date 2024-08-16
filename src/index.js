//Index.Js file
import "./assets/style/reset.css";
// import "./style.css";
import "./assets/style/main.css";

import "./assets/style/globalVariable.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/style/sidePanel.css";
import "./assets/style/main-leftPanel.css";
import "./assets/style/mediaQueries.css";
import "./assets/style/form.css";
import "./assets/style/toDoForm.css";

// Js file
// import { displayForm, createForm, addProjectTolist } from "./addProject.js";
import sideBar from "./sideBar.js";
// import { addToDo } from "./addToDo.js";
// import { displayToDo } from "./mainUi.js";
import { ProjectController } from "./controllers/ProjectController.js";
import { handleProjectClick } from "./controllers/ProjectController.js";
import { toDoController } from "./controllers/ToDoController.js";

document.addEventListener("DOMContentLoaded", function () {
  sideBar();
  ProjectController();
  // handleProjectClick();
  toDoController();
  
});
