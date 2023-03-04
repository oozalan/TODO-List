import { modalDiv, display, emptyMessage } from "./elements.js";

let textArea = document.createElement("textarea");
textArea.classList.add("text-area");
textArea.style.zIndex = 1001;
textArea.style.top = document.body.clientHeight * 0.35 + "px";
textArea.style.left = document.body.clientWidth * 0.1 + "px";

let okBtn = document.createElement("button");
okBtn.textContent = "Add";
okBtn.className = "btn btn--larger";
okBtn.style.position = "absolute";
okBtn.style.zIndex = 1001;

let cancelBtn = document.createElement("button");
cancelBtn.textContent = "Cancel";
cancelBtn.className = "btn btn--larger";
cancelBtn.style.position = "absolute";
cancelBtn.style.zIndex = 1001;

let addBtn = document.querySelector(".control .btn:first-of-type");
addBtn.onclick = function (event) {
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
};

okBtn.onclick = function (event) {
  let value = textArea.value;

  if (display.classList.contains("display--empty")) {
    display.classList.remove("display--empty");
    emptyMessage.remove();
  }

  let task = document.createElement("div");
  task.classList.add("task");
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

  let taskBtn2Icon = document.createElement("i");
  taskBtn2Icon.className = "fa-solid fa-check";
  taskBtn2.append(taskBtn2Icon);

  finish();
};

cancelBtn.onclick = function (event) {
  finish();
};

function finish() {
  textArea.remove();
  okBtn.remove();
  cancelBtn.remove();
  modalDiv.remove();
  textArea.value = "";
}

let editBtn = document.createElement("button");
editBtn.textContent = "Edit";
editBtn.className = "btn btn--menu btn--menu-top";
editBtn.style.position = "absolute";
editBtn.style.zIndex = 1001;

let removeBtn = document.createElement("button");
removeBtn.textContent = "Remove";
removeBtn.className = "btn btn--menu btn--menu-bottom";
removeBtn.style.position = "absolute";
removeBtn.style.zIndex = 1001;

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
