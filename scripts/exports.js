// Existing objects
export let addBtn = document.querySelector("#add");
export let clearBtn = document.querySelector("#clear");
export let listBtn = document.querySelector("#list");
export let display = document.querySelector(".display");
export let content = document.querySelector(".content");

// Newly created objects
export let modalDiv = document.createElement("div");
modalDiv.classList.add("modal");

export let okBtn = document.createElement("button");
okBtn.className = "btn popup__btn";

export let cancelBtn = document.createElement("button");
cancelBtn.textContent = "Cancel";
cancelBtn.className = "btn popup__btn";

export let activeTasks = [];
export let completedTasks = [];

let emptyMessage = document.createElement("p");
emptyMessage.className = "display__empty-message";

// Functions
export function isDisplayEmpty() {
  let tasks = document.querySelectorAll(".display .task");

  return !tasks.length;
}

export function showEmptyMessage(taskType) {
  display.classList.add("display--empty");
  emptyMessage.textContent = `Your ${taskType} tasks will appear here.`;
  display.append(emptyMessage);
}

export function removeEmptyMessage() {
  display.classList.remove("display--empty");
  emptyMessage.remove();
}

export function makeAllNonTabbable() {
  let allButtons = document.querySelectorAll(".btn");
  for (let button of allButtons) {
    button.setAttribute("tabindex", "-1");
  }
}

export function makeAllTabbable() {
  let allButtons = document.querySelectorAll(".btn");
  for (let button of allButtons) {
    button.setAttribute("tabindex", "0");
  }
}

// Media query lists
export let mql600 = window.matchMedia("(min-width: 600px)");
export let mql1040 = window.matchMedia("(min-width: 1024px)");
