export let emptyMessage = document.createElement("p");
emptyMessage.textContent = "Your tasks will appear here.";
emptyMessage.className = "display__empty-message";

export let modalDiv = document.createElement("div");
modalDiv.classList.add("modal");

export let okBtn = document.createElement("button");
okBtn.className = "btn btn--larger above-all";

export let cancelBtn = document.createElement("button");
cancelBtn.textContent = "Cancel";
cancelBtn.className = "btn btn--larger above-all";

export let display = document.querySelector(".display");
