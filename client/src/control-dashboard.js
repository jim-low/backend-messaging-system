const containers = document.querySelectorAll('.container')
const dashboardButtons = document.querySelectorAll('.dashboard-button')

const createUserStuff = {
  usernameInput: document.getElementById("create-user-username"),
  emailInput: document.getElementById("create-user-email"),
  passwordInput: document.getElementById("create-user-password"),
  userTypeSelect: document.getElementById("create-user-type"),
  submitButton: document.getElementById("create-user-button"),
}

const getUserStuff = {
  selectInput: document.getElementById("users-dropdown"),
  resultsContainer: document.querySelector(".get-user-result")
}

const updateUserStuff = {
  selectInput: document.getElementById("update-user-dropdown"),
  usernameInput: document.getElementById("update-user-username"),
  emailInput: document.getElementById("update-user-email"),
  passwordInput: document.getElementById("update-user-password"),
  submitButton: document.getElementById("update-user-button"),
}

const deleteUserStuff = {
  selectInput: document.getElementById("delete-user-dropdown"),
  submitButton: document.getElementById("delete-user-button"),
}

containers.forEach(container => {
  container.style.display = "none"
});

dashboardButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    containers.forEach(container => {
      container.style.display = "none"
    });

    document.getElementById(btn.getAttribute('data-container')).style.display = ""
  })
});

createUserStuff.submitButton.addEventListener('click', () => {
  if ([createUserStuff.emailInput.value.length, createUserStuff.passwordInput.value.length, createUserStuff.usernameInput.value.length, createUserStuff.userTypeSelect.value.length].includes(0)) {
    console.log("haha credentials go brr")
    return
  }

  const userType = createUserStuff.userTypeSelect.value
  const bodyContent = {
    username: createUserStuff.usernameInput.value,
    password: createUserStuff.passwordInput.value,
    email: createUserStuff.emailInput.value,
  }
  console.log(bodyContent)
  fetch(`http://localhost:5000/super-admin/create-user/${userType}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(bodyContent)
  }).then(res => {
      if (!res.ok) return
      console.log("successfully created new user")
    }).catch(err => { console.error(err) })
})
