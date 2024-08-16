import { createElement } from "../helper/createElement";
import { createButton } from "../helper/createButton";
import menuIcon from "/src/assets/img/Menu.svg";

export function displayForm() {
  const parent = document.querySelector("#projectContainer");

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
      })
    )
  );

  createButton(form, "submitProject", "removeProject");

  parent.append(form);
  return form;
}
export function displayProject(title, key) {
  const parent = document.querySelector("#projectContainer");
  // parent.innerHTML = "";
  const list = createElement(
    "li",
    {},
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
      createElement("img", {
        className: "menu-icon",
        src: "/assets/menu3.svg",
      })
    )
  );

  parent.append(list);
}

export function displayBanner(projectTitle) {
  const banner = document.querySelector("#banner");
  banner.innerHTML = projectTitle;
}
export function updateAddTaskID(uniqueID) {
  const btn = document.querySelector(".sidepanel__buttons-container--add-task");
  btn.id = uniqueID;
}
export function clearContents() {
  const wrapper = document.querySelector("#listWrapper");
  wrapper.innerHTML = "";
}
