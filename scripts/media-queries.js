import { addBtn, clearBtn, listBtn, content, activeTasks, completedTasks } from "./exports.js";
import { mql600, mql1040 } from "./exports.js";

function handleMql600(e) {
  if (e.matches) {
    // Buttons in the header
    addBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add';
    addBtn.removeAttribute("title");
    clearBtn.removeAttribute("title");
    list.removeAttribute("title");

    let taskType = content.getAttribute("data-task-type");
    if (taskType == "active") {
      clearBtn.innerHTML = '<i class="fa-solid fa-trash"></i> Clear Active';
      listBtn.innerHTML = 'Active <i class="fa-solid fa-caret-down"></i>';
    } else if (taskType == "completed") {
      clearBtn.innerHTML = '<i class="fa-solid fa-trash"></i> Clear Completed';
      listBtn.innerHTML = 'Completed <i class="fa-solid fa-caret-down"></i>';
    } else {
      clearBtn.innerHTML = '<i class="fa-solid fa-trash"></i> Clear All';
      listBtn.innerHTML = 'All <i class="fa-solid fa-caret-down"></i>';
    }
  } else {
    // Buttons in the header
    addBtn.innerHTML = '<i class="fa-solid fa-plus"></i>';
    clearBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    listBtn.innerHTML = '<i class="fa-solid fa-caret-down"></i>';

    addBtn.setAttribute("title", "Add");
    clearBtn.setAttribute("title", "Clear");
    listBtn.setAttribute("title", "Tasks");
  }
}

handleMql600(mql600);
mql600.addEventListener("change", handleMql600);

function handleMql1040(e) {
  let tasks = [...activeTasks, ...completedTasks];

  if (e.matches) {
    for (let task of tasks) {
      let taskSidebar = task.querySelector(".task__sidebar");
      let taskDropdown = task.querySelector(".task__dropdown");
      let menuBtn = taskSidebar.querySelector(".btn:first-of-type");
      let editBtn = taskDropdown.querySelector(".btn:first-of-type");
      let removeBtn = taskDropdown.querySelector(".btn:last-of-type");

      editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
      editBtn.setAttribute("title", "Edit");
      removeBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
      removeBtn.setAttribute("title", "Remove");

      taskDropdown.classList.add("invisible");
      menuBtn.classList.add("invisible");
      menuBtn.after(editBtn);
      taskSidebar.append(removeBtn);
    }
  } else {
    for (let task of tasks) {
      let taskSidebar = task.querySelector(".task__sidebar");
      let taskDropdown = task.querySelector(".task__dropdown");
      let menuBtn = taskSidebar.querySelector(".btn:first-of-type");
      let editBtn = taskSidebar.querySelector(".btn:nth-of-type(2)");
      let removeBtn = taskSidebar.querySelector(".btn:last-of-type");

      editBtn.innerHTML = 'Edit';
      editBtn.removeAttribute("title");
      removeBtn.innerHTML = 'Remove';
      removeBtn.removeAttribute("title");

      menuBtn.classList.remove("invisible");
      taskDropdown.append(editBtn);
      taskDropdown.append(removeBtn);
    }
  }
}

handleMql1040(mql1040);
mql1040.addEventListener("change", handleMql1040);
