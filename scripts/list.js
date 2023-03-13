import { addBtn, clearBtn, listBtn, display, content } from "./exports.js";
import { activeTasks, completedTasks } from "./exports.js";
import { isDisplayEmpty, showEmptyMessage, removeEmptyMessage } from "./exports.js";
import { mql600 } from "./exports.js";

let dropdown = document.createElement("div");
dropdown.className = "dropdown control__dropdown";

let activeBtn = document.createElement("button");
activeBtn.textContent = "Active";
activeBtn.className = "btn";

let completedBtn = document.createElement("button");
completedBtn.textContent = "Completed";
completedBtn.className = "btn";

let allBtn = document.createElement("button");
allBtn.textContent = "All";
allBtn.className = "btn";

let check = document.createElement("i");
check.className = "fa-solid fa-check";
check.style.paddingLeft = 4 + "px";
activeBtn.append(check);

dropdown.append(activeBtn);
dropdown.append(completedBtn);
dropdown.append(allBtn);

listBtn.onclick = function (event) {
  let controlDropdown = document.querySelector(".control__dropdown");
  if (controlDropdown) {
    controlDropdown.remove();
    return;
  }

  let control = document.querySelector(".control");
  control.append(dropdown);
};

activeBtn.onclick = function (event) {
  let taskType = content.getAttribute("data-task-type");
  if (taskType == "active") return;

  let tasks = document.querySelectorAll(".display .task");

  if (tasks.length == 0) {
    removeEmptyMessage();
  }

  for (let task of tasks) {
    task.remove();
  }

  if (activeTasks.length == 0) {
    showEmptyMessage("active");
  }

  for (let task of activeTasks) {
    display.append(task);
  }

  content.setAttribute("data-task-type", "active");
  activeBtn.append(check);
  clearBtn.before(addBtn);

  if (mql600.matches) {
    clearBtn.innerHTML = '<i class="fa-solid fa-trash"></i> Clear Active';
    listBtn.innerHTML = 'Active <i class="fa-solid fa-caret-down"></i>';
  }
};

completedBtn.onclick = function (event) {
  let taskType = content.getAttribute("data-task-type");
  if (taskType == "completed") return;

  let tasks = document.querySelectorAll(".display .task");

  if (tasks.length == 0) {
    removeEmptyMessage();
  }

  for (let task of tasks) {
    task.remove();
  }

  if (completedTasks.length == 0) {
    showEmptyMessage("completed");
  }

  for (let task of completedTasks) {
    display.append(task);
  }

  content.setAttribute("data-task-type", "completed");
  completedBtn.append(check);
  addBtn.remove();

  if (mql600.matches) {
    clearBtn.innerHTML = '<i class="fa-solid fa-trash"></i> Clear Completed';
    listBtn.innerHTML = 'Completed <i class="fa-solid fa-caret-down"></i>';
  }
};

allBtn.onclick = function (event) {
  let taskType = content.getAttribute("data-task-type");
  if (taskType == "all") return;

  if (taskType == "completed") {
    let tasks = document.querySelectorAll(".display .task");

    for (let task of tasks) {
      task.remove();
    }

    if (tasks.length == 0) {
      removeEmptyMessage();
    }

    for (let task of activeTasks) {
      display.append(task);
    }
  }

  if (isDisplayEmpty()) {
    removeEmptyMessage();
  }

  for (let task of completedTasks) {
    display.append(task);
  }

  if (activeTasks.length == 0 && completedTasks.length == 0) {
    showEmptyMessage("all");
  }

  content.setAttribute("data-task-type", "all");
  allBtn.append(check);
  addBtn.remove();

  if (mql600.matches) {
    clearBtn.innerHTML = '<i class="fa-solid fa-trash"></i> Clear All';
    listBtn.innerHTML = 'All <i class="fa-solid fa-caret-down"></i>';
  }
};
