export function removeForm(selector, form) {
  const btn = document.querySelector(`${selector}`);
  if (form) {
    btn.addEventListener("click", () => {
      form.remove();
    });
  }
}
