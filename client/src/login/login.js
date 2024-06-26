async function login(email, password, loginType) {
  const bodyContents = {
    email,
    password
  }

  const res = await fetch(`http://localhost:5000/login/${loginType}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyContents)
  });
  if (!res.ok) {
    console.error("There seems to be an error while logging in")
    return false
  }

  const result = await res.json();
  localStorage.setItem("token", result.token)
  localStorage.setItem("username", result.username)
  localStorage.setItem("loginType", loginType)
  return true
}
