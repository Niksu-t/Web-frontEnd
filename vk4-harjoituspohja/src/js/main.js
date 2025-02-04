import "../css/style.css";
import "../css/snackbar.css";
import { getUsers, addUser} from "./users";
import { getItems } from "./items";

document.querySelector("#app").innerHTML = "Moi tässä oman APIn harjoituksia";

console.log("Scripts begin now");


const button = document.getElementsByClassName("get_items");
button[0].addEventListener("click", getItems);

const button2 = document.getElementsByClassName("get_users");
button2[0].addEventListener("click", getUsers);

const addUserForm = document.querySelector('.formpost');
addUserForm.addEventListener('click', addUser);
