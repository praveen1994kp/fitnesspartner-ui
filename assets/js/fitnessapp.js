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
  const loginResponse = await sendLoginRequest(loginInfo);
  if (loginResponse.status === 200) {
    const data = await loginResponse.json();
    data.loggedIn = true;
    updateSessionInfo(data);
    refreshSessionInfo();
    closeModal();
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
    data.loggedIn = true;
    updateSessionInfo(data);
    refreshSessionInfo();
    closeModal();
  } else {
    //TODO: handle login failure
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
  if (sessionInfo.loggedIn) {
    const updatedDataFromApi = await updateUserData(state, sessionInfo.email);

    if (updatedDataFromApi.status === 200) {
      const data = await updatedDataFromApi.json();
      data.loggedIn = true;
      state = data;
    }
  }
  updateSessionInfo(state);
}
