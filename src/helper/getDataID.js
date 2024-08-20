export function getDataID(e) {
  const clickedElements = e.target;

  if (clickedElements.classList.contains("sidepanel__button")) {
    const dataID = clickedElements.getAttribute("data-id");
    // console.log(dataID);
    return dataID;
  } else {
    null;
  }
}
export function getDataID1(clickedElements, targetClass, parent) {
  const event = clickedElements.target;
  const grandParent = document.querySelectorAll(`.project--container`); //sidepanel__Button

  // Get the project container element
  const projectContainer = document.getElementById("projectContainer");

  // Search for the first element within the project container that has a data-id attribute
  const elementWithDataId = projectContainer.querySelector("[data-id]");

  // Get the data-id attribute
  const dataId = elementWithDataId
    ? elementWithDataId.getAttribute("data-id")
    : null;

  console.log(dataId);
}
