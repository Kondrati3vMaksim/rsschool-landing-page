const themeControl = document.querySelector("#theme-change");
const html = document.documentElement;
const themeValue = localStorage.getItem("theme");

if (themeValue === "dark") {
  html.setAttribute("data-theme", "dark");
  themeControl.checked = true;
} else {
  html.setAttribute("data-theme", "light");
  themeControl.checked = false;
}
themeControl.addEventListener("change", () => {
  if (themeControl.checked === true) {
    localStorage.setItem("theme", "dark");
    html.setAttribute("data-theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
    html.setAttribute("data-theme", "light");
  }
});
