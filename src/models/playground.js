import { displayForm, createRenameForm } from "../views/ProjectView";
import { Project } from "../models/Project";
import { Todo } from "../models/ToDo";
import { removeForm } from "../helper/removeForm";
import { getData2 } from "../helper/getDataID";
import tippy from "tippy.js";

// Refactored ProjectController Class
export class ProjectController {
  constructor() {
    this.setUpAddProjectForm();
    this.handleProjectClick();
    this.setUpPopoverMenu();
  }

  setUpAddProjectForm() {
    const addForm = document.querySelector("#addProject-btn");
    addForm.addEventListener("click", () => {
      const form = displayForm();
      const input = form.querySelector('input[type="text"]');
      this.handleFormFocus(form, input, null, null); // Setup form with default values
      form.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  handleProjectSubmission(form) {
    const input = form.querySelector('input[type="text"]');
    this.handleFormFocus(form, input, null, null);

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log("Form submitted"); // Debug log
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
    parent.addEventListener("click", (e) => {
      const projectID = getData2(e);
      if (projectID) {
        const project = new Project();
        const todo = new Todo();
        this.handleProjectActions(projectID, project, todo);
      }
    });
  }

  handleProjectActions(projectID, project, todo) {
    project.updateBanner(projectID);
    project.updateAddTaskId(projectID);
    project.clickEffect(e);
    project.clearContents();
    todo.displayToDo(projectID);
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
    const prevTitle = project.retrieveProjectTitle(`${key}`);
    const form = createRenameForm(prevTitle, `#${key}`);
    const input = form.querySelector('input[type="text"]');

    if (form) {
      this.handleFormFocus(form, input, key, project);
    }
  }

  handleFormFocus(form, input, key, project) {
    if (key && project) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        this.handleRename(e, key, input, project);
      });
      form.addEventListener("focusout", (e) => {
        e.preventDefault();
        this.handleFocusOut(form, key, input, project);
      });
    }
    input.focus();
  }

  handleRename(e, key, input, project) {
    e.preventDefault();
    const renameValue = input.value;
    project.renameProject(key, renameValue);
    project.renderAllProjects();
    form.remove();
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
      <div class="option" id="option" >
        <button id="renameBtn">Rename</button>
        <button id="deleteBtn">Delete</button>
      </div>
    `,
      trigger: "click",
      arrow: false,
      allowHTML: true,
      interactive: true,
      onShow: (instance) => {
        const popoverContent = instance.popper.querySelector("#option");
        const renameButton = popoverContent.querySelector("#renameBtn");
        const deleteButton = popoverContent.querySelector("#deleteBtn");

        renameButton.addEventListener("click", () => {
          this.handleRenameProject(instance.reference.dataset.projectId);
        });

        deleteButton.addEventListener("click", () => {
          this.handleDeleteProject(instance.reference.dataset.projectId);
        });
      },
    });
  }
}