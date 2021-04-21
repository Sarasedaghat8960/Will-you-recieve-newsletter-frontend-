fetch("http://localhost:3005/users")
.then(res=>res.json())
.then(users=>{
    let userName=document.getElementById("userName");
    let password=document.getElementById("password");
    //localStorage.setItem("UsersInfo", JSON.stringify(users));
    document.getElementById("login").addEventListener("click",function(){
        console.log(users);
        for(user in users){
             if(userName.value==users[user].userName && password.value==users[user].password){
                    localStorage.setItem("UserId", JSON.stringify(users[user]._id));
                    document.getElementById("welcomeLogin").innerHTML="";
                    document.getElementById("welcomeLogin").insertAdjacentHTML("afterbegin","hello <b> "+users[user].name +" </b>to our page ");
                    //console.log(users[user].userName);
                    if(users[user].newsLetter==true){
                        document.getElementById("changeSub").insertAdjacentHTML("afterbegin",`<br>You asked to recieve our newsletter <br><br> Do you want to change the subscription status?<br><div><button type="submit" id="cancleSubcription">Yes, I want to cancel it </button>  <button type="submit" id="Subcription">No, I do not want to cancel it </button></div>
                        `);
                        document.getElementById("cancleSubcription").addEventListener("click",function(){
                            // fetch("http://localhost:3005/users")
                            // .then(res=>res.json())
                            // .then(users=>{
                            // //users[user].newsLetter=false;
                            // console.log(users[user]);});
                            fetch("http://localhost:3005/users", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(users[user])
                            })
                            .then(res=>res.json())
                            .then(users=>{
                                users[user].newsLetter=false;
                                console.log(users[user]);
                            });

                           
                        });//function
                        document.getElementById("Subcription").addEventListener("click",function(){
                            users[user].newsLetter=true;
                            console.log(users[user].newsLetter);
                            fetch("http://localhost:3005/users", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(users[user])
                            })
                            .then(res=>res.json())
                            .then(users=> users[user].newsLetter=true);
                        });
                    }
             }
        }
   });
});
// registration page 
fetch("http://localhost:3005/users")
.then(res=>res.json())
.then(users=>console.log(users));

document.getElementById("register").addEventListener("click",function(){
    let newUser= {"name":document.getElementById("regName").value,"userName":document.getElementById("regUserName").value,"password":document.getElementById("regPassword").value,"newsLetter":document.getElementById("newsLetter").checked};
    console.log(newUser);
    //console.log(newUser);      
    fetch("http://localhost:3005/users/new", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser)
    })
    .then(res=>res.json())
    .then(users=>{
        console.log("users from reg:",users);
        document.getElementById("welcomeReg").innerHTML="";
        document.getElementById("welcomeReg").insertAdjacentHTML("afterbegin","Thank you  "+ document.getElementById("regName").value +` for registering to our page <div><a href="/index.html ">Click here to log in </a></div>` );
    });

});
