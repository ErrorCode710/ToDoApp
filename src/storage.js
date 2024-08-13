let storedUniqueIDValue = null;

export function setStoredUniqueID(id) {
  storedUniqueIDValue = id;
}

export function getStoredUniqueID() {
  return storedUniqueIDValue;
}
export const arrayStorage = {};

function taskStorage(uniqueID) {
  arrayStorage[uniqueID] = [];
}
function pusher(uniqueID, toDo) {
  arrayStorage[uniqueID].push(toDo);
  console.log(arrayStorage);
}
console.log(arrayStorage);

export { taskStorage, pusher };
