const isVisible = "is-visible";

function openUserModal() {
  let modal = document.getElementById("modal-signup");

  modal.classList.add(isVisible);
}

function modalCloseHandler() {
  let closeBtn = document.getElementById("close-modal");
  closeBtn.addEventListener("click", function () {
    let modal = document.getElementById("modal-signup");
    modal.classList.remove(isVisible);
  });

  document.addEventListener("click", (e) => {
    if (e.target == document.querySelector(".modal.is-visible")) {
      let modal = document.getElementById("modal-signup");
      modal.classList.remove(isVisible);
    }
  });

  document.addEventListener("keyup", (e) => {
    if (e.key == "Escape" && document.querySelector(".modal.is-visible")) {
      let modal = document.getElementById("modal-signup");
      modal.classList.remove(isVisible);
    }
  });
}

modalCloseHandler();
