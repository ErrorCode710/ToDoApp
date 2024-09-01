export function getData2(selector) {
  const inputType = handleInput(selector); //
  if (inputType === "Event" && selector.target.type === "checkbox") {
    return selector.target.id;
  } else if (inputType === "Event") {
    const id = selector.target.getAttribute("data-id");
    return id;
  } else if (inputType === "Element") {
    const target = document.querySelector(selector);
    if (target) {
      const parent = target.closest("li");
      const children = parent.querySelector("[data-id]");
      return children.dataset.id;
    }
  } else {
    return "Unknown input type";
  }
}
function getCheckboxID() {}
function handleInput(input) {
  //

  if (input instanceof Event) {
    return "Event";
  } else if (typeof input === "string" || input instanceof Element) {
    return "Element";
  } else {
    return "Unknown input type";
  }
}

// if parameter is selector proceed this condition  then if its event
