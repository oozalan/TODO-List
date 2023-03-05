import { modalDiv, okBtn, cancelBtn, display, activeTasks, completedTasks, isDisplayEmpty, showEmptyMessage, removeEmptyMessage, addBtn, clearBtn } from "./exports.js";

let textArea = document.createElement("textarea");
textArea.className = "text-area above-all";
textArea.style.top = document.body.clientHeight * 0.35 + "px";
textArea.style.left = document.body.clientWidth * 0.1 + "px";

addBtn.onclick = showArea;

let editBtn = document.createElement("button");
editBtn.textContent = "Edit";
editBtn.className = "btn btn--menu btn--menu-top above-all";
editBtn.onclick = showArea;

let removeBtn = document.createElement("button");
removeBtn.textContent = "Remove";
removeBtn.className = "btn btn--menu btn--menu-bottom above-all";
removeBtn.onclick = onClickRemove;

function showArea(event) {
  if (event.currentTarget.textContent.includes("Add")) {
    okBtn.textContent = "Add";
  } else {
    okBtn.textContent = "Edit";
    onClickOk.task = event.currentTarget.closest(".task");

    let taskContent = onClickOk.task.querySelector(".task__content").textContent;
    if (completedTasks.includes(onClickOk.task)) {
      textArea.value = taskContent.slice(9);
    } else {
      textArea.value = taskContent;
    }
  }

  okBtn.onclick = onClickOk;
  cancelBtn.onclick = onClickCancel;

  document.body.append(modalDiv);
  document.body.append(textArea);
  document.body.append(okBtn);
  document.body.append(cancelBtn);

  let textAreaCoords = textArea.getBoundingClientRect();
  okBtn.style.top = textAreaCoords.bottom + 4 + "px";
  okBtn.style.left = textAreaCoords.right - cancelBtn.clientWidth - okBtn.clientWidth - 4 + "px";

  cancelBtn.style.top = textAreaCoords.bottom + 4 + "px";
  cancelBtn.style.left = textAreaCoords.right - cancelBtn.clientWidth + "px";

  textArea.focus();
}

function onClickOk(event) {
  if (event.currentTarget.textContent.includes("Edit")) {
    let taskContent = onClickOk.task.querySelector(".task__content");

    if (completedTasks.includes(onClickOk.task)) {
      taskContent.innerHTML = '<span class="completed-indicator">Completed</span>' + textArea.value;
    } else {
      taskContent.textContent = textArea.value;
    }
    finish();
    return;
  }

  let value = textArea.value;

  if (isDisplayEmpty()) removeEmptyMessage();

  let task = document.createElement("div");
  task.classList.add("task");
  activeTasks.push(task);
  display.append(task);

  let taskContent = document.createElement("p");
  taskContent.classList.add("task__content");
  taskContent.textContent = value;
  task.append(taskContent);

  let taskSideBar = document.createElement("div");
  taskSideBar.classList.add("task__sidebar");
  task.append(taskSideBar);

  let taskBtn1 = document.createElement("span");
  taskBtn1.classList.add("task__btn");
  taskBtn1.id = "menu";
  taskSideBar.append(taskBtn1);
  taskBtn1.onclick = onClickMenu;

  let taskBtn1Icon = document.createElement("i");
  taskBtn1Icon.className = "fa-solid fa-ellipsis";
  taskBtn1.append(taskBtn1Icon);

  let taskBtn2 = document.createElement("span");
  taskBtn2.classList.add("task__btn");
  taskSideBar.append(taskBtn2);
  taskBtn2.onclick = onClickDone;

  let taskBtn2Icon = document.createElement("i");
  taskBtn2Icon.className = "fa-solid fa-check";
  taskBtn2.append(taskBtn2Icon);

  finish();
}

function onClickCancel(event) {
  finish();
}

function onClickMenu(event) {
  let task = event.currentTarget.closest(".task");

  if (task.querySelectorAll(".btn--menu").length != 0) {
    editBtn.remove();
    removeBtn.remove();
    return;
  }

  task.append(editBtn);
  task.append(removeBtn);

  let coords = event.currentTarget.getBoundingClientRect();
  editBtn.style.top = coords.top + "px";
  editBtn.style.left = coords.left - editBtn.clientWidth - 4 + "px";

  removeBtn.style.top = coords.top + editBtn.clientHeight + "px";
  removeBtn.style.left = coords.left - removeBtn.clientWidth - 4 + "px";
}

function onClickRemove(event) {
  let task = event.currentTarget.closest(".task");

  let index = activeTasks.indexOf(task);
  activeTasks.splice(index, 1);

  task.remove();

  if (isDisplayEmpty()) showEmptyMessage("active");
}

function onClickDone(event) {
  let task = event.currentTarget.closest(".task");

  let index = activeTasks.indexOf(task);
  activeTasks.splice(index, 1);

  completedTasks.push(task);
  task.remove();

  let doneBtn = task.querySelector(".task__btn:nth-of-type(2)");
  doneBtn.remove();

  let taskContent = task.querySelector(".task__content");
  taskContent.innerHTML = '<span class="completed-indicator">Completed</span>' + taskContent.innerHTML;

  let taskType = clearBtn.textContent.slice(1).split(" ")[1];

  if (taskType == "Active") {
    if (isDisplayEmpty()) showEmptyMessage("active");
    return;
  }

  display.append(task);
}

function finish() {
  textArea.remove();
  okBtn.remove();
  cancelBtn.remove();
  modalDiv.remove();
  textArea.value = "";
}
