const userDropdown = document.getElementById("user-select")
const userMessagesTable = document.querySelector(".user-messages tbody")

async function setupDropdown() {
  if (localStorage.getItem('token') == null) {
    window.location.href = "/"
    return
  }

  fetch(`http://localhost:5000/super-admin/get-users`, {
    headers: {
      'authorization': localStorage.getItem('token')
    }
  })
    .then(res => {
      return res.json()
    })
    .then(res => {
      res.data.forEach(data => {
        const option = document.createElement('option')
        option.value = data.user_id
        option.innerText = data.username

        userDropdown.appendChild(option)
      })
    })
}

const TableRowTemplate = (message, toUsername) => {
  return `
<tr>
<td>${message}</td>
<td align="right">${toUsername}</td>
</tr>
`
}

function displayMessages() {
  const userId = userDropdown.value;
  fetch(`http://localhost:5000/admin/check-messages/${userId}`, {
    headers: {
      'authorization': localStorage.getItem('token')
    }
  })
    .then(res => {
      return res.json()
    })
    .then(res => {
      userMessagesTable.innerHTML = ""
      res.data.forEach(data => {
        userMessagesTable.innerHTML += TableRowTemplate(data.message, data.to_user)
      })
    })
}

(async() => {
  await setupDropdown()
  userDropdown.value = ""
  userDropdown.addEventListener('change', displayMessages)
})()
