"use strict";

import listUserToDo from './user-todo.js';

window.onload = function(){
    let loggedinUser = sessionStorage.getItem("id");
    listUserToDo(loggedinUser);
}