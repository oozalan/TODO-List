import { addBtn, clearBtn, display, content } from "./exports.js";
import { modalDiv, okBtn, cancelBtn, activeTasks, completedTasks } from "./exports.js";
import { isDisplayEmpty, showEmptyMessage, removeEmptyMessage } from "./exports.js";

let popup = document.createElement("div");
popup.className = "popup";

let textArea = document.createElement("textarea");
textArea.className = "popup__content text-area";
textArea.setAttribute("placeholder", "Type here what you want to do.");

let popupControl = document.createElement("div");
popupControl.className = "popup__control";

let dropdown = document.createElement("div");
dropdown.className = "dropdown task__dropdown";

let editBtn = document.createElement("button");
editBtn.textContent = "Edit";
editBtn.className = "btn";

let removeBtn = document.createElement("button");
removeBtn.textContent = "Remove";
removeBtn.className = "btn";

dropdown.append(editBtn);
dropdown.append(removeBtn);

addBtn.onclick = showArea;
editBtn.onclick = showArea;
removeBtn.onclick = onClickRemove;

function showArea(event) {
  if (event.currentTarget.textContent.includes("Add")) {
    okBtn.textContent = "Add";
  } else {
    okBtn.textContent = "Edit";
    onClickOk.task = event.currentTarget.closest(".task");
    textArea.value = onClickOk.task.querySelector(".task__content").textContent;
  }

  okBtn.onclick = onClickOk;
  cancelBtn.onclick = onClickCancel;

  modalDiv.append(popup);
  popup.append(textArea);
  popup.append(popupControl);
  popupControl.append(okBtn);
  popupControl.append(cancelBtn);
  content.append(modalDiv);
  textArea.focus();
}

function onClickOk(event) {
  if (event.currentTarget.textContent.includes("Edit")) {
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

  let taskBtnMenu = document.createElement("button");
  taskBtnMenu.classList.add("btn");
  taskSideBar.append(taskBtnMenu);
  taskBtnMenu.onclick = onClickMenu;

  let taskBtnMenuIcon = document.createElement("i");
  taskBtnMenuIcon.className = "fa-solid fa-ellipsis";
  taskBtnMenu.append(taskBtnMenuIcon);

  let taskBtnComplete = document.createElement("button");
  taskBtnComplete.classList.add("btn");
  taskSideBar.append(taskBtnComplete);
  taskBtnComplete.onclick = onClickDone;

  let taskBtnCompleteIcon = document.createElement("i");
  taskBtnCompleteIcon.className = "fa-solid fa-check";
  taskBtnComplete.append(taskBtnCompleteIcon);

  finish();
}

function onClickCancel(event) {
  finish();
}

function onClickMenu(event) {
  let taskDropdown = document.querySelector(".task__dropdown");
  if (taskDropdown) {
    taskDropdown.remove();
    return;
  }

  let task = event.currentTarget.closest(".task");
  let taskSidebar = task.querySelector(".task__sidebar");
  taskSidebar.append(dropdown);
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
  let taskType = clearBtn.textContent.slice(1).split(" ")[1].toLowerCase();
  if (isDisplayEmpty()) showEmptyMessage(taskType);
}

function onClickDone(event) {
  let task = event.currentTarget.closest(".task");

  let index = activeTasks.indexOf(task);
  activeTasks.splice(index, 1);

  completedTasks.push(task);
  task.remove();

  let doneBtn = task.querySelector(".task__sidebar>.btn:nth-of-type(2)");
  doneBtn.remove();

  let taskType = clearBtn.textContent.slice(1).split(" ")[1];

  if (taskType == "Active") {
    if (isDisplayEmpty()) showEmptyMessage("active");
    return;
  }

  display.append(task);
}

function finish() {
  popup.remove();
  modalDiv.remove();
  textArea.value = "";
}
