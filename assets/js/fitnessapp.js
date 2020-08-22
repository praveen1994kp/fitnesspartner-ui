function navigateTo(path = "/") {
  window.location.href = path;
}

function refreshSessionInfo() {
  let sessionInfoEl = document.getElementById("session-info");
  const sessionInfo = getSessionInfo().loggedIn ? "Logout" : "Login";
  sessionInfoEl.innerHTML = sessionInfo;
}

function updateSessionInfo(data) {
  sessionStorage.setItem("user", JSON.stringify(data));
}

function getSessionInfo() {
  try {
    return JSON.parse(sessionStorage.getItem("user"));
  } catch (ex) {
    console.error(ex);
    return null;
  }
}

async function handleLogin(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const loginInfo = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const sessionInfo = getSessionInfo();
  const loginResponse = await sendLoginRequest(loginInfo);
  if (loginResponse.status === 200) {
    const data = await loginResponse.json();
    if (sessionInfo && sessionInfo.weightInKg && sessionInfo.heightInCm) {
      updateUserDataToBackend(sessionInfo, data.email);
      closeModal();
      navigateTo("/diet-plan.html");
      refreshSessionInfo();
    } else {
      data.loggedIn = true;
      updateSessionInfo(data);
      refreshSessionInfo();
      closeModal();
      navigateTo("/diet-plan.html");
    }
  } else {
    //TODO: handle login failure
  }
}

async function handleSignup(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const loginInfo = {
    email: formData.get("signupemail"),
    firstName: formData.get("firstname"),
    lastName: formData.get("lastname"),
    password: formData.get("signuppassword"),
  };
  const signUpResponse = await sendSignUpRequest(loginInfo);
  if (signUpResponse.status === 200) {
    const data = await signUpResponse.json();
    sessionInfo = getSessionInfo();
    if (sessionInfo && sessionInfo.weightInKg && sessionInfo.heightInCm) {
      updateUserDataToBackend(sessionInfo, data.email);
      closeModal();
      navigateTo("/diet-plan.html");
      refreshSessionInfo();
    } else {
      data.loggedIn = true;
      updateSessionInfo(data);
      refreshSessionInfo();
      closeModal();
      navigateTo("/diet-plan.html");
    }
  } else {
    //TODO: handle login failure
  }
}

async function updateUserDataToBackend(state, email) {
  const updatedDataFromApi = await updateUserData(state, email);

  if (updatedDataFromApi.status === 200) {
    const data = await updatedDataFromApi.json();
    data.loggedIn = true;
    updateSessionInfo(data);
  }
}

async function handleBmiSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const state = {
    age: formData.get("age"),
    gender: formData.get("gender"),
    weightInKg: formData.get("weight"),
    heightInCm: formData.get("height"),
  };
  state.bmi =
    state.weightInKg / (((state.heightInCm / 100) * state.heightInCm) / 100);
  const sessionInfo = getSessionInfo();
  if (sessionInfo && sessionInfo.loggedIn) {
    updateUserDataToBackend(state, sessionInfo.email);
  } else {
    updateSessionInfo(state);
  }

  navigateTo("/diet-plan.html");
}
