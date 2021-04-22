fetch("https://sarasedaghat.herokuapp.com/users")
.then(res=>res.json())
.then(users=>{
    let userName=document.getElementById("userName");
    let password=document.getElementById("password");
//LOGIN USER
    document.getElementById("login").addEventListener("click",function(){
    console.log(users);
    for(user in users){
        if(userName.value==users[user].userName && password.value==users[user].password){
        console.log("Current subcription",users[user].newsLetter);
        let logInUser=users[user]

        localStorage.setItem("UserId", JSON.stringify(users[user]._id));
        document.getElementById("welcomeLogin").innerHTML="";
        document.getElementById("changeSub").innerHTML="";
        document.getElementById("welcomeLogin").insertAdjacentHTML("afterbegin","hello <b> "+users[user].name +" </b>to our page ");   
            if(users[user].newsLetter==true){
                document.getElementById("changeSub").insertAdjacentHTML("afterbegin",users[user].name+`!You asked to recieve our newsletter <br><br> Do you want to change the subscription status?<br><div><button type="submit" id="Subcription">Yes</div>`);
                console.log(users[user]);
 // CANCLE SUBCRIPTION IF NEWSLETTER IF TRUE 
                document.getElementById("Subcription").addEventListener("click",function(){
                    document.getElementById("afterChangeSub").insertAdjacentHTML("afterbegin",`Your subscription status is changed`)
                    console.log("user name after click yes:",logInUser.name);
                    logInUser.newsLetter=false;
                    let change= logInUser;
                    
                    console.log("user info after changed subcription  :",change);

                    fetch("https://sarasedaghat.herokuapp.com/users", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(change)
                    })
                    .then(res=>res.json())
                    .then(users=>{
                        console.log(users);
                    });                         
                });

            }else {
                document.getElementById("changeSub").insertAdjacentHTML("afterbegin",`<br>You do not like  to recieve our newsletter <br><br> Do you want to change the subscription status?<br><div><button type="submit" id="Subcription">Yes</div>`);
 // CANCLE SUBCRIPTION IF NEWSLETTER IF False 
                document.getElementById("Subcription").addEventListener("click",function(){
                    document.getElementById("afterChangeSub").insertAdjacentHTML("afterbegin",`Your subscription status is changed`)
                    console.log("user name after click yes:",logInUser.name);
                    logInUser.newsLetter=true;
                    let change= logInUser;
                    
                    console.log("user info after changed subcription  :",change);


                    fetch("https://sarasedaghat.herokuapp.com/users", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(change)
                    })
                    .then(res=>res.json())
                    .then(users=>{
                        console.log(users);
                    });                         
                });

            }
        }
    }
   });//LOGIN
});//THEN
// REGISTRATION PAGE 
fetch("https://sarasedaghat.herokuapp.com/users")
.then(res=>res.json())
.then(users=>console.log(users));

document.getElementById("register").addEventListener("click",function(){
    let newUser= {"name":document.getElementById("regName").value,"userName":document.getElementById("regUserName").value,"password":document.getElementById("regPassword").value,"newsLetter":document.getElementById("newsLetter").checked};
    console.log(newUser);
    //console.log(newUser);      
    fetch("https://sarasedaghat.herokuapp.com/users/new", {
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
