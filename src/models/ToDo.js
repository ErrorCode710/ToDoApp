import { Storage } from "./storage.js";
import { changeToDeleteIcon, displayToDo } from "../views/ToDoView";
import { isDateValid } from "../helper/isDateValid";
import { getAddTaskButtonID } from "../helper/getAddTaskButtonID.js";
import { getData2 } from "../helper/getDataID.js";
import { strikeThrough } from "../views/ToDoView";
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
      taskName: this.title,
      details: this.details,
      date: this.date,
    };
    this.storage.addToDo(key, todo);
  }
  removeToDo(key, targetID) {
    this.storage.removeTodo(key, targetID);
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
  isTodoDone(key, targetID, value) {
    this.storage.markAsDone(key, targetID, value);
    strikeThrough(targetID);
    this.renderAllTodo();
  }
  deleteCompletedTodo() {
    const btn = "ds ";
  }
  displayToDo() {
    const key = getAddTaskButtonID();
    const todos = this.storage.retrieveTodos(key);
    todos.forEach((todo) => {
      displayToDo(
        todo.id,
        todo.taskName,
        isDateValid(todo.date),
        todo.details,
        todo.id,
        todo.done
      );
    });
  }
}
