const isVisible = "modal-active";
const loginCtaId = "login-cta";
const signUpCtaId = "signup-cta";
const loginFormContainerId = "login-form-container";
const signUpFormContainerId = "signup-form-container";

function handleBmiSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const state = {
    age: formData.get("age"),
    gender: formData.get("gender"),
    weight: formData.get("weight"),
    height: formData.get("height"),
  };
  state.bmi = state.weight / (((state.height / 100) * state.height) / 100);
  console.log(state);
  sessionStorage.setItem("bmi", state);
}

function makeElementVisible(id) {
  let modal = document.getElementById(id);

  modal.classList.add(isVisible);
}

function openUserModal() {
  makeElementVisible("user-modal");
}

function openCalculatorModal() {
  makeElementVisible("calculator-modal");
}

function modalCloseHandler(modalId) {
  let closebtnicons = [];
  closebtnicons.push(document.getElementById("close-icon"));
  closebtnicons.push(document.getElementById("close-icon-calc"));
  closebtnicons.forEach(function (closeBtn) {
    closeBtn.addEventListener("click", function () {
      let modal = document.getElementById(modalId);
      modal.classList.remove(isVisible);
      resetUserForm();
    });
  });

  document.addEventListener("click", (e) => {
    if (e.target == document.querySelector(".modal-bg.modal-active")) {
      let modal = document.getElementById(modalId);
      modal.classList.remove(isVisible);
      resetUserForm();
    }
  });

  document.addEventListener("keyup", (e) => {
    if (e.key == "Escape" && document.querySelector(".modal-bg.modal-active")) {
      let modal = document.getElementById(modalId);
      modal.classList.remove(isVisible);
      resetUserForm();
    }
  });
}

modalCloseHandler("user-modal");
modalCloseHandler("calculator-modal");

function setupFormNavActions(ctaId, formId, others) {
  let selectorEl = document.getElementById(ctaId);
  selectorEl.addEventListener("click", function () {
    others.forEach((idToBeRemoved) => {
      const elementToBeRemoved = document.getElementById(idToBeRemoved);
      elementToBeRemoved.classList.remove("active");
    });
    let formEl = document.getElementById(formId);
    const isAlreadyActive = formEl.classList.contains("active");
    !isAlreadyActive && formEl.classList.add("active");
  });
}

function resetUserForm() {
  const signUpActive = document
    .getElementById(signUpFormContainerId)
    .classList.contains("active");
  if (signUpActive) {
    document.getElementById(signUpFormContainerId).remove("active");
    document.getElementById(loginFormContainerId).classList.add("active");
  }
}

function userNavBarActions() {
  setupFormNavActions(
    loginCtaId,
    loginFormContainerId,
    new Array(signUpFormContainerId)
  );
  setupFormNavActions(
    signUpCtaId,
    signUpFormContainerId,
    new Array(loginFormContainerId)
  );
}

userNavBarActions();
