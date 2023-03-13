import { addBtn, display, content } from "./exports.js";
import { modalDiv, okBtn, cancelBtn, activeTasks, completedTasks } from "./exports.js";
import { isDisplayEmpty, showEmptyMessage, removeEmptyMessage, makeAllNonTabbable, makeAllTabbable } from "./exports.js";
import { mql1040 } from "./exports.js";

let popup = document.createElement("div");
popup.className = "popup";

let textArea = document.createElement("textarea");
textArea.className = "popup__content text-area";
textArea.setAttribute("placeholder", "Type here what you want to do.");

let popupControl = document.createElement("div");
popupControl.className = "popup__control";

addBtn.onclick = showArea;

function showArea(event) {
  if (event.currentTarget == addBtn) {
    okBtn.textContent = "Add";
  } else {
    okBtn.textContent = "Edit";
    onClickOk.task = event.currentTarget.closest(".task");
    textArea.value = onClickOk.task.querySelector(".task__content").textContent;
  }

  okBtn.onclick = onClickOk;
  cancelBtn.onclick = onClickCancel;

  makeAllNonTabbable();

  modalDiv.append(popup);
  popup.append(textArea);
  popup.append(popupControl);
  popupControl.append(okBtn);
  popupControl.append(cancelBtn);
  content.append(modalDiv);
  textArea.focus();
}

function onClickOk(event) {
  if (onClickOk.task) {
    let taskContent = onClickOk.task.querySelector(".task__content");
    taskContent.textContent = textArea.value;
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
  taskSideBar.className = "dropdown task__sidebar";
  task.append(taskSideBar);

  let menuBtn = document.createElement("button");
  menuBtn.classList.add("btn");
  menuBtn.innerHTML = '<i class="fa-solid fa-ellipsis"></i>';
  menuBtn.setAttribute("title", "Menu");
  menuBtn.onclick = onClickMenu;
  taskSideBar.append(menuBtn);

  let completeBtn = document.createElement("button");
  completeBtn.classList.add("btn");
  completeBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
  completeBtn.setAttribute("title", "Complete");
  completeBtn.onclick = onClickDone;
  taskSideBar.append(completeBtn);

  let taskDropdown = document.createElement("div");
  taskDropdown.className = "dropdown task__dropdown invisible";
  taskSideBar.append(taskDropdown);

  let editBtn = document.createElement("button");
  editBtn.className = "btn";
  editBtn.onclick = showArea;

  let removeBtn = document.createElement("button");
  removeBtn.className = "btn";
  removeBtn.onclick = onClickRemove;

  if (mql1040.matches) {
    editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
    editBtn.setAttribute("title", "Edit");
    removeBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    removeBtn.setAttribute("title", "Remove");

    menuBtn.after(editBtn);
    taskSideBar.append(removeBtn);
    menuBtn.classList.add("invisible");
  } else {
    editBtn.textContent = "Edit";
    removeBtn.textContent = "Remove";
    taskDropdown.append(editBtn);
    taskDropdown.append(removeBtn);
  }

  finish();
}

function onClickCancel(event) {
  finish();
}

function onClickMenu(event) {
  let task = event.currentTarget.closest(".task");
  let taskDropdown = task.querySelector(".task__dropdown");

  let isVisible;
  if (taskDropdown.classList.contains("invisible")) isVisible = false;
  else isVisible = true;

  let dropdowns = document.querySelectorAll(".task__dropdown");
  for (let dropdown of dropdowns) {
    dropdown.classList.add("invisible");
  }

  if (!isVisible) taskDropdown.classList.remove("invisible");
}

function onClickRemove(event) {
  let task = event.currentTarget.closest(".task");

  if (activeTasks.includes(task)) {
    let index = activeTasks.indexOf(task);
    activeTasks.splice(index, 1);
  } else {
    let index = completedTasks.indexOf(task);
    completedTasks.splice(index, 1);
  }

  task.remove();
  if (isDisplayEmpty()) showEmptyMessage(content.getAttribute("data-task-type"));
}

function onClickDone(event) {
  let task = event.currentTarget.closest(".task");

  let index = activeTasks.indexOf(task);
  activeTasks.splice(index, 1);

  completedTasks.push(task);
  task.remove();

  let doneBtn;
  if (mql1040.matches) {
    doneBtn = task.querySelector(".task__sidebar>.btn:nth-of-type(3)");
  } else {
    doneBtn = task.querySelector(".task__sidebar>.btn:nth-of-type(2)");
  }

  doneBtn.remove();

  let statusIndicator = document.createElement("span");
  statusIndicator.className = "status-indicator";

  let check = document.createElement("i");
  check.className = "fa-solid fa-check";

  statusIndicator.append(check);
  task.append(statusIndicator);

  let taskContent = task.querySelector(".task__content");
  taskContent.classList.add("indented");

  let taskType = content.getAttribute("data-task-type");

  if (taskType == "active") {
    if (isDisplayEmpty()) showEmptyMessage(taskType);
    return;
  }

  display.append(task);
}

function finish() {
  popup.remove();
  modalDiv.remove();
  textArea.value = "";
  makeAllTabbable();
  onClickOk.task = null;
}
