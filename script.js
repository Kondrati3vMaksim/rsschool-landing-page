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

const tasks = [
  { title: "HTML", status: "done" },
  { title: "JavaScript", status: "todo" },
  { title: "CSS", status: "done" },
  { title: "React", status: "todo" },
  { title: "TypeScript", status: "todo" },
];
function getStatusSummary(tasks) {
  return tasks.reduce(
    (obj, task) => {
      if (task.status === "todo") {
        obj.todo.count += 1;
        obj.todo.titles.push(task.title);
      }
      if (task.status === "done") {
        obj.done.count += 1;
        obj.done.titles.push(task.title);
      }
      return obj;
    },
    {
      todo: {
        count: 0,
        titles: [],
      },
      done: {
        count: 0,
        titles: [],
      },
    },
  );
}
console.log(getStatusSummary(tasks));
