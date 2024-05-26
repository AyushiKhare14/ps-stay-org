"use strict";

import  {setUserName, displayData, displayTodoData}  from './utilities.js';

window.onload = function(){
    setUserName();
    
    initUserDropdown();
    
}


function initUserDropdown() {
    let usersList = document.getElementById("usersList");
    fetch("http://localhost:8083/api/users")
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                let newOption = new Option(data[i].name, data[i].id);
                usersList.appendChild(newOption);
            }
        });
    
    usersList.onchange = function(){
        let selectedUser = document.getElementById("usersList").value;
        displayData(selectedUser);}
};

function logout(){
    sessionStorage.clear();
    window.location.replace("../src/user-login.html");
}


let flexSwitchCheckChecked = document.getElementById("flexSwitchCheckChecked");
flexSwitchCheckChecked.onclick = function(){
    let selectedUser = document.getElementById("usersList").value;
    displayData(selectedUser);
}

let flexSwitchCheckChecked1 = document.getElementById("flexSwitchCheckChecked1");
flexSwitchCheckChecked1.onclick = function(){
    let selectedUser = document.getElementById("usersList").value;
    displayData(selectedUser);
}

let flexSwitchCheckChecked2 = document.getElementById("flexSwitchCheckChecked2");
flexSwitchCheckChecked2.onclick = function(){
    let selectedUser = document.getElementById("usersList").value;
    displayData(selectedUser);
}