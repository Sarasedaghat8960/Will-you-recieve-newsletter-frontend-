           
//  LOGIN PART

document.getElementById("login").addEventListener("click",function(){
    let checkUser= {"userName":document.getElementById("userName").value,"password":document.getElementById("password").value,};
    console.log(checkUser);
    //console.log(newUser); 
//  CHECK USER FOR LOGIN    
    fetch("http://localhost:3005/users/login", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(checkUser)
    })
    .then(res=>res.json())
    .then(res=>{
        console.log("users from login:",res);
        if(res.code=="ok"){
            console.log("Login succeed");
            localStorage.setItem("UserId", JSON.stringify(res.id));
            let Id=JSON.parse(localStorage.getItem("UserId"));
            console.log(Id);
            fetch("http://localhost:3005/users")
            .then(res=>res.json())
            .then(users=>{
// WRITE THE NAME OF USER
            for(user in users ){
                if(users[user]._id==Id){
                    document.getElementById("welcomeLogin").innerHTML="";
                    document.getElementById("changeSub").innerHTML="";
                    document.getElementById("welcomeLogin").insertAdjacentHTML("afterbegin","hello <b> "+users[user].name +" </b>to our page "); 
                    let logInUser=users[user]
                    if(users[user].newsLetter==true){
                        document.getElementById("changeSub").insertAdjacentHTML("afterbegin",users[user].name+`!You asked to recieve our newsletter <br><br> Do you want to change the subscription status?<br><div><button type="submit" id="Subcription">Yes</div>`);
                        console.log(users[user]);
                        
                    // CANCLE SUBCRIPTION IF NEWSLETTER IF TRUE 
                        document.getElementById("Subcription").addEventListener("click",function(){
                            document.getElementById("afterChangeSub").insertAdjacentHTML("afterbegin",`<h3>Your subscription status is now changed</h3>`)
                            console.log("user name after click yes:",logInUser.name);
                            logInUser.newsLetter=false;
                            let change= logInUser;
                            console.log("user info after changed subcription  :",change);
                            fetch("http://localhost:3005/users/change", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    'Accept': 'application/json'

                                },
                                body: JSON.stringify(change)
                            })
                            .then(res=>res.json())
                            .then(users=>{
                                console.log(users);
                            });  //then                       
                        });//addeventlistner
                    }
                    else {
                        document.getElementById("changeSub").insertAdjacentHTML("afterbegin",`<br>You do not like  to recieve our newsletter <br><br> Do you want to change the subscription status?<br><div><button type="submit" id="Subcription">Yes</div>`);
                    // CANCLE SUBCRIPTION IF NEWSLETTER IF False 
                        document.getElementById("Subcription").addEventListener("click",function(){
                            document.getElementById("afterChangeSub").insertAdjacentHTML("afterbegin",`<h3>Your subscription status is now changed</h3>`)
                            console.log("user name after click yes:",logInUser.name);
                            logInUser.newsLetter=true;
                            let change= logInUser;
                            console.log("user info after changed subcription  :",change);
                            fetch("http://localhost:3005/users/change", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(change)
                            })
                            .then(res=>res.json())
                            .then(users=>{
                                console.log(users);
                            }); //then                        
                        });//addeventlistner
                        
                    }
                }
            }
            })//then
         }  
    });
});


          

       

//REGISTRATION PART 
fetch("http://localhost:3005/users")
.then(res=>res.json())
.then(users=>console.log(users));

document.getElementById("register").addEventListener("click",function(){
    document.getElementById("welcomeReg").innerHTML="";
    document.getElementById("welcomeReg").insertAdjacentHTML("afterbegin","Thank you <b> "+ document.getElementById("regName").value +`</b> for registering to our page ` );
    document.getElementById("registerSection").style.display="none";
    document.getElementById("welcomeReg").style.display="block";


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
        console.log(users);
       
    });
   
});
