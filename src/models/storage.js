export class Storage {
  static projectStorage = {
    key1: {
      title: "TestValue",
      todo: [
        {
          toDotitle: "Learn Coding",
          toDoDetails: "Short",
          toDoDate: "07-10-24",
        },
      ],
    },
  };
  constructor() {}
  addProject(key, title) {
    if (!Storage.projectStorage[key]) {
      Storage.projectStorage[key] = { title: title, todo: [] };
    }
  }
  addToDo(key, value) {
    Storage.projectStorage[key].todo.push(value);
  }
  accessToDo(key) {
    const todos = Storage.projectStorage[key]?.todo;
    return todos ? todos : [];
  }
  deleteProject(key) {
    delete Storage.projectStorage[key];
  }
  print(name, key) {
    console.log(`Name of the project: ${name}, the key ${key}`);
    console.log(Storage.projectStorage);
  }
  access(key) {
    return Storage.projectStorage[key].title;
  }
  getIdList() {
    return Object.keys(Storage.projectStorage);
  }
}
