import { addBtn, clearBtn, listBtn, display } from "./exports.js";
import { activeTasks, completedTasks } from "./exports.js";
import { isDisplayEmpty, showEmptyMessage, removeEmptyMessage } from "./exports.js";

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
  if (listBtn.textContent.includes("Active")) return;

  listBtn.innerHTML = 'Active <i class="fa-solid fa-caret-down"></i>';
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
  if (listBtn.textContent.includes("Completed")) return;

  listBtn.innerHTML = 'Completed <i class="fa-solid fa-caret-down"></i>';
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
  if (listBtn.textContent.includes("All")) return;

  if (listBtn.textContent.includes("Completed")) {
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

  listBtn.innerHTML = 'All <i class="fa-solid fa-caret-down"></i>';

  // Change the behaviors of buttons
  addBtn.remove();
  clearBtn.innerHTML = '<i class="fa-solid fa-trash"></i> Clear All';
};
