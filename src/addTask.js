//addTask.Js
function addTask(input) {
  const btn = document.querySelector(`#${input}Btn`);
  console.log(btn);
  btn.addEventListener("click", () => {
    changeBanner(input);
    clearContent();
  });
}

function changeBanner(title) {
  const span = document.querySelector("#banner");
  span.textContent = title;
}
function clearContent() {
  const list = document.querySelectorAll(".list");
  const wrapper = document.querySelector("#listWrapper");
  // wrapper.innerHTML = "";
  // Alternative solution
  list.forEach((item) => {
    item.classList.add("list--hide");
  });
}
export { addTask };
