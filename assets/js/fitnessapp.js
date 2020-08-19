const isVisible = "modal-active";

function openUserModal() {
  let modal = document.getElementById("user-modal");

  modal.classList.add(isVisible);
}

function modalCloseHandler() {
  let closeBtn = document.getElementById("close-icon");
  closeBtn.addEventListener("click", function () {
    let modal = document.getElementById("user-modal");
    modal.classList.remove(isVisible);
  });

  document.addEventListener("click", (e) => {
    if (e.target == document.querySelector(".modal-bg.modal-active")) {
      let modal = document.getElementById("user-modal");
      modal.classList.remove(isVisible);
    }
  });

  document.addEventListener("keyup", (e) => {
    if (e.key == "Escape" && document.querySelector(".modal-bg.modal-active")) {
      let modal = document.getElementById("user-modal");
      modal.classList.remove(isVisible);
    }
  });
}

modalCloseHandler();
