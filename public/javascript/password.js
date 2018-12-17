document.addEventListener('DOMContentLoaded', function(event) {
  console.log("It's Alive")
  M.AutoInit();

  //req.body for new users
  const password = document.querySelector('#new-password')
  const passConfirm = document.querySelector('#new-password-confirm')
  const success = document.querySelector('#password-confirm')
  const createAccount = document.querySelector('#create-new-account')
  const newFirstName = document.querySelector('#new-first-name')
  const newLastName = document.querySelector('#new-last-name')
  const newEmail = document.querySelector('#new-email')
  const newPassword = document.querySelector('#new-password')

  //req.body for login
  const em = document.getElementById("icon_prefix1")
  const pw = document.getElementById("icon_password")
  const tokenButton = document.getElementById("logInButton")


  passConfirm.addEventListener('keyup', (event) => {
    if(password.value == passConfirm.value){
      passConfirm.classList.remove("invalid")
      passConfirm.classList.add("valid")
    }
    else{
      passConfirm.classList.remove("valid")
      passConfirm.classList.add("invalid")
    }
  })


  createAccount.addEventListener('click', (event) => {
    console.log("i hear a bleep on createAccount!")
    axios.post("/routes/users", {firstName:newFirstName.value, lastName:newLastName.value, email:newEmail.value, isWaiverSigned:true, userType: 'standard', plainTextPassword: newPassword.value} ).then((response) => {
      console.log("dustins axios.post response.data:::", response.data)
      //console.log("firstName", firstName)
    })
  })

  tokenButton.addEventListener("click",(e)=>{
    console.log(em.value);
    console.log(pw.value);
    console.log("click success");
    let loginObject = {email:em.value,password:pw.value}
    axios.post("/routes/token",loginObject).then((e)=>{
      console.log(e);
      console.log("login success");
    })
  })


}) // DOMContentLoaded;
