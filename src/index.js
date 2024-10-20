//Index.Js file
import "./assets/style/reset.css";
// import "./style.css";
import "./assets/style/main.css";
import "./assets/style/globalVariable.css";
import "./assets/style/sidePanel.css";
import "./assets/style/main-leftPanel.css";
import "./assets/style/mediaQueries.css";
import "./assets/style/form.css";
import "./assets/style/toDoForm.css";
import "./assets/style/option.css";
import "./assets/style/utility.css";
import "driver.js/dist/driver.css";
import "tippy.js/dist/tippy.css";
import "./assets/style/todoItems.css";

// Js file
import sideBar from "./sideBar.js";
import { toggleTheme } from "./theme.js";
import {
  PresetProjectController,
  ProjectController,
} from "./controllers/ProjectController.js";
import { handleProjectClick } from "./controllers/ProjectController.js";
import {
  TodoController,
  toDoController,
} from "./controllers/ToDoController.js";
import { driver } from "driver.js";
import { Storage } from "./models/storage.js";
import { popoverMenu } from "./views/ProjectView.js";

document.addEventListener("DOMContentLoaded", function () {
  sideBar();
  toggleTheme()
  // toDoController();
  const storage = new Storage();
  storage.firstLoad();
  const project = new ProjectController();
  project.initializedAll();
  const todo = new TodoController();
  todo.initialize();

  // ProjectController();
  // popoverMenu();
  // handleProjectClick();

  // const driverObj = driver({
  //   showProgress: true,
  //   steps: [
  //     {
  //       element: ".header__nav-btn",
  //       popover: {
  //         title: "Sidepanel Menu",
  //         description: "This is where all the control ",
  //       },
  //     },
  //     {
  //       element: "#addProject-btn",
  //       popover: { title: "Title", description: "Description" },
  //     },
  //     {
  //       element: ".sidebar",
  //       popover: { title: "Title", description: "Description" },
  //     },
  //     {
  //       element: ".footer",
  //       popover: { title: "Title", description: "Description" },
  //     },
  //   ],
  // });

  // driverObj.drive();
  // tippy(".option--button", {
  //   content: "I'm a Tippy tooltip!",
  //   interactive: true,
  //   trigger: "click",
  // });
  // tippy(document.querySelectorAll(".option--button"), {
  //   content: `
  //   <div class="option" id="my-popover" >
  //     <button>Rename</button>
  //     <button>Delete</button>
  //   </div>
  // `,
  //   trigger: "click",
  //   arrow: false, // Disable the arrow
  //   allowHTML: true, // Allow HTML content inside the tooltip
  // });
});
