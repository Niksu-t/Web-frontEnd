import "../css/style.css";
import "../css/snackbar.css";
import { getUsers, addUser} from "./users";
import { getItems } from "./items";
import {getEntries} from "./entries"

document.querySelector("#app").innerHTML = "Moi tässä oman APIn harjoituksia";

console.log("Scripts begin now");


const button = document.getElementsByClassName("get_items");
button[0].addEventListener("click", getItems);

const button2 = document.getElementsByClassName("get_users");
button2[0].addEventListener("click", getUsers);

const button3 = document.getElementsByClassName("get_entries");
button3[0].addEventListener("click", getEntries);

const addUserForm = document.querySelector('.formpost');
addUserForm.addEventListener('click', addUser);
