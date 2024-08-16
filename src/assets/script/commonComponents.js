function commonBtn(parent, addId, removeId) {
  const divBtnCon = document.createElement("div");
  divBtnCon.classList.add("form__button-container");
  parent.append(divBtnCon);

  const addBtn = document.createElement("button");
  addBtn.classList.add("form__button", "form__button--add");
  addBtn.textContent = "Add";
  addBtn.id = addId;
  addBtn.type = "submit";
  divBtnCon.append(addBtn);

  const removeBtn = document.createElement("button");
  removeBtn.classList.add("form__button", "form__button--remove");
  removeBtn.id = removeId;
  removeBtn.textContent = "Cancel";
  divBtnCon.append(removeBtn);
}
export { commonBtn };
