const loginCtaId = "login-cta";
const signUpCtaId = "signup-cta";
const loginFormContainerId = "login-form-container";
const signUpFormContainerId = "signup-form-container";

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
