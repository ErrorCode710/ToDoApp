export function accessToDoID() {
  const addTask = document.querySelector(
    ".sidepanel__buttons-container--add-task"
  );
  const uniqueID = addTask?.id;
  return uniqueID;
}
