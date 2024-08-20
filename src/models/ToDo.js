import { Storage } from "./storage.js";
import { displayToDo } from "../views/ToDoView";
import { isDateValid } from "../helper/isDateValid";
export class Todo {
  constructor(title, details, date) {
    this.title = title;
    this.details = details;
    this.date = date;
    this.storage = new Storage();
  }
  addToDo(key) {
    // return this.storage.addToDo(key, todo);
    const todo = {
      taskName: this.title,
      details: this.details,
      date: this.date,
    };
    this.storage.addToDo(key, todo);
  }
  print() {
    console.log(
      `To Do: ${this.title}, details: ${this.details}, date:${this.date}`
    );
  }
  previewDisplay() {
    return displayToDo("id", this.title, isDateValid(this.date), this.details);
  }
  listID() {
    return this.storage.getIdList();
  }
  displayToDo(key) {
    const todos = this.storage.accessToDo(key);
    todos.forEach((todo) => {
      displayToDo(key, todo.taskName, isDateValid(todo.date), todo.details);
    });
  }
}

// Adding a new todo item to the project
//const newTodo = "Deploy the website";
//projects[projectID].todo.push(newTodo);
