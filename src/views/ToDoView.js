import { createElement } from "../helper/createElement";
import { createButton } from "../helper/createButton";
import { Todo } from "../models/ToDo";
import { TodoController } from "../controllers/ToDoController";
import doneIcon from "../assets/img/Done.svg";

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
export function displayToDo(
  uniqueID,
  toDoTitle,
  toDoDate,
  toDoDescription,
  todoID,
  isTodoDone = false
) {
  const listWrapper = document.querySelector("#listContainer");

  // listWrapper.innerHTML = "";
  const list = createElement(
    "li",
    {
      className: "list",
    },
    createElement(
      "div",
      {
        className: "list__container",
        "data-id": todoID,
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
            checked: isTodoDone,
          }),
          createElement(
            "label",
            {
              htmlFor: "Project",
            },
            createElement("span", {
              textContent: toDoTitle,
            })
          )
        ),
        createElement(
          "div",
          {
            className: "date",
          },
          createElement("span", {
            textContent: toDoDate,
          })
        ),
        createElement(
          "div",
          {
            className: "list--cta",
          },
          !isTodoDone
            ? createElement(
                "div",
                {
                  className: "Important",
                  id: "importantTodo",
                },
                createElement("img", {
                  src: "assets/StarOut.svg",
                  alt: "",
                })
              )
            : createElement(
                "div",
                {
                  className: "deleteToDo",
                  id: `deleteDoneTodo-${todoID}`,
                },
                createElement("img", {
                  src: "assets/Done.svg",
                  alt: "",
                })
              ),
          createElement(
            "div",
            {
              className: "editTodo",
              id: "editTodo",
            },
            createElement("img", {
              src: "assets/menu3.svg",
              alt: "",
            })
          )
        )
      ),
      createElement(
        "p",
        {
          className: "list--description",
          // textContent: toDoDescription,
        },
        createElement("span", {
          textContent: toDoDescription,
        })
      )
    )
  );

  listWrapper.append(list);
  const todo = new TodoController();
  todo.setUpPopoverMenu();
  strikeThrough(null);
}

export function strikeThrough(targetID = null) {
  if (targetID == null) {
    const checkboxes = document.querySelectorAll(
      'input[type="checkbox"]:checked'
    );
    checkboxes.forEach((checkbox) => {
      const parent = checkbox.closest("[data-id]");
      parent.classList.add("done-todo");
    });
  } else {
    const checkboxId = document.getElementById(targetID);
    const state = checkboxId.checked;
    const parent = document.querySelector(`[data-id="${targetID}"]`);

    if (parent) {
      if (state) {
        parent.classList.add("done-todo");
      } else if (state === false) {
        parent.classList.remove("done-todo");
      }
    }
  }
}
