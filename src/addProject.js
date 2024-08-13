//addProject.js file

import { addTask } from "./mainUi.js";
import { commonBtn } from "./commonComponents.js";
import menuIcon from "/src/assets/img/Menu.svg";
import { taskStorage } from "./storage.js";
// import { uniqueID } from "./storage.js";
// import addTodo from "./addTask.js";
import { setStoredUniqueID } from "./storage.js";

// To Create A form on the left side panel
function createForm() {
  const parent = document.querySelector("#projectContainer");

  const form = document.createElement("form");
  form.id = "ProjectForm";
  form.classList.add("form");
  parent.append(form);

  const divInput = document.createElement("div");
  divInput.classList.add("input-fields");
  form.append(divInput);

  const divIcon = document.createElement("div");
  divIcon.classList.add("sidepanel__icon-container");
  divInput.append(divIcon);

  const icon = document.createElement("img");
  icon.src = menuIcon;
  divIcon.append(icon);

  const input = document.createElement("input");
  input.id = "projectList";
  input.type = "text";
  input.setAttribute("required", true);
  input.placeholder = "Enter Project Name";
  input.classList.add("input");
  divInput.append(input);

  commonBtn(form, "submitProject", "removeProject");

  addProjectTolist();
}
//DOM creation for the list
function createList(projectName, id) {
  const parent = document.querySelector("#projectContainer");

  const list = document.createElement("li");
  parent.append(list);

  const div = document.createElement("div");
  div.classList.add(
    "sidepanel__buttons-container",
    "sidepanel__buttons-container--project",
    "project--list"
  );
  list.append(div);

  const divIcon = document.createElement("div");
  divIcon.classList.add("sidepanel__icon-container");
  div.append(divIcon);

  const iconLeft = document.createElement("img");
  iconLeft.classList.add("sidepanel__button");
  iconLeft.src = "/assets/Menu.svg";
  divIcon.append(iconLeft);

  const button = document.createElement("button");
  // const UniqueId = `button-${Date.now()}`; // Create uniqueID
  button.classList.add("sidepanel__button", "c-p");
  button.textContent = projectName;
  button.id = id; // Passed this to add task.js
  div.append(button);

  const iconRight = document.createElement("img");
  iconRight.classList.add("menu-icon");
  iconRight.src = "/assets/menu3.svg";
  div.append(iconRight);
}
function displayForm() {
  const addBtn = document.querySelector("#addProject-btn");
  addBtn.addEventListener("click", createForm);
}
function addProjectTolist() {
  const removeBtn = document.querySelector("#removeProject");
  const form = document.querySelector("#ProjectForm");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const uniqueID = `id-${Date.now()}`; //Unique Id creator
      setStoredUniqueID(uniqueID);

      const input = document.querySelector("#projectList").value; // The value here passed to the create List and Addtask
      createList(input, uniqueID);
      addTask(input, uniqueID);
      taskStorage(uniqueID);

      form.remove();
    });
  }
  if (removeBtn) {
    removeBtn.addEventListener("click", () => {
      form.remove();
    });
  }
}
function getId(uniqueID) {
  return function () {
    return uniqueID;
  };
}

export { displayForm, addProjectTolist, getId };
