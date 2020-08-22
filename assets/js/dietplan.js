function setupStats() {
  const userInfo = getSessionInfo();
  const statsAvailable = userInfo && userInfo.heightInCm && userInfo.weightInKg;
  if (statsAvailable) {
    if (!userInfo.loggedIn) {
      const joinUsLink = document.getElementById("join-us");
      joinUsLink.innerHTML = "Join us here";
      joinUsLink.style.display = "block";
    }
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
