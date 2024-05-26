let deletedIdsUpt=localStorage.getItem("deletedIds");
let delIdArray = deletedIdsUpt.split(',');
let table = document.getElementById("userToDoList");
let todoid = -1;

export {setUserName, logout, fetchUserToDo, displayData, displayTodoData};



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



async function fetchUserToDo(selectedUser) {
   
    // let table = document.getElementById("userToDoList");

    while (table.children[0].children[1]) {
        table.children[0].children[1].remove();
    }

    let container = 
    document.getElementById('toDoContainerDiv');
    while(container.firstChild){
        container.firstChild.remove();
    }

    let responsedata = await fetch("http://localhost:8083/api/todos/byuser/" + selectedUser)
    let data = await responsedata.json();
    return data;

}



export default function displayData(selectedUser){
    let flexSwitchCheckChecked = document.getElementById("flexSwitchCheckChecked");
    let flexSwitchCheckChecked1 = document.getElementById("flexSwitchCheckChecked1");
    let flexSwitchCheckChecked2 = document.getElementById("flexSwitchCheckChecked2");

    
    
        fetchUserToDo(selectedUser).then(data => {
            for (let i = 0; i < data.length; i++) {
                if(!delIdArray.includes((data[i].id).toString())){

                    // Display data in table as per filters
                    function displayDataTable(){
                        
                        let row = table.insertRow(-1);
                        let cell1 = row.insertCell(0);
                        let cell2 = row.insertCell(1);
                        let cell3 = row.insertCell(2);
                        let cell4 = row.insertCell(3);


                        let compimg = document.createElement('img');
                        compimg.src = "../images/completed.png";
                        let loggedinUserid = sessionStorage.getItem("id");
                        if(loggedinUserid == data[i].userid){
                        compimg.onclick = function(){
                            console.log(data[i].id);
                            markCompletedBtnClicked(data[i].id);
                        }}

                        let pendimg = document.createElement('img');
                        pendimg.src = "../images/grey.png";
                        if(loggedinUserid == data[i].userid){
                        pendimg.onclick = function(){
                            console.log(data[i].id);
                            markCompletedBtnClicked(data[i].id);
                        }}
                
                        
                        
                        let priimg = document.createElement("img");
                        

                        switch(data[i].priority){
                            case "High":
                                priimg.src = "../images/H.png";
                                break;
                            case "Medium":
                                priimg.src = "../images/M.png";
                                break;
                            case "Low":
                                priimg.src = "../images/L.png";
                                break;
                        }
                       
                        cell1.className = "bg-transparent ";
                        cell1.appendChild(priimg);

                        cell2.innerHTML = data[i].description.slice(0,20)+'...';
                        cell2.className = "bg-transparent text-secondary fs-6";
                      
                
                        if (data[i].completed) {
                            cell3.appendChild(compimg);
                            
                        }
                        else{
                            cell3.appendChild(pendimg);
                            
                        }
                        cell3.className = "bg-transparent";
                        
                
                        
                        let descbtn = document.createElement("img");
                        descbtn.src = "../images/more2.png";
                        descbtn.setAttribute("data-bs-toggle", "offcanvas");
                        descbtn.setAttribute("data-bs-target","#offcanvasExample" );
                        descbtn.onclick = function(){
                            todoid = data[i].id;
                            console.log(todoid)
                            displayTodoData(todoid);
                        };
                        cell4.className = "bg-transparent";
                        cell4.appendChild(descbtn);


                    }



                    
                    let today = new Date();
                    let usertoday = today.setHours(0, 0, 0, 0);
                    let deadlinedate = new Date(data[i].deadline);
                    let userdeadline = deadlinedate.setHours(0, 0, 0, 0);
                    let isItTodaysTask = Math.abs(usertoday - userdeadline) < 86400000;
                    
                    
                    let selectionString = flexSwitchCheckChecked.checked.toString() + flexSwitchCheckChecked1.checked.toString() + flexSwitchCheckChecked2.checked.toString();
                    //console.log(selectionString);
                    switch(selectionString)

                    {
                        case "falsefalsefalse":
                            displayDataTable();
                            break;

                        case "falsefalsetrue":
                            if(!data[i].completed){
                                displayDataTable();}
                            break;
                        case "falsetruefalse":
                            if(data[i].priority=="High"){
                                displayDataTable();}
                            break;
                        case "falsetruetrue":
                            if(data[i].priority=="High" && !data[i].completed){
                                displayDataTable();}
                            break;

                        case "truefalsefalse":
                            if(isItTodaysTask){
                                displayDataTable();}
                            break;

                        case "truefalsetrue":
                            if(isItTodaysTask && !data[i].completed){
                                displayDataTable();}
                            break;
                        case "truetruefalse":
                            if(isItTodaysTask && data[i].priority=="High"){
                                displayDataTable();}
                            break;
                        case "truetruetrue":
                            if(isItTodaysTask && data[i].priority=="High" && !data[i].completed){
                                displayDataTable();}
                            break;
                    }

                }
            }
        })}   

let container = 
    document.getElementById('toDoContainerDiv');

//----------------------------------

async function getToDo(todoid){

 
    while(container.firstChild){
        container.firstChild.remove(); 
    }

   

    let todoData = await fetch('http://localhost:8083/api/todos/' + todoid)
    let data = await todoData.json()
    return data;

}



function displayTodoData(todoid){
    getToDo(todoid).then(toDo => {
        
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
            label.className = 'descheaders fw-light';
            container.appendChild(label);
                
            let value = document.createElement('p');
            value.textContent = toDo[key];
            value.className = 'desctext ps-5 pe-3 pt-1 pb-1 mb-1';
            value.style="border:1px solid; border-radius:5px;";
            container.appendChild(value);

            container.appendChild(br);
        }

    }

    
    let label5 = document.createElement('LABEL');
    label5.textContent = 'STATUS: ';
    label5.className = 'descheaders fw-light';
    container.appendChild(label5);


    const completed = document.createElement('p');
    if (toDo.completed){
    completed.textContent = ` Completed`;
    }
    else{
        completed.textContent = ` Pending`;
    }
    completed.className = 'desctext ps-5 pe-3 pt-1 pb-1  mb-1';
    completed.style="border:1px solid; border-radius:5px;";
    container.appendChild(completed);


    
    let markCompletedBtn = document.createElement("button");
    markCompletedBtn.className = "mt-2";
    if(loggedinUserid == toDo.userid){

        //let markCompletedBtn = document.createElement("button");
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
      
        let btnDiv = document.createElement("div");
        btnDiv.className = "d-flex justify-content-around mt-3";

        let deleteBtnDiv = document.createElement("div");
        deleteBtnDiv.id = "deleteBtnDiv";

        let editBtnDiv = document.createElement("div");
        editBtnDiv.id = "editBtnDiv";

        //let deleteBtnDiv = document.getElementById("deleteBtnDiv");
        let deletedBtn = document.createElement("button");
        deletedBtn.innerHTML = "Delete task";
        deletedBtn.className = "btn btn-warning";
        deletedBtn.href = "#confirmDelDiv";
        deleteBtnDiv.appendChild(deletedBtn);
        deletedBtn.onclick = function(){
            console.log(todoid);
            deletedBtnClicked(todoid);
        }

        //let editBtnDiv = document.getElementById("editBtnDiv");
        let editBtn = document.createElement("button");
        editBtn.innerHTML = "Edit task";
        editBtn.className = "btn btn-success";
        editBtnDiv.appendChild(editBtn);
        editBtn.onclick = function(){
            console.log(todoid);
            editBtnClicked(todoid);
        }

        btnDiv.appendChild(deleteBtnDiv);
        btnDiv.appendChild(editBtnDiv);
        container.appendChild(btnDiv);
    }
    else{
        let notifyBtn = document.createElement("button");
        if (toDo.completed){
            notifyBtn.innerHTML = "Appreciate";
            notifyBtn.className = "btn btn-success markCompleteBtn";
            
        }
        else{
            notifyBtn.innerHTML = "Send reminder";
            notifyBtn.className = "btn btn-danger markCompleteBtn";
            }

        
        container.appendChild(notifyBtn);
        notifyBtn.onclick = function(){
            alert("Your message is sent!");}
           
    }


   });

}


function markCompletedBtnClicked(todoid){


    fetch('http://localhost:8083/api/todos/' + todoid, {
      method: "PUT",
   })
   .then(response => response.json()) 
   .then(json => {
    window.location.reload();
//    displayData();
//    displayTodoData(todoid);

    })
    .catch(err => {
        // If the PUT returns an error, display a message
       let comletionStatus = 
          document.getElementById("comletionStatus");
          comletionStatus.innerHTML = "Unexpected error";
  });
}



function deletedBtnClicked(todoid){
    if(document.getElementById("confirmDelDiv").firstChild){
        document.getElementById("confirmDelDiv").firstChild.remove();
        document.getElementById("confirmBtnDiv").firstChild.remove();
        document.getElementById("cancelBtnDiv").firstChild.remove();
        }

    
    let confirmDelDiv = document.getElementById("confirmDelDiv");
    console.log(confirmDelDiv);
    //let delDiv = document.getElementById("delDiv");
    
    let msg = document.createElement('p');
    msg.textContent = "Are you sure you?";
    msg.className = "text-danger text-center fsw-bolder";
    confirmDelDiv.appendChild(msg);

    //----------------------------------------------

    let cancelBtnDiv = document.getElementById("cancelBtnDiv");

    //let cancelBtn = document.createElement("button");
    //cancelBtn.innerHTML = "Cancel";
    //cancelBtn.className = "btn btn-secondary";
    let cancelBtn = document.createElement("img");
    cancelBtn.src = "../images/cross.png";
    cancelBtnDiv.appendChild(cancelBtn);
    cancelBtn.onclick = function(){
         document.getElementById("confirmDelDiv").firstChild.remove();
         document.getElementById("confirmBtnDiv").firstChild.remove();
         document.getElementById("cancelBtnDiv").firstChild.remove();

    }

    let confirmBtnDiv = document.getElementById("confirmBtnDiv");

    //let confirmBtn = document.createElement("button");
    //confirmBtn.innerHTML = "Yes Delete";
    //confirmBtn.className = "btn btn-warning";
    let confirmBtn = document.createElement("img");
    confirmBtn.src = "../images/tick.png";
    confirmBtnDiv.appendChild(confirmBtn);
    confirmBtn.onclick = function(){
            
        localStorage.setItem("deletedIds", deletedIdsUpt +','+ todoid ) ;
        window.location.reload();
    }
    


} 


function editBtnClicked(todoid){

    let container = 
    document.getElementById('toDoContainerDiv');
    while(container.firstChild){
        container.firstChild.remove();
    }

    console.log(document.body.contains(document.getElementById("confirmDelDiv")));
        if(document.getElementById("confirmDelDiv").firstChild){
        document.getElementById("confirmDelDiv").firstChild.remove();
         document.getElementById("confirmBtnDiv").firstChild.remove();
         document.getElementById("cancelBtnDiv").firstChild.remove();
        }

    let  mess = document.createElement("p");
    mess.className = "text-center fs-2 fsw-bold mt-2";
    mess.innerHTML = "Edit task!";


    getToDo(todoid).then(toDo => {
      
        
            let  userselectList = document.createElement("select");
            userselectList.setAttribute("id", "usersList");
            userselectList.className = "form-control mt-2";
            fetch("http://localhost:8083/api/users")
            .then(response => response.json())
            .then(users => {

                for (let i = 0; i < users.length; i++) {
                    if(users[i].id == toDo.userid){
                        let newOption = new Option(users[i].name, users[i].id,  false, true );
                        userselectList.appendChild(newOption);
                    }
                    else{
                    let newOption = new Option(users[i].name, users[i].id);
                    userselectList.appendChild(newOption);}
                }
                
            });
            container.appendChild(userselectList);





            let  categoryList = document.createElement("select");
            categoryList.setAttribute("id","taskCategory" );
            categoryList.className = "form-control mt-2";
                fetch("http://localhost:8083/api/categories")
                .then(response => response.json())
                .then(data => {

                    for (let i = 0; i < data.length; i++) {
                        if(data[i].category == toDo.category){
                            let newOption = new Option(data[i].name, data[i].name,  false, true );
                            userselectList.appendChild(newOption);
                        }
                        else{
                        let newOption = new Option(data[i].name, data[i].name);
                        categoryList.appendChild(newOption);}
                    }
                });


                container.appendChild(categoryList);

            let taskdetails = document.createElement("textarea");
            taskdetails.className = "form-control mt-2";
            taskdetails.setAttribute("id", "description");
            taskdetails.innerHTML = toDo.description;

            container.appendChild(taskdetails);


            let prevdeadline = document.createElement("p");
            prevdeadline.className = "mt-2 text-secondary";
            prevdeadline.innerHTML= ("Old deadline - "+toDo.deadline);
            container.appendChild(prevdeadline);

            let deadlinedate = document.createElement("input") 
            deadlinedate.setAttribute("type", "date");
            deadlinedate.setAttribute("id", "deadline")
            deadlinedate.className = "form-control mt-1";
            container.appendChild(deadlinedate);
            //deadlinedate.innerHTML = toDo.deadline;
            disablePastDates();

            function disablePastDates() {
                let today = new Date();
                let dd = String(today.getDate()).padStart(2, '0');
                let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                let yyyy = today.getFullYear();
            
                today = yyyy + '-' + mm + '-' + dd;
                document.getElementById("deadline").setAttribute("min", today);
            }


            let  priority = document.createElement("select");
            priority.className = "form-control mt-2";
            priority.setAttribute("id","priority");
            let priorityList = ["High", "Medium","Low"];
            for (let i=0; i<3; i++){
            if(priorityList[i] == toDo.priority){
                let newOption = new Option(priorityList[i], priorityList[i],  false, true );
                priority.appendChild(newOption);
            }
            else{
            let newOption = new Option(priorityList[i], priorityList[i]);
            priority.appendChild(newOption);}
            }

            container.appendChild(priority);
                

        //document.getElementById("deleteBtnDiv").firstChild.remove();
        //document.getElementById("editBtnDiv").firstChild.remove();
        
        let submitEditBtn = document.createElement("button");
        submitEditBtn.className = "mt-4 btn btn-success markCompleteBtn";
        submitEditBtn.innerHTML = "Make changes";
        container.appendChild(submitEditBtn);
        submitEditBtn.onclick = function(){
            submitEditBtnClicked();
        }


            })}


        function submitEditBtnClicked(){
            localStorage.setItem("deletedIds", deletedIdsUpt +','+ todoid ) ;

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
            
                if(!alert('Changes submittted')){window.location.reload();}
                })
                .catch(err => {
        
                if(!alert(err)){}
                });   


                
        
        

        }