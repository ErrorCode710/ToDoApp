function sideBar() {
  const sidenav = document.getElementById("sidenav");
  const mainContent = document.getElementById("main");
  const navBtn = document.querySelector(".header__nav-btn");

  let isPanelVisible = true;

  navBtn.addEventListener("click", () => {
    isPanelVisible = !isPanelVisible;
    if (isPanelVisible) {
      sidenav.classList.remove("sidepanel-hide");
      sidenav.classList.add("sidepanel-show");
    } else {
      sidenav.classList.remove("sidepanel-show");
      sidenav.classList.add("sidepanel-hide");
    }
  });
}
export default sideBar;
