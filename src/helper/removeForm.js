import { Todo } from "../models/ToDo";
export function removeForm(selector, form) {
  const btn = document.querySelector(`${selector}`);

  if (form) {
    if (selector.startsWith("[data-id")) {
      btn.addEventListener("click", () => {
        const todo = new Todo();
        todo.renderAllTodo();

        form.remove();
      });
    } else {
      btn.addEventListener("click", () => {
        form.remove();
      });
    }
  }
}
