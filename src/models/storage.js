export class Storage {
  static projectStorage = {
    key1: {
      title: "TestValue",
      todo: [
        {
          id: 1,
          done: true,
          taskName: "Learn Coding",
          details: "Short",
          date: "07-10-24",
        },
      ],
    },
  };
  constructor() {}
  createProject(key, title) {
    if (!Storage.projectStorage[key]) {
      Storage.projectStorage[key] = { title: title, todo: [] };
    }
  }
  addToDo(key, value) {
    Storage.projectStorage[key].todo.push(value);
    console.log(Storage.projectStorage);
  }
  retrieveTodos(key) {
    const todos = Storage.projectStorage[key]?.todo;
    return todos ? todos : [];
  }
  findTodoIndex(key, targetID) {
    const todos = Storage.projectStorage[key]?.todo;
    const index = todos.findIndex(({ id }) => id == targetID);
    return index;
  }
  renameTodo(key, targetID, renameValue, renameDescription, renameDate) {
    const index = this.findTodoIndex(key, targetID);
    const newTitle = (Storage.projectStorage[key]["todo"][index]["taskName"] =
      renameValue);
    const newDescription = (Storage.projectStorage[key]["todo"][index][
      "details"
    ] = renameDescription);
    const newDate = (Storage.projectStorage[key]["todo"][index]["date"] =
      renameDate);
  }
  // renameTodoDescription(key,targetID,renameValue){
  //    const index = this.findTodoIndex(key, targetID);
  //   const newDescription = (Storage.projectStorage[key]["todo"][index]["taskName"] =
  //     renameValue);
  // }

  removeTodo(key, targetID) {
    if (targetID) {
      const index = this.findTodoIndex(key, targetID);
      Storage.projectStorage[key]["todo"].splice(index, 1);
      return Storage.projectStorage;
    } else {
      console.error(`${targetID} is not found`);
    }
  }
  markAsDone(key, targetID, value) {
    const index = this.findTodoIndex(key, targetID);
    Storage.projectStorage[key]["todo"][index]["done"] = value;
    return Storage.projectStorage;
  }
  removeProject(key) {
    delete Storage.projectStorage[key];
  }
  renameProject(key, newTitle) {
    const storage = Storage.projectStorage;
    if (storage[key]) {
      storage[key].title = newTitle;
    }
  }
  print(name, key) {
    console.log(`Name of the project: ${name}, the key ${key}`);
    console.log(Storage.projectStorage);
  }
  retrieveProjectTitle(key) {
    if (key) {
      const title = Storage.projectStorage[key].title || null;
      console.log(title);
      if (title) {
        return title;
      } else {
        return false;
      }
    } else {
      return "No key Found";
    }
  }
  retrieveProjectIds() {
    return Object.keys(Storage.projectStorage);
  }
}
