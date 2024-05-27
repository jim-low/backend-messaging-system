const containers = document.querySelectorAll('.container')
const dashboardButtons = document.querySelectorAll('.dashboard-button')
let usersList = []

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

fetch('http://localhost:5000/super-admin/get-users', {
  headers: {
    "authorization": localStorage.getItem("token")
  }
})
  .then(res => {
    return res.json()
  })
  .then(res => {
    res.data.forEach(data => {
      const getOption = document.createElement('option')
      getOption.value = `${data.user_id} ${data.role}`
      getOption.innerText = data.username

      const updateOption = document.createElement('option')
      updateOption.value = `${data.user_id} ${data.role}`
      updateOption.innerText = data.username

      const deleteOption = document.createElement('option')
      deleteOption.value = `${data.user_id} ${data.role}`
      deleteOption.innerText = data.username

      getUserStuff.selectInput.appendChild(getOption)
      updateUserStuff.selectInput.appendChild(updateOption)
      deleteUserStuff.selectInput.appendChild(deleteOption)
    })
  })
  .catch(err => {
    console.error(err)
  })

getUserStuff.selectInput.addEventListener('change', () => {
  const selected = getUserStuff.selectInput.value.split(" ")[0]

  fetch(`http://localhost:5000/super-admin/get-user/${selected}`)
    .then(res => {
      return res.json()
    })
    .then(res => {
      const data = res.data;
      const username = document.createElement("p");
      username.innerText = `Username: ${data.username}`

      const email = document.createElement("p");
      email.innerText = `Email: ${data.email}`

      const accountType = document.createElement("p");
      accountType.innerText = `accountType: ${data.role}`

      getUserStuff.resultsContainer.innerHTML = ""
      getUserStuff.resultsContainer.appendChild(username)
      getUserStuff.resultsContainer.appendChild(email)
      getUserStuff.resultsContainer.appendChild(accountType)
    })
})

updateUserStuff.submitButton.addEventListener('click', () => {
  const userId = updateUserStuff.selectInput.value.split(" ")[0]
  const newUsername = updateUserStuff.usernameInput.value
  const newEmail = updateUserStuff.emailInput.value

  if ([userId.length, newUsername.length, newEmail.length].includes(0)) {
    console.log("haha credentials go brr")
    return
  }

  const bodyContent = {
    userId,
    newUsername,
    newEmail,
  };
  fetch(`http://localhost:5000/super-admin/update-user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(bodyContent)
  })
  .then(res => {
      return res.json()
    })
    .then(res => {
      console.log(res)
    })
  .catch(err => {
      console.error("error updating user details")
      console.error(err)
    })

})

deleteUserStuff.submitButton.addEventListener('click', () => {
  if (deleteUserStuff.selectInput.value.length === 0) {
    console.log("haha credentials go brr")
    return
  }

  const bodyContent = {
    userId: deleteUserStuff.selectInput.value.split(" ")[0],
    accountType: deleteUserStuff.selectInput.value.split(" ")[1],
  }
  fetch('http://localhost:5000/super-admin/delete-user', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(bodyContent)
  })
  .then(res => {
      return res.json()
    })
  .then(res => {
      console.log(res)
    })
})
