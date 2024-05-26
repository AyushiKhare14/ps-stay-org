function validateUser(){
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if(username=="" || password==""){
        if(!alert('Please provide username and password to login!')){window.location.reload();}
        return;
    }
    
    let validationStatus = false;

    fetch("http://localhost:8083/api/users")
        .then(response => response.json())
        .then(data => {
            console.log("oooooo");console.log(username,password)
            for (let i = 0; i < data.length; i++) {
                console.log(data[i].username,data[i].password);
                if (data[i].username == username && data[i].password == password){
                    validationStatus = true;
                    sessionStorage.setItem("id", data[i].id);
                    sessionStorage.setItem("name", data[i].name);
                    window.location.replace("../src/my-tasks.html");
                    
                }
                else{
                    //if(!alert('Username or password does not match. Please retry or register as new user!')){window.location.reload();}
                    //console.log(validationStatus);
                    //break;
                }
                
            }

        });
}


function showPassword() {
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }