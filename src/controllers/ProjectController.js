import { displayForm, createRenameForm } from "../views/ProjectView";
import { Project } from "../models/Project";
import { Todo } from "../models/ToDo";
import { removeForm } from "../helper/removeForm";
import { getData2 } from "../helper/getDataID";
import tippy from "tippy.js";

// Refactored ProjectController Class
export class ProjectController {
  constructor() {
    console.log("ProjectController initialized"); // Debug log
  }
  initializedAll() {
    this.setUpAddProjectForm();
    this.handleProjectClick();
    this.setUpPopoverMenu();
  }

  setUpAddProjectForm() {
    const addForm = document.querySelector("#addProject-btn");

    if (addForm) {
      addForm.addEventListener("click", () => {
        const form = displayForm();
        const input = form.querySelector('input[type="text"]');
        this.handleFormFocus(form, input, null, null);
        form.scrollIntoView({ behavior: "smooth", block: "start" });
        this.handleProjectSubmission(form);
      });
    } else {
      console.error("Add project button not found"); // Debug log
    }
  }

  handleProjectSubmission(form) {
    const input = form.querySelector('input[type="text"]');
    this.handleFormFocus(form, input, null, null);

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const projectName = input.value;
      const newProject = new Project(projectName);
      newProject.addNewProject();
      newProject.renderAllProjects();
      form.remove();
    });

    removeForm("#removeProject", form);
  }

  handleProjectClick() {
    const parent = document.querySelector("#projectContainer");
    if (parent) {
      console.log("Project container found"); // Debug log
      parent.addEventListener("click", (e) => {
        const projectID = getData2(e);
        if (projectID) {
          const project = new Project();
          const todo = new Todo();
          this.handleProjectActions(projectID, project, todo, e);
        }
      });
    }
  }

  handleProjectActions(projectID, project, todo, event) {
    project.updateBanner(projectID);
    project.AssignIdToAddTask(projectID);
    project.clickEffect(event);
    project.clearContents();
    todo.displayToDo();
  }

  handleDeleteProject(projectID) {
    const key = getData2(projectID);
    const project = new Project();
    project.removeProject(key);
    project.renderAllProjects();
  }

  handleRenameProject(projectID) {
    const key = getData2(projectID);
    const project = new Project();
    console.log(`Rename Project:${key}`);
    const prevTitle = project.retrieveProjectTitle(`${key}`);
    const form = createRenameForm(prevTitle, `#${key}`);
    const input = form.querySelector('input[type="text"]');

    if (form) {
      this.handleFormFocus(form, input, key, project);
    }
  }
  handleRename(e, key, input, project, form) {
    e.preventDefault();
    const renameValue = input.value;
    project.renameProject(key, renameValue);
    project.renderAllProjects();
    form.remove();
  }

  handleFormFocus(form, input, key, project) {
    if (key && project) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        this.handleRename(e, key, input, project, form);
      });
      form.addEventListener("focusout", (e) => {
        e.preventDefault();
        this.handleFocusOut(form, key, input, project);
      });
    }
    input.focus();
  }
  handleFocusOut(form, key, input, project) {
    setTimeout(() => {
      if (!form.contains(document.activeElement)) {
        const liveTitle = input.value;
        project.renameProject(key, liveTitle);
        project.renderAllProjects();
        form.remove();
      }
    }, 100);
  }
  setUpPopoverMenu() {
    tippy(document.querySelectorAll(".option--button"), {
      content: `
      <div class="option" id="option">
        <button id="renameBtn">Rename</button>
        <button id="deleteBtn">Delete</button>
      </div>
    `,
      trigger: "click",
      arrow: false,
      allowHTML: true,
      interactive: true,
      onShow: (instance) => {
        // Use arrow function here to preserve `this`
        const popoverContent = instance.popper.querySelector("#option");
        const renameButton = popoverContent.querySelector("#renameBtn");
        const deleteButton = popoverContent.querySelector("#deleteBtn");

        // Add event listeners using arrow functions
        renameButton.addEventListener("click", () => {
          this.handleRenameProject("#renameBtn");
          console.log(this.handleRenameProject);
        });

        deleteButton.addEventListener("click", () => {
          this.handleDeleteProject("#deleteBtn");
        });
      },
    });
  }
}
