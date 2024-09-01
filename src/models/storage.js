export class Storage {
  static projectStorage = {
    key1: {
      title: "TestValue",
      todo: [
        {
          id: 1,
          toDotitle: "Learn Coding",
          toDoDetails: "Short",
          toDoDate: "07-10-24",
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
  removeTodo(key, targetID) {
    const index = this.findTodoIndex(key, targetID);
    Storage.projectStorage[key]["todo"].splice(index, 1);
    return Storage.projectStorage;
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
    return Storage.projectStorage[key].title;
  }
  retrieveProjectIds() {
    return Object.keys(Storage.projectStorage);
  }
}
