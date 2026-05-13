function register(){
  let u=document.getElementById("newUser").value;
  let p=document.getElementById("newPass").value;

  localStorage.setItem("user",u);
  localStorage.setItem("pass",p);

  alert("Registered!");
  window.location="login.html";
}

function login(){
  let u=document.getElementById("username").value;
  let p=document.getElementById("password").value;

  if(u===localStorage.getItem("user") && p===localStorage.getItem("pass")){
    localStorage.setItem("loggedIn","true");
    window.location="index.html";
  }else{
    alert("Wrong login!");
  }
}

function goRegister(){
  window.location="register.html";
}