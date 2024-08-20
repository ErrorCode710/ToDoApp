import { createElement } from "../helper/createElement";
import { createButton } from "../helper/createButton";

export function displayToDoForm() {
  const parent = document.querySelector(".list-toDo");

  const taskForm = createElement(
    "form",
    {
      id: "taskForm",
      className: "taskform",
    },
    createElement(
      "section",
      {
        className: "taskform__title",
      },
      createElement("input", {
        type: "text",
        className: "taskform__input taskform__input--title",
        placeholder: "Task Name?",
        id: "titleInput",
        required: "true",
      })
    ),
    createElement(
      "section",
      {
        className: "taskform__details",
      },
      createElement("input", {
        type: "text",
        className: "taskform__input taskform__input--description",
        placeholder: "Description",
        id: "detailsInput",
      })
    ),
    createElement(
      "section",
      {
        className: "taskform__details",
      },
      createElement("input", {
        type: "date",
        className: "taskform__input taskform__input--date",
        id: "dateInput",
      })
    )
  );

  parent.append(taskForm);
  createButton(taskForm, "addTask", "removeTask");
  return taskForm;
}
export function displayToDo(uniqueID, toDoTitle, toDoDate, toDoDescription) {
  const listWrapper = document.querySelector("#listWrapper");
  const list = createElement(
    "li",
    {
      className: "list",
    },
    createElement(
      "div",
      {
        className: "list__container",
      },
      createElement(
        "div",
        {
          className: "top",
        },
        createElement(
          "div",
          {
            className: "checklist",
          },
          createElement("input", {
            type: "checkbox",
            className: "checkbox",
            id: uniqueID,
          }),
          createElement("label", {
            htmlFor: uniqueID,
            textContent: toDoTitle,
          })
        ),
        createElement("div", {
          className: "date",
          textContent: toDoDate,
        }),
        createElement(
          "div",
          {
            className: "list--icons",
          },
          createElement("img", {
            src: "assets/StarOut.svg",
            alt: "",
          }),
          createElement("img", {
            src: "assets/menu3.svg",
            alt: "",
          })
        )
      ),
      createElement("p", {
        className: "list--description",
        textContent: toDoDescription,
      })
    )
  );

  // const list = createElement(
  //   "li",
  //   {
  //     className: "list",
  //   },
  //   createElement(
  //     "div",
  //     {
  //       className: "list__container",
  //     },
  //     createElement("div,")
  //   )
  // );

  listWrapper.append(list);
}
