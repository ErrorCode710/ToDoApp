function addToDo() {
  const btn = document.querySelector("#addToDo");
  btn.addEventListener("click", () => {
    createList();
  });
}
function createList() {
  const parent = document.querySelector("#listWrapper");

  const list = document.createElement("li");
  list.classList.add("list");
  parent.append(list);

  const listCon = document.createElement("div");
  listCon.classList.add("list__container");
  list.append(listCon);

  const top = document.createElement("div");
  top.classList.add("top");
  listCon.append(top);

  const checklistCon = document.createElement("div");
  checklistCon.classList.add("checklist");
  top.append(checklistCon);

  const input = document.createElement("input");
  input.type = "checkbox";
  input.classList.add("checkbox");
  checklistCon.append(input);

  const label = document.createElement("label");
  label.setAttribute("for", "Project");
  label.textContent = "Task Name";
  checklistCon.append(label);

  const date = document.createElement("div");
  date.classList.add("date");
  date.textContent = "08-9-2024`";
  top.append(date);

  const iconCon = document.createElement("div");
  iconCon.classList.add("list--icons");
  top.append(iconCon);

  const img1 = document.createElement("img");
  img1.src = "src/assets/StarOut.svg";
  iconCon.append(img1);

  const img2 = document.createElement("img");
  img2.src = "src/assets/menu3.svg";
  iconCon.append(img2);

  const p = document.createElement("p");
  p.classList.add("list--description");
  p.textContent = `Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Quibusdam, ea nostrum cumque ipsam tempora aut numquam
                      atque, enim, modi dolor reprehenderit officia adipisci ad
                      cum. Enim blanditiis placeat error iste!`;
  listCon.append(p);
}

export { addToDo };
