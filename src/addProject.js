// function elemCreator(elem) {
//   return document.createElement(elem);
// }
// function elemAppend(parent, child) {
//   return parent.append(child);
// }
// function elemClass(parent, nameClass) {
//   return parent.classList.add(nameClass);
// }
// function elemId(parent, nameId) {
//   return (parent.id = nameId);
// }

// 1st add a form and then add the list on the project container list
import addTask from "./addTask.js";
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
  icon.src = "./src/assets/menu.svg";
  divIcon.append(icon);

  const input = document.createElement("input");
  input.id = "projectList";
  input.type = "text";
  input.setAttribute("required", true);
  input.placeholder = "Enter Project Name";
  input.classList.add("input");
  divInput.append(input);

  const divBtnCon = document.createElement("div");
  divBtnCon.classList.add("form__button-container");
  form.append(divBtnCon);

  const addBtn = document.createElement("button");
  addBtn.classList.add("form__button", "form__button--add");
  addBtn.textContent = "Add";
  addBtn.id = "submitBtn";
  addBtn.type = "submit";
  divBtnCon.append(addBtn);

  const removeBtn = document.createElement("button");
  removeBtn.classList.add("form__button", "form__button--remove");
  removeBtn.id = "removeBtn";
  removeBtn.textContent = "Cancel";
  divBtnCon.append(removeBtn);

  addProjectTolist();
}

function createList(projectName) {
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
  iconLeft.src = "./src/assets/Menu.svg";
  divIcon.append(iconLeft);

  const button = document.createElement("button");
  button.classList.add("sidepanel__button", "c-p");
  button.textContent = projectName;
  button.id = projectName + "Btn";
  div.append(button);

  const iconRight = document.createElement("img");
  iconRight.classList.add("menu-icon");
  iconRight.src = "./src/assets/menu3.svg";
  div.append(iconRight);
}
function displayForm() {
  const addBtn = document.querySelector("#addProject-btn");
  addBtn.addEventListener("click", createForm);
}
function addProjectTolist() {
  const removeBtn = document.querySelector("#removeBtn");
  const form = document.querySelector("#ProjectForm");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const input = document.querySelector("#projectList").value;

      createList(input);
      addTask(input);
      form.remove();
    });
  }
  if (removeBtn) {
    removeBtn.addEventListener("click", () => {
      form.remove();
    });
  }
}
export { displayForm, addProjectTolist };
