import { okBtn, cancelBtn, clearBtn } from "./exports.js";
import { modalDiv, activeTasks, completedTasks } from "./exports.js";
import { showEmptyMessage, makeAllNonTabbable, makeAllTabbable } from "./exports.js";

let popup = document.createElement("div");
popup.className = "popup";

let clearPrompt = document.createElement("p");
clearPrompt.className = "popup__content clear-prompt";

let popupControl = document.createElement("div");
popupControl.className = "popup__control";

clearBtn.onclick = function (event) {
  okBtn.textContent = clearBtn.textContent.slice(1);
  okBtn.onclick = onClickOk;
  cancelBtn.onclick = onClickCancel;

  let taskType = okBtn.textContent.split(" ")[1].toLowerCase();
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

  let taskType = okBtn.textContent.split(" ")[1];

  if (taskType == "Active") {
    for (let task of tasks) {
      task.remove();
    }

    activeTasks.length = 0;
  } else if (taskType == "Completed") {
    for (let task of tasks) {
      task.remove();
    }

    completedTasks.length = 0;
  } else {
    for (let task of tasks) {
      task.remove();
    }

    activeTasks.length = 0;
    completedTasks.length = 0;
  }

  showEmptyMessage(taskType.toLowerCase());
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
