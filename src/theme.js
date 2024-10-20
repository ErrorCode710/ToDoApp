export function toggleTheme() {
  const btn = document.querySelector("#ThemeToggle");
  btn.addEventListener("click", () => {
    const html = document.querySelector(`[data-theme]`);
    const theme = html.getAttribute("data-theme") === "dark";
    const themeLabel = document.querySelector("#themeLabel");
    if (theme) {
     
      html.setAttribute("data-theme", "light");
      themeLabel.textContent = "Light";
    } else {
      html.setAttribute("data-theme", "dark");
      themeLabel.textContent = "Dark";
    }
  });
}
