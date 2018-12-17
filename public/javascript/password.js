document.addEventListener('DOMContentLoaded', function(event) {
  console.log("It's Alive")
  M.AutoInit();

  const password = document.querySelector('#icon_prefix-5')
  const passConfirm = document.querySelector('#icon_prefix-6')
  const success = document.querySelector('#password-confirm')



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

  const createAccount = document.querySelector('#create-new-account')

  createAccount.addEventListener('click', (event) => {
    console.log("i hear a click on createAccount!")
    axios.post("/routes/users", {firstName:'johnny', lastName:'Lawrence', email:'johny@cobrakai.com', isWaiverSigned:'yes', userType: 'standard', plainTextPassword: 'atleasteightcharacters'} ).then((response) => {
      console.log("dustins axios.post response.data:::", response.data)
    })
  })


}) // DOMContentLoaded;
