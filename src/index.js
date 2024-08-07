import "./reset.css";
// import "./style.css";
import "./main.css";

import "./globalVariable.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./sidePanel.css";
import "./main-leftPanel.css";
import "./mediaQueries.css";
import "./sidebar.css";
// const form = document.querySelector("#myForm");
// form.addEventListener("submit", (event) => {
//   event.preventDefault();
//   const doInput = document.querySelector("#doList").value;
//   const result = document.querySelector("#result");

//   const div = document.createElement("div");

//   div.innerHTML += doInput;
//   result.append(div);
//   //   div.append(removeButton);
//   removeList(div);
// });

// function removeList(div) {
//   const removeButton = document.createElement("button");
//   removeButton.textContent = "Remove";
//   div.append(removeButton);

//   removeButton.addEventListener("click", () => {
//     div.innerHTML = "";
//   });
// }

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */

// function openNav() {
//   document.querySelector(".sidepanel").style.width = "250px";
//   document.querySelector(".sidepanel__section").style.marginLeft = "250px";
// }
// const open = document.querySelector(".open");
// open.addEventListener("click", openNav)
// /* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
// function closeNav() {
//   document.getElementById("mySidenav").style.width = "0";
//   document.getElementById("main").style.marginLeft = "0";
// }
// console.log("hi");
document.addEventListener("DOMContentLoaded", function () {
  const sidenav = document.getElementById("sidenav");
  const mainContent = document.getElementById("main");
  const navBtn = document.querySelector(".header__nav-btn");

  navBtn.addEventListener("click", () => {
    if (sidenav.classList.contains("sidepanel-hide")) {
      sidenav.classList.remove("sidepanel-hide");
    } else {
      sidenav.classList.add("sidepanel-hide");
    }
  });
});
