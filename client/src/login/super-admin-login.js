const emailInput = document.getElementById('email')
const passwordInput = document.getElementById('password')
const loginBtn = document.getElementById('login-btn')

async function login() {
  if (emailInput.value.length === 0 || passwordInput.value.length === 0) return

  const bodyContents = {
    email: emailInput.value,
    password: passwordInput.value,
  }

  return fetch('http://localhost:5000/login', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyContents)
  })
  .then(res => res.json())
}

loginBtn.addEventListener('click', async () => {
  const result = await login()
})
