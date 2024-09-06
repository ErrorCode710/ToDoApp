import { displayToDoForm } from "../views/ToDoView";
import { Todo } from "../models/ToDo";
import { getAddTaskButtonID } from "../helper/getAddTaskButtonID";
import { removeForm } from "../helper/removeForm";
import tippy from "tippy.js";
import { getData2 } from "../helper/getDataID";
import { strikeThrough } from "../views/ToDoView";

export class TodoController {
  constructor() {}
  // INITIALIZER
  initialize() {
    this.setUpAddProject();
    this.handleTodoClick();
  }
  // EVENT SETUP
  setUpAddProject() {
    const addForm = document.querySelector("#addTask-btn");
    addForm.addEventListener("click", () => {
      const form = displayToDoForm();
      this.handleFormSubmission(form);
    });
  }

  setUpPopoverMenu() {
    const elements = document.querySelectorAll("#editTodo");
    console.log(`Found Elements:`, Array.from(elements));

    if (elements.length === 0) {
      console.error("No elements found with ID 'editTodo'");
      return;
    }

    tippy(elements, {
      content: `
    <div class="option" id="optionTodo">
      <button id="editTodoBtn">Edit</button>
      <button id="deleteTodoBtn">Delete</button>
    </div>
  `,
      trigger: "click",
      arrow: false,
      allowHTML: true,
      interactive: true,
      onShow: (instance) => {
        console.log("Popover is being shown");
        console.log(
          "Popover content:",
          instance.popper.querySelector(".option")
        );
        console.log(
          "Rename button:",
          instance.popper.querySelector("#editTodoBtn")
        );
        console.log(
          "Delete button:",
          instance.popper.querySelector("#deleteTodoBtn")
        );
      },
      onHidden: (instance) => {
        console.log("Popover is hidden");
      },
    });

    // Additional check for visibility with increased timeout
    setTimeout(() => {
      const popperElement = document.querySelector("[data-tippy-root]");
      console.log("Instance popper element:", popperElement);
      if (popperElement) {
        console.log("Parent of popper element:", popperElement.parentElement);
      } else {
        console.error("Popper element not found");
      }
    }, 2000); // Increased timeout duration
  }

  //EVENT HANDLER
  handleFormSubmission(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const todo = this.createToDoForm(form);
      if (this.isToDoValid(todo)) {
        this.formAction(todo);
        form.remove();
      } else {
        console.log("Failed To Add To Do");
      }
    });
    removeForm("#removeTask", form);
  }

  handleTodoClick() {
    const parent = document.querySelector("#listContainer");
    if (parent) {
      parent.addEventListener("click", (e) => {
        console.log("handleTodoClick triggered");

        e.stopPropagation();
        const key = getAddTaskButtonID();
        const targetID = getData2(e);
        const checkboxId = document.getElementById(targetID);

        if (checkboxId) {
          console.log("Checkbox ID found:", checkboxId);
          const todo = new Todo();
          const value = checkboxId.checked;
          todo.isTodoDone(key, targetID, value);
          // this.handleDoneTodoRemove(targetID);
        }
      });
    } else {
      console.error(`not found`);
    }
  }
  handleDoneTodoRemove(targetID) {
    const parent = document.querySelector("#listContainer");
    if (parent) {
      parent.addEventListener("click", (e) => {
        const btn = e.target.closest(`#deleteDoneTodo-${targetID}`);
        if (btn) {
          this.handleRemoveTodo(targetID);
        }
      });
    } else {
      console.error(`Parent element not found`);
    }
  }
  handleRemoveTodo(targetID) {
    const key = getAddTaskButtonID();
    const todo = new Todo();
    todo.removeToDo(key, targetID);
    todo.renderAllTodo();
  }
  // UTILITY
  createToDoForm(form) {
    const title = form.querySelector("#titleInput").value;
    const details = form.querySelector("#detailsInput").value;
    const date = form.querySelector("#dateInput").value;
    return new Todo(title, details, date);
  }

  formAction(todo) {
    const key = getAddTaskButtonID();
    this.addToDoToStorage(todo);
    todo.renderAllTodo();
    todo.print();
  }

  isToDoValid(toDo) {
    const uniqueID = getAddTaskButtonID();
    const keyList = toDo.listID();
    return this.compareKeyandID(uniqueID, keyList);
  }

  compareKeyandID(id, key) {
    if (id && key.includes(id)) {
      return true;
    } else {
      return "No Project Found";
    }
  }

  addToDoToStorage(toDo) {
    const uniqueID = getAddTaskButtonID();
    toDo.addToDo(uniqueID);
  }
}
