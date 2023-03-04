document.addEventListener("click", function (event) {
  let menuButtons = document.querySelectorAll(".btn--menu");
  if (menuButtons.length == 0) return;

  let target = event.target.closest("#menu");
  if (target) return;

  for (let menuButton of menuButtons) {
    menuButton.remove();
  }
});

