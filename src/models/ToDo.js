import { Storage } from "./storage.js";
import { changeToDeleteIcon, displayToDo } from "../views/ToDoView";
import { isDateValid } from "../helper/isDateValid";
import { getAddTaskButtonID } from "../helper/getAddTaskButtonID.js";
import { getData2 } from "../helper/getDataID.js";
import { strikeThrough } from "../views/ToDoView";
import { Project } from "./Project.js";
export class Todo {
  constructor(title, details, date) {
    this.title = title;
    this.details = details;
    this.date = date;
    this.storage = new Storage();
    this.id = this.genID();
  }
  addToDo(key) {
    // return this.storage.addToDo(key, todo);
    const todo = {
      id: this.id,
      done: false,
      isImportant: false,
      taskName: this.title,
      details: this.details,
      date: this.date,
    };
    this.storage.addToDo(key, todo);
  }
  removeToDo(targetID) {
    this.storage.removeTodo(targetID);
  }
  renderAllTodo() {
    const container = document.querySelector("#listContainer");
    container.innerHTML = "";
    this.displayToDo();
  }

  genID() {
    return Date.now();
  }
  print() {
    console.log(
      `To Do: ${this.title}, details: ${this.details}, date:${this.date}, `
    );
  }
  previewDisplay() {
    return displayToDo(
      "id",
      this.title,
      isDateValid(this.date),
      this.details,
      this.id
    );
  }
  listID() {
    return this.storage.retrieveProjectIds();
  }
  isTodoDone(targetID, value) {
    const properties = "done";
    this.storage.markTodo(targetID, value, properties);
    strikeThrough(targetID);
    this.renderAllTodo();
  }
  isTodoImportant(targetID, value) {
    const properties = "isImportant";
    this.storage.markTodo(targetID, value, properties);
    this.renderAllTodo();
  }
  renameTodo(targetID, renameValue, renameDescription, renameDate) {
    this.storage.renameTodo(
      targetID,
      renameValue,
      renameDescription,
      renameDate
    );
  }
  retrieveAllTodos() {
    return this.storage.retrieveAllTodos();
    // return this.storage.retrieveOnlyImportantTodos();
  }
  retrieveOnlyImportantTodo() {
    return this.storage.retrieveOnlyImportantTodos();
  }
  displayToDo() {
    const key = getAddTaskButtonID();
    const project = new Project();
    const projectContainer = project.isIdPresetProject(key);

    console.log(projectContainer);

    if (projectContainer) {
      if (key === "ProjectAllTask") {
        const todos = this.retrieveAllTodos();
        this.displayToDoItem(todos);
      }
      if (key === "ProjectImportant") {
        const todos = this.retrieveOnlyImportantTodo();
        this.displayToDoItem(todos);
      }
    }
    const todos = this.storage.retrieveTodos(key);
    this.displayToDoItem(todos);
  }
  displayToDoItem(todos) {
    // if (todos.some((todo) => todo.isImportant)) {
    //   console.log("There are important todos.");
    // }

    todos.forEach((todo) => {
      displayToDo(
        todo.id,
        todo.taskName,
        isDateValid(todo.date),
        todo.details,
        todo.id,
        todo.done,
        todo.isImportant
      );
    });
  }
}
// THE PROBLEM HERE IS WE CANT SHOW THE ALL TASK BECAUSE ITS NOT FOUND ON THE PROJECTSTORAGE
