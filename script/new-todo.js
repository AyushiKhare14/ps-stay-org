"use strict";

window.onload = function (){
    setUserName();
    showQuickTask();
    let loggedinUser = sessionStorage.getItem("name");

    let usersList = document.getElementById("usersList");
    fetch("http://localhost:8083/api/users")
        .then(response => response.json())
        .then(data => {

            for (let i = 0; i < data.length; i++) {
                if(data[i].name == loggedinUser){
                    let newOption = new Option(data[i].name, data[i].id,  false, true );
                    usersList.appendChild(newOption);
                }
                else{
                let newOption = new Option(data[i].name, data[i].id);
                usersList.appendChild(newOption);}
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

        disablePastDates()
}


function disablePastDates() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    document.getElementById("deadline").setAttribute("min", today);
}

function setUserName(){
    let loggedinUser = sessionStorage.getItem("name");
    console.log(loggedinUser);
    let name = document.getElementById("welcomeuser");
    name.innerHTML = 'Welcome '+loggedinUser;
}

function logout(){
    sessionStorage.clear();
    window.location.replace("../src/user-login.html");
}


function submitTask(){


    let name = document.getElementById("usersList");

    let uname = name.options[name.selectedIndex].text;

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
      .then(response => {
        if (response.ok) {
        response.json()}
        else{
            throw new Error('Partially filled form cannot be submitted!');
        }
    }) 
      .then(json => {
 
        if(!alert('New Task assigned to '+ uname)){window.location.reload();}
      })
      .catch(err => {

        if(!alert(err)){window.location.reload();}
      });   


}

let quickTaskMap = {
    1 : "Complete Homework",
    2 : "Order Groceries",
    3 : "Finish Laundry",
    4 : "Send Mail",
    5 : "Call Mother",
}

function showQuickTask(){

    let quickTask = document.getElementById("quickTask");

    

    for (let key in quickTaskMap){
        let quickTaskBtn = document.createElement("button");
        quickTaskBtn.innerHTML = quickTaskMap[key]; 
        quickTaskBtn.className = "btn quickTaskBtn col-8 shadow p-3 mb-5 bg-body rounded";
        quickTaskBtn.onclick = function(){
            
            addQuickTask(key);
        };
        quickTask.appendChild(quickTaskBtn);
    }
}

function addQuickTask(taskid){
    let description = document.getElementById("description");
    description.value = quickTaskMap[taskid];

}
