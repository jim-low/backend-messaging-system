const emailInput = document.getElementById('email')
const passwordInput = document.getElementById('password')
const loginBtn = document.getElementById('login-btn')

loginBtn.addEventListener('click', async () => {
  if (emailInput.value.length === 0 || passwordInput.value.length === 0) {
    return;
  }

  const result = await login(emailInput.value, passwordInput.value, "normal");

  window.location.href = "/pages/chat/chat.html"
})
