"use strict";

let todoid = -1;
window.onload = function (){

    const urlParams = new URLSearchParams(location.search);
	// location.search returns the query string part of the URL
    
    if (urlParams.has("todoid") === true)
        {
            todoid = urlParams.get("todoid")
            // call a method that fetches this course
            getToDo(todoid);
        }

}



function getToDo(todoid){

    fetch('http://localhost:8083/api/todos/' + todoid)
   .then(response => response.json())
   .then(toDo => {
      
        
    const container = 
    document.getElementById('toDoContainerDiv');

    const assignedTo = document.createElement('p');

    fetch('http://localhost:8083/api/users/')
            .then(response => response.json())
            .then(users => {
                for (let i=0; i<users.length; i++){
                    if(users[i].id == toDo.userid){
                    
                    console.log(users[i].id);
                    console.log(toDo.userid);
                    
                    assignedTo.textContent = `Assigned to: ${users[i].name}`;
                    break;}
                }    
            })

    
    
    container.appendChild(assignedTo);
        
      const category = document.createElement('p');
      category.textContent = `Category: ${toDo.category}`;
      container.appendChild(category);

      const description = document.createElement('p');
      description.textContent = `Description: ${toDo.description}`;
      container.appendChild(description);

      const deadline = document.createElement('p');
      deadline.textContent = `Deadline: ${toDo.deadline}`;
      container.appendChild(deadline);

      const priority = document.createElement('p');
      priority.textContent = `Priority: ${toDo.priority}`;
      container.appendChild(priority);

      const completed = document.createElement('p');
      if (toDo.completed){
        completed.textContent = `Completion status: Completed`;
        }
      else{
            completed.textContent = `Completion status: Pending`;
        }
      //completed.textContent = `Completion status: ${toDo.completed}`;
      container.appendChild(completed);

    let markCompletedBtn = document.createElement("button");
    if (toDo.completed){
        markCompletedBtn.innerHTML = "Revert to Pending";
    }
    else{
        markCompletedBtn.innerHTML = "Mark Completed";
    }
    container.appendChild(markCompletedBtn);
    markCompletedBtn.onclick = markCompletedBtnClicked;

   });

}

function markCompletedBtnClicked(){

    fetch('http://localhost:8083/api/todos/' + todoid, {
      method: "PUT",
   })
   .then(response => response.json()) 
   .then(json => {
        // If the PUT is successful, display a message
       let comletionStatus = 
          
          window.location.replace("./todo-details.html?todoid="+todoid);
        //   document.getElementById("comletionStatus");
        //   comletionStatus.innerHTML = "Status updated";
          //'http://localhost:8083/api/todos/' + todoid
    })
    .catch(err => {
        // If the PUT returns an error, display a message
       let comletionStatus = 
          document.getElementById("comletionStatus");
          comletionStatus.innerHTML = "Unexpected error";
  });
}


