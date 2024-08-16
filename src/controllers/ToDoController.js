import { displayToDoForm } from "../views/ToDoView";
import { Todo } from "../models/ToDo";
import { accessToDoID } from "../helper/accessID";

export function toDoController() {
  const addForm = document.querySelector("#addTask-btn");

  addForm.addEventListener("click", (e) => {
    console.log("clicked");
    const form = displayToDoForm();
    handleFormSubmission(form);
  });
  
}
// Compare the AddTask ID to The Storage ID if its true then push the to do
function handleFormSubmission(form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = form.querySelector("#titleInput").value;
    const details = form.querySelector("#detailsInput").value;
    const date = form.querySelector("#dateInput").value;

    const newToDo = new Todo(title, details, date);

    newToDo.print();
    newToDo.display();

    // newToDo.listID();
    // console.timeLog(newToDo.listID());

    const uniqueID = accessToDoID();
    const keyList = newToDo.listID();

    if (uniqueID && keyList.includes(uniqueID)) {
      newToDo.addToDo(uniqueID);
    } else {
      console.log("Project ID does not match any stored project.");
    }

    form.remove();
  });

  const cancelBtn = document.querySelector("#removeTask");
  if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
      form.remove();
    });
  }
}
// function checkIdentifier(identifier) {
//   if (Storage.projectStorage[identifier]) {
//     console.log(`Identifier ${identifier} exists.`);
//   } else {
//     console.log(`Identifier ${identifier} does not exist.`);
//   }
// }

export function handleToDoClick() {
  const uniqueID = accessToDoID();
  const newTodo = new Todo();
  newTodo.displayToDo(uniqueID);
}

//Our next challenge now is how we can send this toDo inside the array Storage together the project ID
// 1. How
