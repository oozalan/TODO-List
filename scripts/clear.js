import { modalDiv, okBtn, cancelBtn, showEmptyMessage, activeTasks, completedTasks, clearBtn } from "./exports.js";

let clearPrompt = document.createElement("p");
clearPrompt.className = "clear-prompt above-all";
clearPrompt.style.top = document.body.clientHeight * 0.35 + "px";
clearPrompt.style.left = document.body.clientWidth * 0.1 + "px";

clearBtn.onclick = function (event) {
  okBtn.textContent = clearBtn.textContent.slice(1);
  okBtn.onclick = onClickOk;
  cancelBtn.onclick = onClickCancel;

  let taskType = okBtn.textContent.split(" ")[1].toLowerCase();
  clearPrompt.textContent = `Are you sure you want to clear all ${taskType} tasks?`;
  document.body.append(modalDiv);
  document.body.append(clearPrompt);
  document.body.append(okBtn);
  document.body.append(cancelBtn);

  let clearPromptCoords = clearPrompt.getBoundingClientRect();
  okBtn.style.top = clearPromptCoords.bottom + 4 + "px";
  okBtn.style.left = clearPromptCoords.right - cancelBtn.clientWidth - okBtn.clientWidth - 4 + "px";

  cancelBtn.style.top = clearPromptCoords.bottom + 4 + "px";
  cancelBtn.style.left = clearPromptCoords.right - cancelBtn.clientWidth + "px";
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
  clearPrompt.remove();
  okBtn.remove();
  cancelBtn.remove();
  modalDiv.remove();
}
