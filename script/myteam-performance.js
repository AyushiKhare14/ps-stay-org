"use strict";

import  {setUserName, logout}  from './utilities.js';

window.onload = function(){
    setUserName();

    let loggedinUser = sessionStorage.getItem("id");
    //displayData(loggedinUser);
    
}

document.getElementById ("logout").addEventListener ("click", logout, false);