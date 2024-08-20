import { displayToDoForm } from "../views/ToDoView";
import { Todo } from "../models/ToDo";
import { accessToDoID } from "../helper/accessID";
import { removeForm } from "../helper/removeForm";

export function toDoController() {
  const addForm = document.querySelector("#addTask-btn");

  addForm.addEventListener("click", (e) => {
    console.log("clicked");
    const form = displayToDoForm();
    handleFormSubmission(form);
  });
}
export function handleToDoClick() {
  const uniqueID = accessToDoID();
  const newTodo = new Todo();
  newTodo.displayToDo(uniqueID);
}

function handleFormSubmission(form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const newToDo = createToDoForm(form);
    if (isToDoValid(newToDo)) {
      addToDoToStorage(newToDo);
      newToDo.previewDisplay();
      newToDo.print();
      form.remove();
    } else {
      console.log("Failed To Add To Do");
    }
  });
  removeForm("#removeTask", form);
}
function isToDoValid(toDo) {
  const uniqueID = accessToDoID();
  const keyList = toDo.listID();
  return compareKeyandID(uniqueID, keyList);
}
function compareKeyandID(id, key) {
  if (id && key.includes(id)) {
    return true;
  } else {
    return "No Project Found";
  }
}
function addToDoToStorage(toDo) {
  const uniqueID = accessToDoID();
  toDo.addToDo(uniqueID);
}
function createToDoForm(form) {
  const title = form.querySelector("#titleInput").value;
  const details = form.querySelector("#detailsInput").value;
  const date = form.querySelector("#dateInput").value;
  return new Todo(title, details, date);
}
