
"use strict";


function isUsernameAvailable(){
    let usernameToCheck = document.getElementById("username").value;
    fetch('http://localhost:8083/api/username_available/' + usernameToCheck)
   .then(response => response.json())
   .then(data => {
    console.log(data)
    let showmsg = document.getElementById("showmsg");
    if(!data.available){

        showmsg.innerHTML = `Username is not available`;
    }
    else
    {
        showmsg.innerHTML = ``;
    }
   })
 
}



function doPasswordsMatch(){
    let password = document.getElementById("password").value;
    let repassword = document.getElementById("repassword").value;
    let showmsg2 = document.getElementById("showmsg2");
    if(password != repassword){
        
        showmsg2.innerHTML = `Entered Passwords do not match.`;
    }
    else{
        showmsg2.innerHTML = ``;
    }

}




function registerUser(){

        //Fetching form values

        let name = document.getElementById("name").value;
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        let repassword = document.getElementById("repassword").value;


        let messageDiv = document.getElementById("messageDiv");
        let unameavail = true;

        
        
        //Checking username availability
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `http://localhost:8083/api/username_available/${username}`, false);
        xhr.onload = () => {
            const data = JSON.parse(xhr.responseText);
            if(data.available==false) {
                        unameavail = false;
                        if(!alert('Entered Username is not avialble! Please try again.')){window.location.reload();}
                    };
            }
        xhr.send(null);

        //Returning if username is not available
        if(!unameavail){
            return;
        }

        //Checking passowrd strings and returning if not matched
        if(password != repassword){
            if(!alert('Entered passwords do not match! Please try again.')){window.location.reload();}
                return;

        }

    //Declaring bodyData
    let bodyData = {
        name: name,
        username: username,
        password: password,

    }

   
    //Calling api to create user
    fetch("http://localhost:8083/api/users", {
        method: "POST",
        body: JSON.stringify(bodyData),
        headers: {"Content-type": 
                  "application/json; charset=UTF-8"},
      })
      .then(response => response.json()) 
      .then(json => {
        console.log(json);
        if (!json.error){
            if(!alert('New User added')){window.location.replace("./user-login.html ");}
        }
        else{
            throw new CheckCondition("Partial filled form cannnot be submitted!");;
        }
      })
      .catch(err => {
        if(!alert(err)){window.location.reload();}
        
      });
    
}

class CheckCondition extends Error { 
    constructor(msg) { 
        super(msg); 
    } 
} 
