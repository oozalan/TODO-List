import { display } from "./exports.js";
import { activeTasks, completedTasks } from "./exports.js";
import { showEmptyMessage } from "./exports.js";
import { mql1024 } from "./exports.js";
import { onClickMenu, onClickDone, onClickRemove, showArea } from "./add.js";

for (let j = 0; j < localStorage.length; j++) {
  let storageValue = localStorage.getItem(j);

  let task = document.createElement("div");
  task.classList.add("task");
  task.setAttribute("data-index", j);

  let taskContent = document.createElement("p");
  taskContent.classList.add("task__content");
  taskContent.textContent = storageValue.slice(1);
  task.append(taskContent);

  let taskSideBar = document.createElement("div");
  taskSideBar.className = "dropdown task__sidebar";
  task.append(taskSideBar);

  let menuBtn = document.createElement("button");
  menuBtn.classList.add("btn");
  menuBtn.innerHTML = '<i class="fa-solid fa-ellipsis"></i>';
  menuBtn.setAttribute("title", "Menu");
  menuBtn.onclick = onClickMenu;
  taskSideBar.append(menuBtn);

  let completeBtn = document.createElement("button");
  completeBtn.classList.add("btn");
  completeBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
  completeBtn.setAttribute("title", "Complete");
  completeBtn.onclick = onClickDone;
  taskSideBar.append(completeBtn);

  let taskDropdown = document.createElement("div");
  taskDropdown.className = "dropdown task__dropdown invisible";
  taskSideBar.append(taskDropdown);

  let editBtn = document.createElement("button");
  editBtn.className = "btn";
  editBtn.onclick = showArea;

  let removeBtn = document.createElement("button");
  removeBtn.className = "btn";
  removeBtn.onclick = onClickRemove;

  if (mql1024.matches) {
    editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
    editBtn.setAttribute("title", "Edit");
    removeBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    removeBtn.setAttribute("title", "Remove");

    menuBtn.after(editBtn);
    taskSideBar.append(removeBtn);
    menuBtn.classList.add("invisible");
  } else {
    editBtn.textContent = "Edit";
    removeBtn.textContent = "Remove";
    taskDropdown.append(editBtn);
    taskDropdown.append(removeBtn);
  }

  if (storageValue[0] == "A") {
    activeTasks.push(task);
    display.append(task);
  } else {
    completedTasks.push(task);
  }
}

for (let task of completedTasks) {
  let doneBtn;
  if (mql1024.matches) {
    doneBtn = task.querySelector(".task__sidebar>.btn:nth-of-type(3)");
  } else {
    doneBtn = task.querySelector(".task__sidebar>.btn:nth-of-type(2)");
  }

  doneBtn.remove();

  let statusIndicator = document.createElement("span");
  statusIndicator.className = "status-indicator";

  let check = document.createElement("i");
  check.className = "fa-solid fa-check";

  statusIndicator.append(check);
  task.append(statusIndicator);

  let taskContent = task.querySelector(".task__content");
  taskContent.classList.add("indented");
}

if (!activeTasks.length) showEmptyMessage("active");
