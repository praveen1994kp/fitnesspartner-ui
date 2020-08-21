const isVisible = "modal-active";

function makeElementVisible(id) {
  let modal = document.getElementById(id);

  modal.classList.add(isVisible);
}

function openModal(event) {
  const targetModalId = event.target.dataset.target;
  makeElementVisible(targetModalId);
}

function closeModal() {
  let modal = document.querySelector(".modal-bg.modal-active");
  modal.classList.remove(isVisible);
  resetUserForm();
}

function modalCloseHandlers() {
  let closebtnicons = document.querySelectorAll(
    ".modal .icon.fa.fa-times-circle"
  );
  closebtnicons.forEach(function (closeBtn) {
    closeBtn.addEventListener("click", function (event) {
      closeModal();
    });
  });

  document.addEventListener("click", (e) => {
    if (e.target == document.querySelector(".modal-bg.modal-active")) {
      closeModal();
    }
  });

  document.addEventListener("keyup", (e) => {
    if (e.key == "Escape" && document.querySelector(".modal-bg.modal-active")) {
      closeModal();
    }
  });
}

modalCloseHandlers();
