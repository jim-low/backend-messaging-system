const emailInput = document.getElementById('email')
const passwordInput = document.getElementById('password')
const loginBtn = document.getElementById('login-btn')

loginBtn.addEventListener('click', async () => {
  if (emailInput.value.length === 0 || passwordInput.value.length === 0) {
    return;
  }

  const result = await login(emailInput.value, passwordInput.value, "normal");

  if (result.length === 0) {
    emailInput.classList.add("error");
    passwordInput.classList.add("error");
    return;
  }

  // TODO: store user token in session storage

  window.location.href = "/pages/chat/chat.html"
})
