import '../css/style.css';
import '../css/snackbar.css';
import {fetchData} from './fetch.js';

console.log('Moi luodaan nyt tokeneita ja kirjaudutaan sisään');


const authButton = document.getElementById('meRequest');
const clearButton = document.getElementById('clearButton');

// Esimerkin takia haut ovat nyt suoraan tässä tiedostossa, jotta harjoitus ei sekoita
// teidän omaa projektin rakennetta

const registerUser = async (event) => {
  event.preventDefault();

  // Haetaan oikea formi
  const registerForm = document.querySelector('.registerForm');

  // Haetaan formista arvot
  const username = registerForm.querySelector('#username').value.trim();
  const password = registerForm.querySelector('#password').value.trim();
  const email = registerForm.querySelector('#email').value.trim();

  // Luodaan body lähetystä varten taustapalvelun vaatimaan muotoon
  const bodyData = {
    username: username,
    password: password,
    email: email,
  };

  // Endpoint
  const url = 'http://localhost:3000/api/ users';

  // Options
  const options = {
    body: JSON.stringify(bodyData),
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
  };
  console.log(options);

  // Hae data
  const response = await fetchData(url, options);

  if (response.error) {
    console.error('Error adding a new user:', response.error);
    return;
  }

  if (response.message) {
    console.log(response.message, 'success');
  }

  console.log(response);
  registerForm.reset(); // tyhjennetään formi
};

const loginUser = async (event) => {
  event.preventDefault();

  const loginForm = document.querySelector('.loginForm');
  
  console.log(loginForm);

  const username = loginForm.querySelector('.username').value.trim();
  const password = loginForm.querySelector('.password').value.trim();
  
  console.log(username, password);

  const bodyData = {
    username: username,
    password: password,
  };
  const url = 'http://localhost:3000/api/auth/login';
  console.log(bodyData);

  const options = {
    body : JSON.stringify(bodyData),
    method : 'POST',
    headers : {
      'Content-type': 'application/json',
    },
  };
  console.log(options);
  const response = await fetchData(url, options);

  if (response.error) {
    console.log('Error logging in: ', response.error);
    return;
  }
  if (response.message) {
    console.log('success');
  }
  
  localStorage.setItem('token', response.token);
  console.log(response);
  loginForm.reset();

}

const authenticatedReq = async (event) => {
  event.preventDefault();
  const url = 'http://localhost:3000/api/users';
  let headers = {};
  let token = localStorage.getItem('token');

  if (token) {
    headers = {
      Authorization: `Bearer ${localStorage.token}`,
    };
  }
  const options = {
    headers: headers,
  };

  const users = await fetchData(url, options);

  if (users.error){
    console.log('Error: ', error);
    return;
  }
  if (users.message){
    console.log('success');
  }
};

const clearStorage = async (event) => {
  event.preventDefault();
  localStorage.removeItem('token');
  console.log('Token removed');
}

const registerForm = document.querySelector('.registerForm');
registerForm.addEventListener('submit', registerUser);
const loginForm = document.querySelector('.loginForm');
loginForm.addEventListener('submit', loginUser);  
authButton.addEventListener('click', authenticatedReq);
clearButton.addEventListener('click', clearStorage);