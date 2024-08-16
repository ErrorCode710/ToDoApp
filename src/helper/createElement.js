export function createElement(type, attributes = {}, ...children) {
  const element = document.createElement(type);

  // Set attributes
  for (const key in attributes) {
    if (key.startsWith("data-")) {
      element.setAttribute(key, attributes[key]);
    } else {
      element[key] = attributes[key];
    }
  }

  // Append children
  children.forEach((child) => {
    if (typeof child === "string") {
      element.appendChild(document.createTextNode(child));
    } else {
      element.appendChild(child);
    }
  });

  return element;
}
