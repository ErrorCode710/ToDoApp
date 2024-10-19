import { Storage } from "./storage.js";
import { displayProject, updateAddTaskID } from "../views/ProjectView";
import { displayBanner } from "../views/ProjectView";
import { clearContents } from "../views/ProjectView";
import { toggleClickEffect } from "../views/ProjectView";
import { AssignIdToAddTask } from "../views/ProjectView";

export class Project {
  // static presetTitles = {
  //   ProjectAllTask: "All Task",
  //   ProjectToday: "Today",
  //   Project7days: "Next 7 Days",
  //   ProjectImportant: "Important",
  // };
  constructor(title) {
    this.title = title;
    this.uniqueID = this.genID();
    this.storage = new Storage();
  }
  genID() {
    return "proj-" + Date.now();
  }
  addNewProject() {
    this.storage.createProject(this.uniqueID, this.title);
    this.storage.print(this.title, this.uniqueID);
  }
  removeProject(id) {
    this.storage.removeProject(id);
  }
  retrieveProject(id) {
    return this.storage.retrieveProjectIds(id);
  }
  renameProject(key, newtitle) {
    if (newtitle === "") {
      const prevTitle = this.retrieveProjectTitle(`${key}`);
      this.storage.renameProject(key, prevTitle);
      this.updateBanner(key);
    } else {
      this.storage.renameProject(key, newtitle);
      this.updateBanner(key);
    }
  }
  renderAllProjects() {
    const parent = document.querySelector("#projectContainer");
    parent.innerHTML = "";
    for (let key in Storage.projectStorage) {
      if (Storage.projectStorage.hasOwnProperty(key)) {
        const project = Storage.projectStorage[key];
        displayProject(project.title, key);
      }
    }

    toggleClickEffect();
  }

  AssignIdToAddTask(id) {
    AssignIdToAddTask(id);
  }
  clearContents() {
    clearContents();
  }
  clickEffect(e) {
    toggleClickEffect(e);
  }
  updateBanner(id) {
    // displayBanner(this.storage.retrieveProjectTitle(id));
    const projectTitle = this.retrieveProjectTitle(id);
    displayBanner(projectTitle);
  }
  isIdPresetProject(id) {
    const project = this.storage.isIdPresetProject(id);
    return project;
  }
  retrievePresetTitle(id) {
    return Storage.presetTitles[id];
  }
  retrieveProjectTitle(id) {
    if (this.isIdPresetProject(id)) {
      return this.retrievePresetTitle(id);
    }
    const title = this.storage.retrieveProjectTitle(id);
    if (id) {
      return title;
    }
  }
}
