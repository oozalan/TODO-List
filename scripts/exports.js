export let modalDiv = document.createElement("div");
modalDiv.classList.add("modal");

export let okBtn = document.createElement("button");
okBtn.className = "btn btn--larger above-all";

export let cancelBtn = document.createElement("button");
cancelBtn.textContent = "Cancel";
cancelBtn.className = "btn btn--larger above-all";

export let activeTasks = [];
export let completedTasks = [];

export let display = document.querySelector(".display");

export function isDisplayEmpty() {
  let tasks = document.querySelectorAll(".display .task");

  return !tasks.length;
}

let emptyMessage = document.createElement("p");
emptyMessage.textContent = "Your tasks will appear here.";
emptyMessage.className = "display__empty-message";

export function showEmptyMessage() {
  display.classList.add("display--empty");
  display.append(emptyMessage);
}

export function removeEmptyMessage() {
  display.classList.remove("display--empty");
  emptyMessage.remove();
}
