import { Storage } from "./storage.js";
import { displayProject, updateAddTaskID } from "../views/ProjectView";
import { displayBanner } from "../views/ProjectView";
import { clearContents } from "../views/ProjectView";
import { toggleClickEffect } from "../views/ProjectView";
import { AssignIdToAddTask } from "../views/ProjectView";

export class Project {
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
  renameProject(key, newtitle) {
    this.storage.renameProject(key, newtitle);
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
  }
  updateBanner(id) {
    displayBanner(this.storage.retrieveProjectTitle(id));
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
  retrieveProjectTitle(id) {
    const title = this.storage.retrieveProjectTitle(id);
    return title;
  }
}
