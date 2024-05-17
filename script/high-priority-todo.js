"use strict";

window.onload = function () {
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
    usersList.onchange = listUserToDo;
};

function listUserToDo() {

    let selectedUser = document.getElementById("usersList").value;

    let table = document.getElementById("userToDoList");

    while (table.children[0].children[1]) {
        table.children[0].children[1].remove();

    }

    fetch("http://localhost:8083/api/todos/byuser/" + selectedUser)
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                if(data[i].priority=="High"){
                let row = table.insertRow(-1);
                let cell1 = row.insertCell(0);
                let cell2 = row.insertCell(1);
                let cell3 = row.insertCell(2);
                let cell4 = row.insertCell(3);
                let cell5 = row.insertCell(4);
                let cell6 = row.insertCell(5);
                //let cell7 = row.insertCell(6);

                cell1.innerHTML = data[i].category;
                cell2.innerHTML = data[i].description;
                cell3.innerHTML = data[i].deadline;
                cell4.innerHTML = data[i].priority;



                // let markCompletedBtn = document.createElement("button");
                // markCompletedBtn.innerHTML = "Mark Completed";
                // markCompletedBtn.onclick = markCompletedBtnClicked;


                // let markPendingBtn = document.createElement("button");
                // markPendingBtn.innerHTML = "Revert to Pending";
                // markPendingBtn.onclick = markPendingBtnClicked;


                if (data[i].completed) {
                    cell5.innerHTML = "Completed";
                    // cell6.appendChild(markPendingBtn);
                }
                else{
                    cell5.innerHTML = "Pending";
                    // cell6.appendChild(markCompletedBtn);
                }
                
                let anchor = document.createElement("a");
                anchor.href = `./todo-details.html?todoid=${data[i].id}`;
                anchor.text = "View Details/Take Action";  
                cell6.appendChild(anchor);

            }}
        });

        

}



function markCompletedBtnClicked(toDoId){

    fetch("http://localhost:8083/api/todos/"+toDoId, {
        method: "PUT",
        // body: JSON.stringify(bodyData),
        // headers: {"Content-type": 
        //           "application/json; charset=UTF-8"},
      })
      .then(response => response.json()) 
      .then(json => {
    
        window.location.replace("./user-todos.html");
        // let confirmationMessage = 
        //    document.getElementById("confirmationMessage");
        // confirmationMessage.innerHTML = "New Task added";
      });
    //   .catch(err => {
        
        
    //     let confirmationMessage = 
    //        document.getElementById(confirmationMessage);
    //     confirmationMessage.innerHTML = "Unexpected error";
    //   });
            
}

function markPendingBtnClicked(toDoId){
    
}