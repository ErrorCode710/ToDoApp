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
          console.log("popOver TRiggered");
          const targetID = getData2("#editTodoBtn");
          this.handleEditTodo(targetID);
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
    console.log(parent);

    if (parent) {
      parent.addEventListener("click", (e) => {
        // Check if the clicked element is a checkbox
        if (e.target.type === "checkbox" && e.target.hasAttribute("data-id")) {
          const condition = this.isRunningBackground(parent);

          if (condition) {
            const key = getAddTaskButtonID();
            const targetID = getData2(e.target); // Pass the clicked checkbox to get the ID
            const checkboxId = document.querySelector(
              `[data-id="checkboxId-${targetID}"]`
            );

            if (checkboxId) {
              const todo = new Todo();
              const value = checkboxId.checked;
              console.log(value);
              this.handleDoneTodoRemove(targetID);
              todo.isTodoDone(key, targetID, value); // Process checkbox click
            }
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
    // console.log("outside click")
    // const btn = document.querySelector(`#deleteDoneTodo-${targetID}`);
    // if (btn) {
    //   btn.addEventListener("click", () => {
    //     this.handleRemoveTodo(targetID);
    //   });
    // }
  }
  handleRemoveTodo(targetID) {
    const key = getAddTaskButtonID();
    const todo = new Todo();
    todo.removeToDo(key, targetID);
    todo.renderAllTodo();
  }
  handleEditTodo(targetID) {
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
      //FOR TITLE
      const renameValue = document.querySelector(
        `[data-id="titleId-${targetID}"]`
      ).value;
      //FOR DESCRIPTION
      const renameDescription = document.querySelector(
        `[data-id="descriptionId-${targetID}"]`
      ).value;
      // FOR DATE
      const renameDate = document.querySelector(
        `[data-id="dateId-${targetID}"]`
      ).value;
      console.log(renameDate);
      todo.renameTodo(key, index, renameValue, renameDescription, renameDate);
      todo.renderAllTodo();
      form.remove();
    });
    removeForm(`[data-id="remove-${targetID}"]`, form);
    const closeButton = document.querySelector(
      `[data-id="remove-${targetID}"]`
    );
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
  isRunningBackground(parent) {
    const popover = document.querySelector("#optionTodo");
    const form = document.querySelector("form");
    const renameForm =
      parent.querySelector(`input[type="text"].edit-task-name.hidden`) !== null;
    console.log("Popover:", popover);
    console.log("Form:", form);
    console.log("Rename form hidden:", renameForm);

    // const renameForm = parent.closest(".hidden");
    // if  popover is not exist thenn this code will run
    if (!popover && !form) {
      console.log("Returning true");
      return true;
    } else {
      return false;
    }
  }
}
