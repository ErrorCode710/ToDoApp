import { isToday, isWithinInterval, addDays } from "date-fns";

export class Storage {
  static projectStorage = {
    key1: {
      title: "Coding Journey",
      todo: [
        {
          id: 1,
          done: true,
          isImportant: false,
          taskName: "Learn Coding",
          details: "Short",
          date: "2024-10-9",
        },
      ],
    },
    key2: {
      title: "Practicing Journal",
      todo: [
        {
          id: 2,
          done: true,
          isImportant: false,
          taskName: "Buy notebook",
          details: "Short",
          date: "2024-10-9",
        },
      ],
    },
  };
  static presetTitles = {
    ProjectAllTask: "All Task",
    ProjectToday: "Today",
    Project7days: "Next 7 Days",
    ProjectImportant: "Important",
  };
  constructor() {}
  firstLoad() {
    let storage_deserialized =
      JSON.parse(localStorage.getItem("StorageKey")) || {};

    if (Object.keys(storage_deserialized).length === 0) {
      console.log(
        "No data found in localStorage. Initializing with default data."
      );
      storage_deserialized = Storage.projectStorage;

      this.sendStorageToLocal(storage_deserialized);
    }

    console.table(`TESTER FOR LOCAL STORAGE`, storage_deserialized);
    this.storageUpdater(storage_deserialized);
  }
  storageUpdater(newStorage) {
    Storage.projectStorage = newStorage;
  }
  sendStorageToLocal() {
    // NEW DATA
    const storage = Storage.projectStorage;
    const storage_serialized = JSON.stringify(storage);
    localStorage.setItem("StorageKey", storage_serialized);
    // const storage_deserialized = JSON.parse(localStorage.getItem("StorageKey"));
    // console.table(`TESTER FOR LOCAL STORAGE`, storage_deserialized);
    // return storage_deserialized;
  }
  isLocalStorageAvailable() {
    try {
      const testKey = "test";
      localStorage.setItem(testKey, "testValue");
      localStorage.removeItem(testKey);
      return true;
    } catch (error) {
      console.error("LocalStorage is not available", error);
      return false;
    }
  }
  createProject(key, title) {
    if (!Storage.projectStorage[key]) {
      Storage.projectStorage[key] = { title: title, todo: [] };
    }
  }
  addToDo(key, value) {
    Storage.projectStorage[key].todo.push(value);
    // console.log(Storage.projectStorage);
  }
  retrieveTodos(key) {
    const todos = Storage.projectStorage[key]?.todo;
    return todos ? todos : [];
  }
  // findTodoIndex(key, targetID) {
  //   const isIndexPresetProject = this.isIdPresetProject(key);
  //   if (isIndexPresetProject) {
  //     const todos = this.retrieveAllTodos();
  //     const index = todos.findIndex(({ id }) => id == targetID);
  //     if (index) {
  //       console.log(index);
  //       return index;
  //     } else {
  //       return "Can't Find Index";
  //     }
  //   } else {
  //     const todos = Storage.projectStorage[key]?.todo;
  //     const index = todos.findIndex(({ id }) => id == targetID);
  //     if (index) {
  //       return index;
  //     } else {
  //       return "Can't Find Index";
  //     }
  //   }
  // }
  findTodoIndex(key, targetID) {
    const todos = this.isIdPresetProject(key)
      ? this.retrieveAllTodos()
      : Storage.projectStorage[key]?.todo;
    if (!todos) {
      console.error("No todos found for the specified key.");
      return "Can't Find Index";
    }
    const index = todos.findIndex(({ id }) => id == targetID);
    if (index === -1) {
      console.log("Can't Find Index");
      return "Can't Find Index";
    }

    return index;
  }
  //   findTodoById1(id) {
  //     const todos = Object.values(Storage.projectStorage).flatMap(
  //       (project) => project.todo
  //     );
  //     return todos.find((todo) => todo.id === id) || null;
  // }
  findProjectKeyById(id) {
    // Iterate over each project in projectStorage
    for (const [key, project] of Object.entries(Storage.projectStorage)) {
      const todo = project.todo.find((todo) => todo.id == id);
      if (todo) {
        return key;
      }
    }

    return null;
  }
  renameTodo(targetID, renameValue, renameDescription, renameDate) {
    const key = this.findProjectKeyById(targetID);
    const index = this.findTodoIndex(key, targetID);
    Storage.projectStorage[key]["todo"][index]["taskName"] = renameValue;
    Storage.projectStorage[key]["todo"][index]["details"] = renameDescription;
    Storage.projectStorage[key]["todo"][index]["date"] = renameDate;
  }
  removeTodo(targetID) {
    if (targetID) {
      const ProjectKey = this.findProjectKeyById(targetID);
      const index = this.findTodoIndex(ProjectKey, targetID);
      Storage.projectStorage[ProjectKey]["todo"].splice(index, 1);
      return Storage.projectStorage;
    } else {
      console.error(`${targetID} is not found`);
    }
  }
  markTodo(targetID, value, properties) {
    const ProjectKey = this.findProjectKeyById(targetID);
    const index = this.findTodoIndex(ProjectKey, targetID);

    Storage.projectStorage[ProjectKey]["todo"][index][properties] = value; // to find the exact or specific todo then modified value
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
  isDateInNext7days(date) {
    const today = new Date(); // Get the current date
    const next7Days = addDays(today, 7); // Get the date 7 days from today

    return isWithinInterval(date, { start: today, end: next7Days });
  }
  isIdPresetProject(id) {
    return Object.keys(Storage.presetTitles).includes(id);
  }
  retrieveProjectTitle(key) {
    if (key) {
      const title = Storage.projectStorage[key].title || null;

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
  retrieveAllTodos() {
    const allTodos = Object.values(Storage.projectStorage).flatMap(
      (project) => project.todo
    );

    return allTodos;
  }
  retrieveOnlyImportantTodos() {
    const importantTodo = Object.values(Storage.projectStorage).flatMap(
      (project) => project.todo.filter((todo) => todo.isImportant)
    );

    return importantTodo;
  }
  retrieveTodayTodos() {
    // CHECK ALL OF THE TODO HAS DATE
    // AND IF THE TODO HAS DATE GET THE DATE
    // USE DATE-FNS TO KNOW IF ITS TODAY
    // IF ITS TRUE THEN GET THE WHOLE TODO

    // const project = Object.values(Storage.projectStorage);
    // const flat = project.flatMap((project) => project.todo);
    // const todo = flat.filter((todo) => isToday(todo.date));
    // console.table(todo);
    // return todo;
    const todayTodo = Object.values(Storage.projectStorage).flatMap((project) =>
      project.todo.filter((todo) => isToday(todo.date))
    );
    return todayTodo;
  }
  retrieveNext7daysTodo() {
    const next7dayTodo = Object.values(Storage.projectStorage).flatMap(
      (project) =>
        project.todo.filter((todo) => this.isDateInNext7days(todo.date))
    );
    console.table(next7dayTodo);
    return next7dayTodo;
  }
}
