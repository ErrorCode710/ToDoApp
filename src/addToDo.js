import { commonBtn } from "./commonComponents";
import { getStoredUniqueID } from "./storage";
import { arrayStorage } from "./storage";
import { getId } from "./addProject";
import { addProjectTolist } from "./addProject";
import { pusher } from "./storage";
import { displayToDo } from "./mainUi";
// import { uniqueID } from "./storage";
class Todo {
  constructor(title, date, description) {
    this.title = title;
    this.date = date;
    this.description = description;
  }
  createList() {
    const listWrapper = document.querySelector("#listWrapper");

    const listItem = document.createElement("li");
    listItem.className = "list";

    const container = document.createElement("div");
    container.className = "list__container";

    const topDiv = document.createElement("div");
    topDiv.className = "top";

    const checklistDiv = document.createElement("div");
    checklistDiv.className = "checklist";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "checkbox";
    const checkboxId = `checkbox-${Date.now()}`; // Unique id for each checkbox
    checkbox.id = checkboxId;

    const label = document.createElement("label");
    label.htmlFor = "Project";
    label.htmlFor = checkboxId;
    label.textContent = this.title;

    checklistDiv.appendChild(checkbox);
    checklistDiv.appendChild(label);

    const dateDiv = document.createElement("div");
    dateDiv.className = "date";
    dateDiv.textContent = this.date;

    const iconsDiv = document.createElement("div");
    iconsDiv.className = "list--icons";

    const starImg = document.createElement("img");
    starImg.src = "assets/StarOut.svg";
    starImg.alt = "";
    iconsDiv.appendChild(starImg);

    const menuImg = document.createElement("img");
    menuImg.src = "assets/menu3.svg";
    menuImg.alt = "";
    iconsDiv.appendChild(menuImg);

    topDiv.appendChild(checklistDiv);
    topDiv.appendChild(dateDiv);
    topDiv.appendChild(iconsDiv);

    const descriptionP = document.createElement("p");
    descriptionP.className = "list--description";
    descriptionP.textContent = this.description;

    container.appendChild(topDiv);
    container.appendChild(descriptionP);

    listItem.appendChild(container);

    listWrapper.appendChild(listItem);
  }
}
function addToDo() {
  const btn = document.querySelector("#addTask-btn");
  btn.addEventListener("click", () => {
    createToDoForm();
    getValueForm();
  });
}

function createToDoForm() {
  // Select the parent element
  const parent = document.querySelector(".list-toDo");

  // Create the task form container
  const taskForm = document.createElement("form");
  taskForm.id = "taskForm";
  taskForm.className = "taskform";

  // Create the title section
  const titleSection = document.createElement("section");
  titleSection.className = "taskform__title";

  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.className = "taskform__input taskform__input--title";
  titleInput.placeholder = "Task Name?";
  titleInput.id = "titleInput";

  titleSection.appendChild(titleInput);

  // Create the details section
  const detailsSection = document.createElement("section");
  detailsSection.className = "taskform__details";

  const detailsInput = document.createElement("input");
  detailsInput.type = "text";
  detailsInput.className = "taskform__input taskform__input--description";
  detailsInput.placeholder = "Description";
  detailsInput.id = "detailsInput";

  detailsSection.appendChild(detailsInput);

  // Create the date section
  const dateSection = document.createElement("section");
  dateSection.className = "taskform__date";

  const dateInput = document.createElement("input");
  dateInput.type = "date";
  dateInput.className = "taskform__input taskform__input--date";
  dateInput.id = "dateInput";

  dateSection.appendChild(dateInput);

  // Append sections to the task form
  taskForm.appendChild(titleSection);
  taskForm.appendChild(detailsSection);
  taskForm.appendChild(dateSection);

  parent.appendChild(taskForm);
  commonBtn(taskForm, "addTask", "removeTask");
}

// Get the fucking value of this shit form and then passed to the class TODO
function getValueForm() {
  const form = document.getElementById("taskForm");
  const removeBtn = document.querySelector("#removeTask");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault(); // Prevent default form submission
      console.log("clicked");
      const title = document.querySelector("#titleInput").value;
      const date = document.querySelector("#dateInput").value;
      const details = document.querySelector("#detailsInput").value;
      addToDoToArray(title, date, details);
      form.remove();
    });
  }
  removeBtn.addEventListener("click", () => {
    form.remove();
  });
}
function addToDoToArray(title, date, details) {
  //? If we put uniqueId on the parameters we need also to put on the value form
  const toDo = new Todo(title, date, details); // which is irrelavant
  const uniqueId = getStoredUniqueID();
  pusher(uniqueId, toDo);
  // console.log(uniqueID);
  // arrayStorage[uniqueID].push(toDo);// What we need is the unique Id from the addProject

  toDo.createList();
  return toDo;
}
// what we are trying to achieve i get the unique id in order to use it as our identifier and push the toDo to the arrayStorage
function pushAray() {}
export { addToDo };
