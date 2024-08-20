import { Storage } from "./storage.js";
import { displayProject, updateAddTaskID } from "../views/ProjectView";
import { displayBanner } from "../views/ProjectView";
import { clearContents } from "../views/ProjectView";
import { toggleClickEffect } from "../views/ProjectView";

export class Project {
  constructor(title) {
    this.title = title;
    this.uniqueID = this.genID();
    this.storage = new Storage();
  }
  genID() {
    return "proj-" + Date.now();
  }
  addProject() {
    this.storage.addProject(this.uniqueID, this.title);
    this.storage.print(this.title, this.uniqueID);
  }
  deleteProject(id) {
    this.storage.deleteProject(id);
  }
  display() {
    displayProject(this.title, this.uniqueID);
  }
  updateBanner(id) {
    displayBanner(this.storage.access(id));
  }
  updateAddTaskId(id) {
    updateAddTaskID(id);
  }
  clearContents() {
    clearContents();
  }
  clickEffect(e) {
    toggleClickEffect(e);
  }
}

// push project to array as it becomes like this
// arrayStorage['id1'].push('value1')

// id1 is the indentifier
// we need to push the uniqueID to the arrayStorage
// PROBLEM
// How can we passed the id on the updateBanner to
// We need to get the uniqueID
