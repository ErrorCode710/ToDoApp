import { displayForm } from "../views/ProjectView";
import { Project } from "../models/Project";
import { Todo } from "../models/ToDo";
import { removeForm } from "../helper/removeForm";
import { getDataID } from "../helper/getDataID";
import tippy from "tippy.js";
import { accessToDoID } from "../helper/accessID";

export function ProjectController() {
  setUpAddForm();
  handleProjectClick();
  handleDeleteProject();
}
function setUpAddForm() {
  const addForm = document.querySelector("#addProject-btn");
  addForm.addEventListener("click", () => {
    const form = displayForm();
    handleFormSubmission(form);
  });
}

function handleFormSubmission(form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const projectName = form.querySelector("#projectList").value;
    const newProject = new Project(projectName);
    newProject.addProject();

    //add project to the panel
    newProject.display(projectName);
    form.remove();
  });
  removeForm("#removeProject", form);
}
function handleProjectClick() {
  const parent = document.querySelector("#projectContainer");
  parent.addEventListener("click", (e) => {
    const projectID = getDataID(e);
    if (projectID) {
      const newProject = new Project();
      const newToDo = new Todo();
      //Update Banner
      newProject.updateBanner(projectID);
      newProject.updateAddTaskId(projectID);
      //Add Click Effect
      newProject.clickEffect(e);
      //Clear Contents
      newProject.clearContents();
      // //Display ToDo
      newToDo.displayToDo(projectID);
      console.log(e);
    }
  });
}
function handleDeleteProject() {
  const parent = document.querySelector("#projectContainer");
  parent.addEventListener("click", (e) => {
    const project = getDataID(e);

    console.log(project);
  });
}
export function popoverMenu() {
  const popover = tippy(document.querySelectorAll(".option--button"), {
    content: `
    <div class="option" id="option" >
      <button id="renameBtn">Rename</button>
      <button id="deleteBtn">Delete</button>
    </div>
  `,
    trigger: "click",
    arrow: false, // Disable the arrow
    allowHTML: true, // Allow HTML content inside the tooltip
    interactive: true,
    onShow(instance) {
      const popoverContent = instance.popper.querySelector("#option");
      const renameButton = popoverContent.querySelector("#renameBtn");
      const deleteButton = popoverContent.querySelector("#deleteBtn");

      renameButton.addEventListener("click", () => {
        console.log("clicked");
        handleDeleteProject();
      });

      deleteButton.addEventListener("click", () => {
        console.log("Click");
        // handleDeleteProject();
      });
    },
    onHide(instance) {
      // Remove event listeners if necessary when the popover is hidden
      const popoverContent = instance.popper.querySelector("#option");

      const renameButton = popoverContent.querySelector("#renameButton");
      const deleteButton = popoverContent.querySelector("#deleteButton");

      if (renameButton && deleteButton) {
        // Remove event listeners using the stored handlers
        renameButton.removeEventListener("click", instance._renameHandler);
        deleteButton.removeEventListener("click", instance._deleteHandler);
      }
    },
  });
}
