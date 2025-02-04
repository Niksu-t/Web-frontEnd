const tables = document.getElementsByClassName("styled-table");
const tableBody = tables[1].getElementsByTagName("tbody")[0];

const addButtonEventListeners = () => {
  document.querySelectorAll(".check").forEach((button) => {
    button.addEventListener("click", async (event) => {
      const userId = event.target.dataset.id;
      alert(`Showing info for user ID: ${userId}`);
      getUserDataById(userId);
    });
  });
};

const getUsers = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/users");
    const users = await response.json();
    while (tableBody.hasChildNodes()) {
      tableBody.removeChild(tableBody.firstChild);
    }
    users.forEach((user) => {
      const row = document.createElement("tr");

      row.innerHTML = `
              <td>${user.username}</td>
              <td>${user.email}</td>
              <td><button class="check" data-id="${user.id}">Info</button></td>
              <td><button class="del" data-id="${user.id}">Delete</button></td>
              <td>${user.id}</td>
            `;

      tableBody.appendChild(row);
    });
  } catch (error) {
    console.log("Error", error);
  }
  addButtonEventListeners();
};

const addUser = async (event) => {
  event.preventDefault();
  const url = "http://localhost:3000/api/users";
  const username = document.querySelector("#username").value.trim();
  const password = document.querySelector("#password").value.trim();
  const email = document.querySelector("#email").value.trim();
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
      }),
    });
    const content = await response.json();
  } catch (error) {
    console.log("Error", error);
  }
};

const getUserDataById = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/users/${id}`);
    const data = await response.json();
    console.log(data);
    const username = data.username;
    const password = data.password;
    const email = data.email;
    alert(
      `Username: ${username}, Password: ${password}, Email: ${email}, Id: ${id}`
    );
  } catch (error) {
    consolel.log("Error", error);
  }
};

export { getUsers, addUser };
