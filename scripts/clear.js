import { clearBtn, content } from "./exports.js";
import { modalDiv, okBtn, cancelBtn, activeTasks, completedTasks } from "./exports.js";
import { showEmptyMessage, makeAllNonTabbable, makeAllTabbable, removeFromStorage } from "./exports.js";

let popup = document.createElement("div");
popup.className = "popup";

let clearPrompt = document.createElement("p");
clearPrompt.className = "popup__content clear-prompt";

let popupControl = document.createElement("div");
popupControl.className = "popup__control";

clearBtn.onclick = function (event) {
  let taskType = content.getAttribute("data-task-type");
  let taskTypeCapitalized = taskType.charAt(0).toUpperCase() + taskType.slice(1);

  okBtn.textContent = `Clear ${taskTypeCapitalized}`;
  okBtn.onclick = onClickOk;
  cancelBtn.onclick = onClickCancel;

  if (taskType == "all") clearPrompt.textContent = "Are you sure you want to clear all tasks?";
  else clearPrompt.textContent = `Are you sure you want to clear all ${taskType} tasks?`;

  makeAllNonTabbable();
  document.body.append(modalDiv);
  modalDiv.append(popup);
  popup.append(clearPrompt);
  popup.append(popupControl);
  popupControl.append(okBtn);
  popupControl.append(cancelBtn);
}

function onClickOk(event) {
  let tasks = document.querySelectorAll(".display .task");

  if (tasks.length == 0) {
    finish();
    return;
  }

  let taskType = content.getAttribute("data-task-type");

  if (taskType == "active") {
    for (let task of tasks) {
      removeFromStorage(task);
      task.remove();
    }

    activeTasks.length = 0;
  } else if (taskType == "completed") {
    for (let task of tasks) {
      removeFromStorage(task);
      task.remove();
    }

    completedTasks.length = 0;
  } else {
    for (let task of tasks) {
      task.remove();
    }

    localStorage.clear();
    activeTasks.length = 0;
    completedTasks.length = 0;
  }

  showEmptyMessage(taskType);
  finish();
}

function onClickCancel(event) {
  finish();
}

function finish() {
  popup.remove();
  modalDiv.remove();
  makeAllTabbable();
}
