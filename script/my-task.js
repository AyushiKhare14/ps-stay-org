"use strict";

import  {setUserName, logout, displayData, displayTodoData}  from './utilities.js';

window.onload = function(){
    setUserName();

    let loggedinUser = sessionStorage.getItem("id");
    displayData(loggedinUser);
    
}

document.getElementById ("logout").addEventListener ("click", logout, false);

let flexSwitchCheckChecked = document.getElementById("flexSwitchCheckChecked");
flexSwitchCheckChecked.onclick = function(){
    let loggedinUser = sessionStorage.getItem("id");
    displayData(loggedinUser);
}

let flexSwitchCheckChecked1 = document.getElementById("flexSwitchCheckChecked1");
flexSwitchCheckChecked1.onclick = function(){
    let loggedinUser = sessionStorage.getItem("id");
    displayData(loggedinUser);
}

let flexSwitchCheckChecked2 = document.getElementById("flexSwitchCheckChecked2");
flexSwitchCheckChecked2.onclick = function(){
    let loggedinUser = sessionStorage.getItem("id");
    displayData(loggedinUser);
}

