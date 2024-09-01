import { createElement } from "./createElement";

export function createButton(parent, addId, removeId) {
  const divBtnCon = createElement(
    "div",
    {
      className: "form__button-container",
    },
    createElement("button", {
      className: "form__button form__button--add",
      id: addId,
      type: "submit",
      textContent: "Add",
    }),
    createElement("button", {
      className: "form__button form__button--remove",
      id: removeId,
      type: "submit",
      textContent: "Cancel",
    })
  );

  parent.append(divBtnCon);
  divBtnCon.scrollIntoView({ behavior: "smooth", block: "start" });
  return divBtnCon;
}
