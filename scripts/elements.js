export let modalDiv = document.createElement("div");
modalDiv.classList.add("modal");

export let emptyMessage = document.createElement("p");
emptyMessage.textContent = "Your tasks will appear here.";
emptyMessage.className = "display__empty-message";

export let display = document.querySelector(".display");
