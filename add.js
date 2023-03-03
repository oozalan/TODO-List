let modalDiv = document.createElement("div");
modalDiv.classList.add("modal");

let textArea = document.createElement("textarea");
textArea.classList.add("text-area");
textArea.style.zIndex = 1001;
textArea.style.top = document.body.clientHeight * 0.35 + "px";
textArea.style.left = document.body.clientWidth * 0.1 + "px";

let okBtn = document.createElement("button");
okBtn.textContent = "Add";
okBtn.classList.add("btn");
okBtn.style.position = "absolute";
okBtn.style.zIndex = 1001;

let cancelBtn = document.createElement("button");
cancelBtn.textContent = "Cancel";
cancelBtn.classList.add("btn");
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
};

okBtn.onclick = function (event) {
  let value = textArea.value;

  let task = document.createElement("div");
  task.classList.add("task");

  let display = document.querySelector(".display");
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
  taskSideBar.append(taskBtn1);

  let taskBtn1Icon = document.createElement("i");
  taskBtn1Icon.className = "fa-solid fa-ellipsis";
  taskBtn1.append(taskBtn1Icon);

  let taskBtn2 = document.createElement("span");
  taskBtn2.classList.add("task__btn");
  taskSideBar.append(taskBtn2);

  let taskBtn2Icon = document.createElement("i");
  taskBtn2Icon.className = "fa-solid fa-check";
  taskBtn2.append(taskBtn2Icon);

  textArea.remove();
  okBtn.remove();
  cancelBtn.remove();
  modalDiv.remove();
  textArea.value = "";
};

cancelBtn.onclick = function (event) {
  textArea.remove();
  okBtn.remove();
  cancelBtn.remove();
  modalDiv.remove();
  textArea.value = "";
};
