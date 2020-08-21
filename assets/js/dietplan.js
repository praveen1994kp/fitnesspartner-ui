function setupStats() {
  const userInfo = getSessionInfo();
  const statsAvailable =
    userInfo && userInfo.loggedIn && userInfo.heightInCm && userInfo.weightInKg;
  if (statsAvailable) {
    document.getElementById("weightValue").innerHTML = userInfo.weightInKg;
    document.getElementById("heightValue").innerHTML = userInfo.heightInCm;
    document.getElementById("bmiValue").innerHTML = userInfo.bmi;
    document.getElementById("stats-display").style.display = "block";
  } else {
    const joinUsLink = document.getElementById("join-us");
    joinUsLink.style.display = "block";
    if (userInfo && userInfo.loggedIn) {
      joinUsLink.dataset.target = "calculator-modal";
    }
  }
}

setupStats();
