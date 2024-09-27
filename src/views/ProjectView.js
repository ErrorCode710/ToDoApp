import { createElement } from "../helper/createElement";
import { createButton } from "../helper/createButton";
import menuIcon from "/src/assets/img/Menu.svg";
import { popoverMenu } from "../controllers/ProjectController";
import { ProjectController } from "../controllers/ProjectController";
import "tippy.js/themes/light.css";
import { strikeThrough } from "./ToDoView";

export function displayForm() {
  const parent = document.querySelector("#projectContainer");
  // We need to put like it only need one #projecForm here
  const form = createElement(
    "form",
    { id: "ProjectForm", className: "form" },
    createElement(
      "div",
      { className: "input-fields" },
      createElement(
        "div",
        { className: "sidepanel__icon-container" },
        createElement("img", { src: menuIcon })
      ),
      createElement("input", {
        id: "projectList",
        type: "text",
        required: "true",
        placeholder: "Enter Project Name",
        className: "input",
        autocomplete: "off",
      })
    )
  );

  createButton(form, "submitProject", "removeProject");

  parent.append(form);
  return form;
}
{
  /* <input type="text" name="username" value="Default text"> */
}

export function createRenameForm(title, id) {
  const parent = document.querySelector(id);
  parent.textContent = "";
  const form = createElement(
    "form",
    {
      className: "renameForm",
    },
    createElement("input", {
      type: "text",
      value: title,
      id: "renameInput",
      classList: "input input--rename",
    })
  );
  parent.append(form);

  return form;
}
export function displayProject(title, key) {
  const parent = document.querySelector("#projectContainer");
  // parent.innerHTML = "";
  const list = createElement(
    "li",
    { "data-id": key },
    createElement(
      "div",
      {
        className:
          "sidepanel__buttons-container sidepanel__buttons-container--project project--list",
      },
      createElement(
        "div",
        {
          className: "sidepanel__icon-container",
        },
        createElement("img", {
          className: "sidepanel__button",
          src: "/assets/Menu.svg",
        })
      ),
      createElement("button", {
        className: "sidepanel__button c-p",
        textContent: title,
        id: key,
        "data-id": key,
      }),
      createElement(
        "button",
        { className: "option--button" },
        createElement("img", {
          className: "menu-icon addProjectMenu",
          src: "/assets/menu3.svg",
        })
      )
    )
  );

  parent.append(list);
  list.scrollIntoView({ behavior: "smooth", block: "start" });
  const project = new ProjectController();
  project.setUpPopoverMenu();
  // ProjectController.setUpPopoverMenu();
}

export function displayBanner(projectTitle) {
  const banner = document.querySelector("#banner");
  banner.innerHTML = projectTitle;
}
export function AssignIdToAddTask(uniqueID) {
  const btn = document.querySelector(".sidepanel__buttons-container--add-task");
  btn.id = uniqueID;
}
export function clearContents() {
  const wrapper = document.querySelector("#listContainer");
  wrapper.innerHTML = "";
}

export function toggleClickEffect(e) {
  const clickEvents = e.target;
  if (!clickEvents) {
    console.error("Event target is undefined");
    return;
  }

  const grandParent = document.querySelector("#sidenav");
  const targetClass = grandParent.querySelectorAll(".click-effect");
  targetClass.forEach((element) => {
    element.classList.remove("click-effect");
  });

  const projectList = clickEvents.closest(".project--list");
  if (projectList) {
    projectList.classList.toggle("click-effect");
  } else {
    console.log("Element not found");
  }
}
