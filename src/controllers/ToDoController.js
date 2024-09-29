import { displayToDo, displayToDoForm } from "../views/ToDoView";
import { Todo } from "../models/ToDo";
import { getAddTaskButtonID } from "../helper/getAddTaskButtonID";
import { removeForm } from "../helper/removeForm";
import tippy from "tippy.js";
import { getData2 } from "../helper/getDataID";
import { strikeThrough } from "../views/ToDoView";
import { displayRenameForm } from "../views/ToDoView";

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
        const editButton = popoverContent.querySelector("#editTodoBtn");
        const deleteButton = popoverContent.querySelector("#deleteTodoBtn");
        editButton.addEventListener("click", (e) => {
          const targetID = getData2("#editTodoBtn");
          this.handelEditTodo(targetID);
          // this.handleEditTodoSingle(targetID);
        });
        deleteButton.addEventListener("click", (e) => {
          e.stopPropagation();
          const targetID = getData2("#deleteTodoBtn");
          this.handleRemoveTodo(targetID);
        });
      },
    });
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
        const condition = this.isRunningBackground(parent);
        if (condition) {
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
  handelEditTodo(targetID) {
    const todo = new Todo();
    const existingForm = document.querySelector(".taskform");
    if (existingForm) {
      existingForm.remove();
      todo.renderAllTodo();
    }
    const form = displayRenameForm(targetID);

    const key = getAddTaskButtonID();
    const index = targetID;

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const renameValue = document.querySelector(
        `[data-id="titleId-${targetID}"]`
      ).value;
      console.log(renameValue);
      todo.renameTodo(key, index, renameValue);
      todo.renderAllTodo();
      form.remove();
    });
    removeForm(`[data-id="remove-${targetID}"]`, form);
    const closeButton = document.querySelector(
      `[data-id="remove-${targetID}"]`
    );
    closeButton.addEventListener("click", () => {
      form.remove();
      todo.renderAllTodo();
    });
  }
  // UTILITY

  //   handleEditTodoSingle = (() => {
  //     let currentRenameForm = null;
  //     let formCounter = 0;

  //     return (targetID) => {
  //       // debugger;
  //       if (currentRenameForm) {
  //         const todo = new Todo();
  //         currentRenameForm.remove();
  //         todo.renderAllTodo();
  //         currentRenameForm = null;
  //       }
  //  formCounter++;
  //  console.log(`Form opened ${formCounter} times`);
  //       const form = displayRenameForm(targetID);
  //       currentRenameForm = form;

  //       const todo = new Todo();
  //       const key = getAddTaskButtonID();
  //       const index = targetID;

  //       form.addEventListener("submit", (e) => {
  //         e.preventDefault();
  //         const renameValue = document.querySelector(
  //           `[data-id="titleId-${targetID}"]`
  //         ).value;
  //         console.log(renameValue);
  //         todo.renameTodo(key, index, renameValue);
  //         todo.renderAllTodo();
  //         form.remove();
  //         currentRenameForm = null;
  //         console.log("Form removed after submission");
  //       });

  //       // removeForm(`[data-id="remove-${targetID}"]`, form,);
  //       const closeButton = document.querySelector(
  //         `[data-id="remove-${targetID}"]`
  //       );
  //       closeButton.addEventListener("click", () => {
  //         form.remove();
  //         todo.renderAllTodo();
  //         currentRenameForm = null;
  //       });
  //     };
  //   })();
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
  isRunningBackground(parent) {
    const popover = document.querySelector("#optionTodo");
    const form = document.querySelector("form");
    const renameForm =
      parent.querySelector(`input[type="text"].edit-task-name.hidden`) !== null; // this will return true because it has hidden
    // what we are tyring to achieve is when the class has hidden

    // const renameForm = parent.closest(".hidden");
    if (!popover && !form && renameForm) {
      return true;
    } else {
      return false;
    }
  }
}
