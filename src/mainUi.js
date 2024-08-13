//addTask.Js
import { arrayStorage } from "./storage";
function addTask(input, id) {
  const btn = document.querySelector(`#${id}`); // unique Id
  console.log(btn);
  btn.addEventListener("click", () => {
    changeBanner(input);
    clearContent();
    displayToDo(id);
    console.log(id);
  });
}

function displayToDo(uniqueID) {
  const display = document.querySelector(`#${uniqueID}`);
  arrayStorage[uniqueID].forEach((toDo) => {
    console.log(toDo);
  });
}
function changeBanner(title) {
  const span = document.querySelector("#banner");
  span.textContent = title;
}
function clearContent() {
  const list = document.querySelectorAll(".list");
  const wrapper = document.querySelector("#listWrapper");
  // wrapper.innerHTML = "";
  // Alternative solution
  list.forEach((item) => {
    item.classList.add("list--hide");
  });
}

export { addTask, displayToDo };
