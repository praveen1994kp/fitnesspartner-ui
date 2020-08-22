const LOGIN_API_URL = "http://localhost:8080/user/login";
const SIGNUP_API_URL = "http://localhost:8080/user";
const UPDATE_USER_API_URL = "http://localhost:8080/user";

function sendLoginRequest(loginInfo) {
  return fetch(LOGIN_API_URL, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginInfo),
  });
}

function sendSignUpRequest(signupInfo) {
  return fetch(SIGNUP_API_URL, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(signupInfo),
  });
}

function updateUserData(userData, email) {
  return fetch(
    UPDATE_USER_API_URL +
      "?" +
      new URLSearchParams({
        email: email,
      }).toString(),
    {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }
  );
}
