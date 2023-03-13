document.addEventListener("click", function (event) {
  let target = event.target.closest(".task__sidebar > .btn:first-of-type");
  if (target) return;

  let taskDropdowns = document.querySelectorAll(".task__dropdown");

  for (let taskDropdown of taskDropdowns) {
    if (!taskDropdown.classList.contains("invisible")) taskDropdown.classList.add("invisible");
  }
});

document.addEventListener("click", function (event) {
  let controlDropdown = document.querySelector(".control__dropdown");
  if (!controlDropdown) return;

  let target = event.target.closest(".control > .btn:last-of-type");
  if (target) return;

  controlDropdown.remove();
});

document.addEventListener("pointerdown", function (event) {
  let targetDown = event.target.closest(".btn");

  if (targetDown) {
    onPointerUp.targetDown = targetDown;
    document.addEventListener("pointerup", onPointerUp);
  }
});

function onPointerUp(event) {
  onPointerUp.targetDown.blur();
  document.removeEventListener("pointerup", onPointerUp);
}

