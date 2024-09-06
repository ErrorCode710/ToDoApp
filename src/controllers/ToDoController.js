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
        const popoverContent = instance.popper.querySelector("#optionTodo");
        const renameButton = popoverContent.querySelector("#editTodoBtn");
        const deleteButton = popoverContent.querySelector("#deleteTodoBtn");

        popoverContent.addEventListener("click", (e) => {
          e.stopPropagation();
          e.stopImmediatePropagation();
          logEventPhase(e);
        });
        renameButton.addEventListener("click", (e) => {
          e.stopPropagation();
        });
        deleteButton.addEventListener("click", (e) => {
          e.stopPropagation();
          const targetID = getData2("#deleteTodoBtn");
          this.handleRemoveTodo(targetID);
        });
      },
    });
  }
  logEventPhase(e) {
    const phaseNames = ["capturing", "target", "bubbling"];
    console.log(
      `Event type: ${e.type} | Phase: ${
        phaseNames[e.eventPhase - 1]
      } | Target: ${e.target.tagName} | Current Target: ${
        e.currentTarget.tagName
      }`
    );
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
    console.log("handletTodoClick is running");
    const parent = document.querySelector("#listContainer");
    if (parent) {
      parent.addEventListener("click", (e) => {
        e.stopPropagation();
        const found = document.querySelector("#optionTodo");
        if (!found) {
          const key = getAddTaskButtonID();
          const targetID = getData2(e);
          const checkboxId = document.getElementById(targetID);

          if (checkboxId) {
            const todo = new Todo();
            const value = checkboxId.checked;
            todo.isTodoDone(key, targetID, value);
            this.handleDoneTodoRemove(targetID);
          }
        }
      });
    } else {
      console.error(`not found`);
    }
  }
  handleDoneTodoRemove(targetID) {
    const parent = document.querySelector("#listContainer");
    parent.addEventListener("click", (e) => {
      const btn = e.target.closest(`#deleteDoneTodo-${targetID}`);
      e.stopPropagation();
      if (btn) {
        this.handleRemoveTodo(targetID);
      }
    });
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
