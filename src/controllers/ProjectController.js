// class ProjectController {
//   constructor(projectName, id) {
//     this.projectName = projectName;
//     this.id = id;
//   }

// }
import { displayForm } from "../views/ProjectView";
import { Project } from "../models/Project";
import { displayBanner } from "../views/ProjectView";
import { Todo } from "../models/ToDo";

export function ProjectController() {
  //Add Form
  const addForm = document.querySelector("#addProject-btn");

  addForm.addEventListener("click", (e) => {
    const form = displayForm();
    handleFormSubmission(form);
    handleProjectClick();
  });
}

function handleFormSubmission(form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const projectName = form.querySelector("#projectList").value;
    if (projectName.trim() === "") {
      alert("Project Name Cannot Be Empty");
      return;
    }
    // add Project to the storage
    const newProject = new Project(projectName);
    newProject.addProject();
    //add project to the panel
    newProject.display(projectName);
    form.remove();
  });

  // To Remove Form for cancellation
  const removeBtn = document.querySelector("#removeProject");
  if (removeBtn) {
    removeBtn.addEventListener("click", () => {
      form.remove();
    });
  }
}
// to update the banner and retrive the list of todo in the arrayStorage
// The Problem now is getting the projectID ? how i dont know too
export function handleProjectClick() {
  const parent = document.querySelector("#projectContainer");

  parent.addEventListener("click", (e) => {
    const clickedElements = e.target;
    if (clickedElements.classList.contains("sidepanel__button")) {
      const projectID = clickedElements.getAttribute("data-id");
      console.log(projectID);

      const newProject = new Project();
      const newToDo = new Todo();

      //Update Banner
      newProject.updateBanner(projectID);
      newProject.updateAddTaskId(projectID);
      //Display ToDo

      newProject.clearContents();
      newToDo.displayToDo(projectID);
      

      //Put here the contents of the ID
    }
  });
}
