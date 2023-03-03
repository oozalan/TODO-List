import { modalDiv, display, emptyMessage } from "./elements.js";

let clearPrompt = document.createElement("p");
clearPrompt.classList.add("clear-prompt");
clearPrompt.textContent = "Are you sure you want to clear all tasks?";
clearPrompt.style.top = document.body.clientHeight * 0.35 + "px";
clearPrompt.style.left = document.body.clientWidth * 0.1 + "px";

let confirmBtn = document.createElement("button");
confirmBtn.textContent = "Clear All";
confirmBtn.className = "btn btn--larger";
confirmBtn.style.position = "absolute";
confirmBtn.style.zIndex = 1001;

let cancelBtn = document.createElement("button");
cancelBtn.textContent = "Cancel";
cancelBtn.className = "btn btn--larger";
cancelBtn.style.position = "absolute";
cancelBtn.style.zIndex = 1001;

let clearBtn = document.querySelector(".control .btn:nth-of-type(2)");
clearBtn.onclick = function (event) {
  document.body.append(modalDiv);
  document.body.append(clearPrompt);
  document.body.append(confirmBtn);
  document.body.append(cancelBtn);

  let clearPromptCoords = clearPrompt.getBoundingClientRect();
  confirmBtn.style.top = clearPromptCoords.bottom + 4 + "px";
  confirmBtn.style.left = clearPromptCoords.right - cancelBtn.clientWidth - confirmBtn.clientWidth - 4 + "px";

  cancelBtn.style.top = clearPromptCoords.bottom + 4 + "px";
  cancelBtn.style.left = clearPromptCoords.right - cancelBtn.clientWidth + "px";
}

cancelBtn.onclick = function (event) {
  finish();
}

confirmBtn.onclick = function (event) {
  let tasks = document.querySelectorAll(".display .task");

  if (tasks.length == 0) {
    finish();
    return;
  }

  for (let task of tasks) {
    task.remove();
    task = null;
  }

  display.classList.add("display--empty");
  display.append(emptyMessage);

  finish();
}

function finish() {
  clearPrompt.remove();
  confirmBtn.remove();
  cancelBtn.remove();
  modalDiv.remove();
}
