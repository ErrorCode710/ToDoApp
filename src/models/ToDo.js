import { Storage } from "./storage.js";
import {
  changeToDeleteIcon,
  displayToDo,
  removeAddTaskBtn,
  ToggleAddTaskBtn,
} from "../views/ToDoView";
import { isDateValid } from "../helper/isDateValid";
import { getAddTaskButtonID } from "../helper/getAddTaskButtonID.js";
import { getData2 } from "../helper/getDataID.js";
import { strikeThrough } from "../views/ToDoView";
import { Project } from "./Project.js";
import { isToday } from "date-fns";
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
    this.storage.sendStorageToLocal();
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
  retrieveTodayTodo() {
    return this.storage.retrieveTodayTodos();
  }
  retrieveNext7daysTodo() {
    return this.storage.retrieveNext7daysTodo();
  }
  displayToDo() {
    const key = getAddTaskButtonID();
   
    const project = new Project();
    const projectContainer = project.isIdPresetProject(key);
    
    this.removeAddTaskBtnOnPresetProject(projectContainer);
    

    if (projectContainer) {
      if (key === "ProjectAllTask") {
        const todos = this.retrieveAllTodos();
        this.displayToDoItem(todos);
      }
      if (key === "ProjectImportant") {
        const todos = this.retrieveOnlyImportantTodo();
        this.displayToDoItem(todos);
      }
      if (key === "ProjectToday") {
        const todos = this.retrieveTodayTodo();
        this.displayToDoItem(todos);
      }
      if (key === "Project7days") {
        const todos = this.retrieveNext7daysTodo();
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
  removeAddTaskBtnOnPresetProject(state) {
    // const addTaskBtn = this.storage.isIdPresetProject(getAddTaskButtonID());
    
    ToggleAddTaskBtn(state);
  }
}
// THE PROBLEM HERE IS WE CANT SHOW THE ALL TASK BECAUSE ITS NOT FOUND ON THE PROJECTSTORAGE
