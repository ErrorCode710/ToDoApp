import { Storage } from "../helper/storage";
import { displayToDo } from "../views/ToDoView";
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
  display() {
    return displayToDo("id", this.title, this.date, this.details);
  }
  listID() {
    return this.storage.getIdList();
  }
  displayToDo(key) {
    const todos = this.storage.accessToDo(key);
    todos.forEach((todo) => {
      console.log(`
        This is the Task Name ${todo.taskName},
        this is the Date ${todo.date}
        this is the detais ${todo.details}

        `);
     displayToDo(key, todo.taskName, todo.date, todo.details);
    });
  }
}

// Adding a new todo item to the project
//const newTodo = "Deploy the website";
//projects[projectID].todo.push(newTodo);
