const emailInput = document.getElementById('email')
const passwordInput = document.getElementById('password')
const loginBtn = document.getElementById('login-btn')

async function login() {
  if (emailInput.value.length === 0 || passwordInput.value.length === 0) return

  const bodyContents = {
    email: emailInput.value,
    password: passwordInput.value,
  }

  const res = await fetch('http://localhost:5000/login', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyContents)
  }).then(res => res.json())

  const data = res.data
  if (data.length === 0) {
    emailInput.classList.add("error")
    passwordInput.classList.add("error")
    return
  }

  // TODO: store user token in session storage

  window.location.href = "/pages/chat/chat.html"
}

loginBtn.addEventListener('click', async () => {
  const result = await login()
  // console.log(result)
})
