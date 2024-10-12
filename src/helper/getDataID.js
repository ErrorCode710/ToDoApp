// export function getData2(selector) {
//   const inputType = handleInput(selector);

//   if (inputType === "Event" && selector.target.type === "checkbox") {
//     return selector.target.id || selector.target.getAttribute("data-id"); // Make sure to check both id and data-id
//   } else if (inputType === "Event") {
//     let id = selector.target.getAttribute("data-id");

//     // If no id on the current target, search parent elements
//     if (!id) {
//       const parent = selector.target.closest("[data-id]"); // Walk up the DOM tree
//       if (parent) {
//         id = parent.getAttribute("data-id");
//       }
//     }
//     return id;
//   } else if (inputType === "Element") {
//     const target = document.querySelector(selector);
//     if (target) {
//       const parent = target.closest("li");
//       const children = parent.querySelector("[data-id]");
//       return children ? children.dataset.id : null;
//     }
//   } else {
//     return "Unknown input type";
//   }
// }

// function handleInput(input) {
//   if (input instanceof Event) {
//     return "Event";
//   } else if (typeof input === "string" || input instanceof Element) {
//     return "Element";
//   } else {
//     return "Unknown input type";
//   }
// }
export function getData2(selector) {
  const inputType = handleInput(selector);

  if (inputType === "Event" && selector.target.type === "checkbox") {
    return selector.target.id || selector.target.getAttribute("data-id"); // Return id or data-id
  } else if (inputType === "Event") {
    let id = selector.target.id || selector.target.getAttribute("data-id");

    if (!id) {
      const parent = selector.target.closest("[id], [data-id]"); // Search for both id and data-id
      if (parent) {
        id = parent.id || parent.getAttribute("data-id");
      }
    }
    return id;
  } else if (inputType === "Element") {
    const target =
      selector instanceof Element ? selector : document.querySelector(selector);
    if (target) {
      const parent = target.closest("li");
      const children = parent ? parent.querySelector("[id], [data-id]") : null;
      return children ? children.id || children.dataset.id : null;
    }
  } else {
    return "Unknown input type";
  }
}

function handleInput(input) {
  if (input instanceof Event) {
    return "Event";
  } else if (typeof input === "string" || input instanceof Element) {
    return "Element";
  } else {
    return "Unknown input type";
  }
}
