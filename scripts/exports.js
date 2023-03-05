export let modalDiv = document.createElement("div");
modalDiv.classList.add("modal");

export let okBtn = document.createElement("button");
okBtn.className = "btn btn--larger above-all";

export let cancelBtn = document.createElement("button");
cancelBtn.textContent = "Cancel";
cancelBtn.className = "btn btn--larger above-all";

export let addBtn = document.querySelector(".control .btn:nth-of-type(1)");
export let clearBtn = document.querySelector(".control .btn:nth-of-type(2)");
export let dropdownBtn = document.querySelector(".control .btn:nth-of-type(3)");

export let activeTasks = [];
export let completedTasks = [];

export let display = document.querySelector(".display");

export function isDisplayEmpty() {
  let tasks = document.querySelectorAll(".display .task");

  return !tasks.length;
}

let emptyMessage = document.createElement("p");

emptyMessage.className = "display__empty-message";

export function showEmptyMessage(taskType) {
  display.classList.add("display--empty");
  emptyMessage.textContent = `Your ${taskType} tasks will appear here.`;
  display.append(emptyMessage);
}

export function removeEmptyMessage() {
  display.classList.remove("display--empty");
  emptyMessage.remove();
}
