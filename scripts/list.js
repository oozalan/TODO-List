import { activeTasks, completedTasks, showEmptyMessage, removeEmptyMessage, display, isDisplayEmpty, addBtn, clearBtn, dropdownBtn } from "./exports.js";

let activeBtn = document.createElement("button");
activeBtn.textContent = "Active";
activeBtn.className = "btn btn--menu btn--menu-top btn--dropdown-menu above-all";

let completedBtn = document.createElement("button");
completedBtn.textContent = "Completed";
completedBtn.className = "btn btn--menu btn--menu-middle btn--dropdown-menu above-all";

let allBtn = document.createElement("button");
allBtn.textContent = "All";
allBtn.className = "btn btn--menu btn--menu-bottom btn--dropdown-menu above-all";

dropdownBtn.onclick = function (event) {
  if (document.querySelectorAll("body > .btn--menu").length != 0) {
    activeBtn.remove();
    completedBtn.remove();
    allBtn.remove();
    return;
  }
  document.body.append(activeBtn);
  document.body.append(completedBtn);
  document.body.append(allBtn);

  let coords = event.currentTarget.getBoundingClientRect();

  activeBtn.style.top = coords.bottom + 4 + "px";
  activeBtn.style.left = coords.right - activeBtn.clientWidth + "px";

  completedBtn.style.top = coords.bottom + activeBtn.clientHeight + 4 + "px";
  completedBtn.style.left = coords.right - activeBtn.clientWidth + "px";

  allBtn.style.top = coords.bottom + 2 * activeBtn.clientHeight + 4 + "px";
  allBtn.style.left = coords.right - activeBtn.clientWidth + "px";
};

activeBtn.onclick = function (event) {
  if (dropdownBtn.textContent.includes("Active")) return;

  dropdownBtn.innerHTML = 'Active <i class="fa-solid fa-caret-down"></i>';
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

  // Change the behaviors of the buttons
  clearBtn.before(addBtn);
  clearBtn.before(" ");
  clearBtn.innerHTML = '<i class="fa-solid fa-trash"></i> Clear Active';
};

completedBtn.onclick = function (event) {
  if (dropdownBtn.textContent.includes("Completed")) return;

  dropdownBtn.innerHTML = 'Completed <i class="fa-solid fa-caret-down"></i>';
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

  // Change the behaviors of the buttons
  addBtn.remove();
  clearBtn.innerHTML = '<i class="fa-solid fa-trash"></i> Clear Completed';
};

allBtn.onclick = function (event) {
  if (dropdownBtn.textContent.includes("All")) return;

  if (dropdownBtn.textContent.includes("Completed")) {
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

  dropdownBtn.innerHTML = 'All <i class="fa-solid fa-caret-down"></i>';

  // Change the behaviors of buttons
  addBtn.remove();
  clearBtn.innerHTML = '<i class="fa-solid fa-trash"></i> Clear All';
};
