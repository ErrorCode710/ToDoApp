function addtask(input) {
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
  const wrapper = document.querySelector("#listWrapper");
  wrapper.innerHTML = "";
}
export default addtask;
