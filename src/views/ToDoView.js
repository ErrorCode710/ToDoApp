import { createElement } from "../helper/createElement";
import { createButton } from "../helper/createButton";
import { TodoController } from "../controllers/ToDoController";
import { getAddTaskButtonID } from "../helper/getAddTaskButtonID";
import confetti from "canvas-confetti";
import importantSound from "../assets/sound/ImportantSound1.mp3";
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
        autocomplete: "off",
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
        autocomplete: "off",
      })
    ),
    createElement(
      "section",
      {
        className: "taskform__date",
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

  document.querySelector("#titleInput").focus();
  return taskForm;
}
export function displayToDo(
  uniqueID,
  toDoTitle,
  toDoDate,
  toDoDescription,
  todoID,
  isTodoDone = false,
  isTodoImportant = false
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
        className: `${
          isTodoDone ? "list__container done-todo" : "list__container"
        } ${!isTodoDone && isTodoImportant ? "important" : ""}`.trim(),

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
            "data-id": `checkboxId-${todoID}`,
            checked: isTodoDone,
          }),
          createElement(
            "label",
            {
              htmlFor: "Project",
            },
            createElement("span", {
              className: "taskName",
              textContent: toDoTitle,
            })
          )
          // createElement("input", {
          //   type: "text",
          //   className: "edit-task-name ",
          //   value: toDoTitle,
          // })
        ),
        createElement(
          "div",
          {
            className: "date",
          },
          createElement("time", {
            datetime: toDoDate,
            className: "dateValue",
            textContent: toDoDate,
          })
          // createElement("input", {
          //   type: "date",
          //   className: "edit-task-date ",
          //   value: toDoDate,
          // })
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
                  className: isTodoImportant
                    ? "TodoImportant"
                    : "TodoNotImportant",

                  "aria-label": isTodoImportant
                    ? `TodoImportant`
                    : `TodoNotImportant`,
                  "data-important": isTodoImportant ? "true" : "false",
                  id: `importantTodo-${todoID}`,
                  // id: isTodoImportant ? "TodoImportant" : "TodoNotImportant",
                },
                createElement("img", {
                  src: isTodoImportant
                    ? "assets/StarFill.svg"
                    : "assets/StarOut.svg",
                  "data-important": isTodoImportant ? "true" : "false",
                  id: isTodoImportant ? "TodoImportant" : "TodoNotImportant",

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
                  src: doneIcon,
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
          className: "descriptionInput",
        })
        // createElement("input", {
        //   type: "input",
        //   className: "edit-task-description ",
        //   value: toDoDescription,
        // })
      )
    )
  );

  listWrapper.append(list);
  TodoImportantStyling();
  const todo = new TodoController();
  todo.setUpPopoverMenu();

  // strikeThrough("On");
}

export function strikeThrough(targetID = "On") {
  if (targetID == "On") {
    const checkboxes = document.querySelectorAll(
      'input[type="checkbox"]:checked'
    );
    checkboxes.forEach((checkbox) => {
      const parent = checkbox.closest("[data-id]");
      parent.classList.add("done-todo");
    });
  } else {
    const checkboxId = document.querySelector(
      `[data-id="checkboxId-${targetID}"]`
    );
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
export function displayRenameForm(targetID) {
  const replaceElement = displayToDoForm();
  const target = document.querySelector(`[data-id="${targetID}"]`);
  if (!target) {
    return null;
  }
  {
    updateTaskNameField(replaceElement, target, targetID);
    updateDescriptionField(replaceElement, target, targetID);
    updateDateField(replaceElement, target, targetID);

    const parent = target.parentElement;
    parent.replaceWith(replaceElement);

    setFocusOnTaskNameField(replaceElement);
    updateRemoveBtnForm(replaceElement, targetID);
    updateRenameBtnForm(replaceElement, targetID);

    return replaceElement;
  }
}
function updateTaskNameField(replaceElement, target, targetID) {
  const taskNameField = replaceElement.querySelector("input[required]");
  if (!taskNameField) {
    return;
  }
  taskNameField.required = false;
  const taskNameText = target.querySelector(".taskName").textContent;
  taskNameField.value = taskNameText;
  taskNameField.setAttribute("data-id", `titleId-${targetID}`);
}
function updateDescriptionField(replaceElement, target, targetID) {
  const descriptionField = target.querySelector(".descriptionInput");
  if (!descriptionField) {
    return;
  }
  const descriptionInput = replaceElement.querySelector(
    ".taskform__input--description"
  );
  const descriptionFieldText = descriptionField.textContent;
  descriptionInput.value = descriptionFieldText;
  descriptionInput.setAttribute("data-id", `descriptionId-${targetID}`);
}
function updateDateField(replaceElement, target, targetID) {
  const dateField = target.querySelector(".dateValue");
  if (!dateField) {
    return;
  }
  const dateInput = replaceElement.querySelector(".taskform__input--date");
  const dateTextCon = dateField.textContent;
  dateInput.value = dateTextCon;
  dateInput.setAttribute("data-id", `dateId-${targetID}`);
}
function setFocusOnTaskNameField(replaceElement) {
  const taskNameField = replaceElement.querySelector("input[required]");
  if (!taskNameField) {
    return;
  }
  setTimeout(() => {
    taskNameField.focus();
  }, 0);
}
function updateRemoveBtnForm(replaceElement, targetID) {
  const removeBtn = replaceElement.querySelector(".form__button--remove");
  if (!removeBtn) {
    return;
  }
  removeBtn.setAttribute("data-id", `remove-${targetID}`);
  removeBtn.removeAttribute("id");
}
function updateRenameBtnForm(replaceElement, targetID) {
  const renameBtn = replaceElement.querySelector(".form__button--add");
  if (!renameBtn) {
    return;
  }
  renameBtn.setAttribute("data-id", `add-${targetID}`);
  renameBtn.removeAttribute("id");
}
export function ToggleAddTaskBtn(state) {
  const id = getAddTaskButtonID();
  const addTaskBtn = document.querySelector(`[data-btnId="${id}"]`);
  if (state) {
    addTaskBtn.style.opacity = 0;
    addTaskBtn.style.visibility = "hidden";
  } else {
    // addTaskBtn.style.opacity = 0.5;
    // addTaskBtn.style.visibility = "visible";
    // console.log("ALIVE", addTaskBtn);
    addTaskBtn.removeAttribute("style");
  }
}
export function addConfetti() {
  confetti({
    particleCount: 100, // Number of confetti particles
    spread: 180, // How spread out the particles are
    origin: { y: 0.6 }, // Y-origin of the particles (0.6 means starting a bit down the page)
    // colors: ["#00f2ff", "#009199", "#66f7ff", "#99faff"],
  });
  playImportantSound();
}
function playImportantSound() {
  const audio = new Audio(importantSound); // Create an Audio object
  audio.play(); // Play the sound
}
function TodoImportantStyling() {
  document.querySelectorAll('[data-important="true"]').forEach((child) => {
    const parent = child.closest(".list__container"); // Select the closest parent with the desired class
    if (parent) {
      parent.classList.add("important");
    }
  });
}
