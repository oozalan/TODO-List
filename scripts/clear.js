import { emptyMessage, modalDiv, okBtn, cancelBtn, display } from "./exports.js";

let clearPrompt = document.createElement("p");
clearPrompt.className = "clear-prompt above-all";
clearPrompt.textContent = "Are you sure you want to clear all tasks?";
clearPrompt.style.top = document.body.clientHeight * 0.35 + "px";
clearPrompt.style.left = document.body.clientWidth * 0.1 + "px";

let clearBtn = document.querySelector(".control .btn:nth-of-type(2)");
clearBtn.onclick = function (event) {
  okBtn.textContent = "Clear All";
  okBtn.onclick = onClickOk;
  cancelBtn.onclick = onClickCancel;

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

  for (let task of tasks) {
    task.remove();
  }

  display.classList.add("display--empty");
  display.append(emptyMessage);

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
