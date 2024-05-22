"use strict";
//let deletedIds="";
//let delIdArray = [];

let deletedIdsUpt=localStorage.getItem("deletedIds");
let delIdArray = deletedIdsUpt.split(',');
console.log(delIdArray);

window.onload = function () {
    setUserName();
    initUserDropdown();
    //localStorage.clear();
    //deletedIds = localStorage.getItem("deletedIds"); 
    //console.log(deletedIds);
    
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


let todo = -1;

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
    listUserToDo(selectedUser);}
};

// deletedBtn.onclick = function(){
//     console.log(todoid);
//     deletedBtnClicked(todoid);

export default function listUserToDo(selectedUser) {
    console.log(selectedUser);

    // let selectedUser = document.getElementById("usersList").value;

    let table = document.getElementById("userToDoList");

    while (table.children[0].children[1]) {
        table.children[0].children[1].remove();

    }

    let container = 
    document.getElementById('toDoContainerDiv');
    while(container.firstChild){
        container.firstChild.remove();
    }

    

    fetch("http://localhost:8083/api/todos/byuser/" + selectedUser)
        .then(response => response.json())
        .then(data => {
            
            for (let i = 0; i < data.length; i++) {
                //console.log(data[i].id.toString());
                if(!delIdArray.includes((data[i].id).toString())){
                    let row = table.insertRow(-1);
                    let cell1 = row.insertCell(0);
                    let cell2 = row.insertCell(1);
                    let cell3 = row.insertCell(2);
        
                    cell1.innerHTML = data[i].description.slice(0,20)+'...';

                    if (data[i].completed) {
                        cell2.innerHTML = "Completed";
                    }
                    else{
                        cell2.innerHTML = "Pending";
                    }

                    let descbtn = document.createElement("button");
                    descbtn.innerHTML = "Details"; 
                    descbtn.className = "btn btn-info";
                    descbtn.setAttribute("data-bs-toggle", "offcanvas");
                    descbtn.setAttribute("data-bs-target","#offcanvasExample" );
                    descbtn.onclick = function(){
                        todo = data[i].id;
                        console.log(todo)
                        getToDo(todo);
                    };
                    cell3.appendChild(descbtn);


            }}
        });   

}


function getToDo(todoid){

    let container = 
    document.getElementById('toDoContainerDiv');
    while(container.firstChild){
        container.firstChild.remove();
    }

    fetch('http://localhost:8083/api/todos/' + todoid)
   .then(response => response.json())
   .then(toDo => {
      
        
   let assignedTo = document.createElement('p');

    fetch('http://localhost:8083/api/users/')
            .then(response => response.json())
            .then(users => {
                for (let i=0; i<users.length; i++){
                    if(users[i].id == toDo.userid){
                        assignedTo.className="fw-bolder text-center mb-3";
                    assignedTo.textContent = `Assigned to: ${users[i].name}`;
                    break;}
                }    
            })

    container.appendChild(assignedTo);
    let notToDisplay = ["id", "userid", "completed"];

    for(let key in toDo){

        if (!notToDisplay.includes(key)){

      let br = document.createElement('p');

      let label = document.createElement('LABEL');
      label.textContent = key.toUpperCase();
      label.className = 'descheaders';
      container.appendChild(label);
        
      let value = document.createElement('p');
      value.textContent = toDo[key];
      value.className = 'desctext';
      container.appendChild(value);

      container.appendChild(br);}

    }

    // let br = document.createElement('p');

    //   let label1 = document.createElement('LABEL');
    //   label1.textContent = 'Category: ';
    //   label1.className = 'descheaders';
    //   container.appendChild(label1);

      
        
    //   const category = document.createElement('p');
    //   category.textContent = ` ${toDo.category}`;
    //   category.className = 'desctext';
    //   container.appendChild(category);

    //   container.appendChild(br);
    //   //container.append(br);

    //   let label2 = document.createElement('LABEL');
    //   label2.textContent = 'Description: ';
    //   label2.className = 'descheaders';
    //   container.appendChild(label2);

    //   const description = document.createElement('p');
    //   description.textContent = ` ${toDo.description}`;
    //   description.className = 'desctext';
    //   container.appendChild(description);

    //   container.appendChild(br); 


    //   let label3 = document.createElement('LABEL');
    //   label3.textContent = 'Deadline: ';
    //   label3.className = 'descheaders';
    //   container.appendChild(label3);

    //   const deadline = document.createElement('p');
    //   deadline.textContent = ` ${toDo.deadline}`;
    //   deadline.className = 'desctext';
    //   container.appendChild(deadline);

    //   container.appendChild(br);

    //   let label4 = document.createElement('LABEL');
    //   label4.textContent = 'Priority: ';
    //   label4.className = 'descheaders';
    //   container.appendChild(label4);

    //   const priority = document.createElement('p');
    //   priority.textContent = ` ${toDo.priority}`;
    //   priority.className = 'desctext';
    //   container.appendChild(priority);

    //   container.append(br);

      let label5 = document.createElement('LABEL');
      label5.textContent = 'STATUS: ';
      label5.className = 'descheaders';
      container.appendChild(label5);


      const completed = document.createElement('p');
      if (toDo.completed){
        completed.textContent = ` Completed`;
        }
      else{
            completed.textContent = ` Pending`;
        }
      completed.className = 'desctext';
      container.appendChild(completed);

    //let toggleStatusBtn = document.getElementById("toggleStatusBtn");
    let loggedinUserid = sessionStorage.getItem("id");
    if(loggedinUserid == toDo.userid){

        let markCompletedBtn = document.createElement("button");
        if (toDo.completed){
            markCompletedBtn.innerHTML = "Revert to Pending";
        }
        else{
            markCompletedBtn.innerHTML = "Mark Complete";
        }

        markCompletedBtn.className = "btn btn-dark markCompleteBtn";
        container.appendChild(markCompletedBtn);
        markCompletedBtn.onclick = function(){
            console.log(todoid);
            markCompletedBtnClicked(todoid);
        }
        // Delete button
        let deletedBtn = document.createElement("button");
        deletedBtn.innerHTML = "Delete task";
        deletedBtn.className = "btn btn-warning";
        container.appendChild(deletedBtn);
        //deletedBtn.addEventListener("click", deleteTodo);
        deletedBtn.onclick = function(){
            console.log(todoid);
            deletedBtnClicked(todoid);
        }
    }



    // let today = new Date();
    // console.log(today);
    // let deadlinedate = new Date(deadline);
    // console.log(deadlinedate);
    // console.log(today - deadlinedate);




   });

}

function markCompletedBtnClicked(todoid){

    fetch('http://localhost:8083/api/todos/' + todoid, {
      method: "PUT",
   })
   .then(response => response.json()) 
   .then(json => {

    listUserToDo();
    getToDo(todoid);

    })
    .catch(err => {
        // If the PUT returns an error, display a message
       let comletionStatus = 
          document.getElementById("comletionStatus");
          comletionStatus.innerHTML = "Unexpected error";
  });
}

function deletedBtnClicked(todoid){
    
    
    //let deletedIds = localStorage.getItem("deletedIds"); 
    //console.log(deletedIds);
    //deletedIds.push(deletedIds)
    localStorage.setItem("deletedIds", deletedIdsUpt +','+ todoid ) ;
    deletedIdsUpt=localStorage.getItem("deletedIds");
    delIdArray = deletedIdsUpt.split(',');
    console.log(delIdArray);
    listUserToDo();
    let offcanvascloseBtn = document.getElementById("offcanvascloseBtn");
    offcanvascloseBtn.click();


} 