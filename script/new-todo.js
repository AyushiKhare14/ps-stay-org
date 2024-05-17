"use strict";

window.onload = function (){
    let usersList = document.getElementById("usersList");
    fetch("http://localhost:8083/api/users")
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                let newOption = new Option(data[i].name, data[i].id);
                usersList.appendChild(newOption);
            }
        });


    let taskCategory = document.getElementById("taskCategory");
    fetch("http://localhost:8083/api/categories")
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                let newOption = new Option(data[i].name, data[i].name);
                taskCategory.appendChild(newOption);
            }
        });
}

function submitTask(){
//     var sel = document.getElementById("box1");
// var text= sel.options[sel.selectedIndex].text;

    let user_name = document.getElementById("usersList");
    let uname = user_name.options[user_name.selectedIndex].text;
    console.log(uname);
    let bodyData = {
        
        userid: document.getElementById("usersList").value,
        category: document.getElementById("taskCategory").value,
        description: document.getElementById("description").value,
        deadline: document.getElementById("deadline").value,
        priority: document.getElementById("priority").value,

    }

    fetch("http://localhost:8083/api/todos", {
        method: "POST",
        body: JSON.stringify(bodyData),
        headers: {"Content-type": 
                  "application/json; charset=UTF-8"},
      })
      .then(response => response.json()) 
      .then(json => {
    
        // let confirmationMessage = 
        //    document.getElementById("confirmationMessage");
        // confirmationMessage.innerHTML = "New Task added";
        if(!alert('New Task assigned to '+ uname)){window.location.reload();}
      })
      .catch(err => {
        
        
        // let confirmationMessage = 
        //    document.getElementById(confirmationMessage);
        // confirmationMessage.innerHTML = "Unexpected error";
        if(!alert('Oops! We encountered below error'+err)){window.location.reload();}
      });


}

