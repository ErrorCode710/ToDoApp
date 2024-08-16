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
  static TodoStorage = [];

  constructor() {}
  addProject(key, title) {
    if (!Storage.projectStorage[key]) {
      Storage.projectStorage[key] = { title: title, todo: [] };
    }
  }
  addToDo(key, value) {
    Storage.projectStorage[key].todo.push(value);
  }

  print(name, key) {
    console.log(`Name of the project: ${name}, the key ${key}`);
    console.log(Storage.projectStorage);
  }
  access(id) {
    return Storage.projectStorage[id].title;
  }
  getIdList() {
    return Object.keys(Storage.projectStorage);
  }
  accessToDo(key) {
    const todos = Storage.projectStorage[key]?.todo;
    return todos ? todos : [];
  }
}
//get the list of Id on the array Storage and then compared it to the button clicked id if its matched then push

// Adding a new todo item to the project
// const newTodo = "Deploy the website";
// projects[projectID].todo.push(newTodo);
