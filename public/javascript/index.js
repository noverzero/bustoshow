document.addEventListener('DOMContentLoaded', function(event) {
  console.log("It's Alive")
  M.AutoInit();


// Homepage Button - Random Text Gen
  const login = document.querySelector('.ride-btn')
  const btnText = document.querySelector('.btn-text')

  login.addEventListener('click', (event) => {
    let arr = ["Live With Us", "Groove With Us", "Jam With Us", "Vibe With Us", "Sing With Us", "Dance With Us", "Party With Us", "Get There With Us", "Save Earth With Us", "Rock With Us", "Bump With Us", "Roll With Us", "RIDE THE BUESES WITH US"]
    let result = arr[Math.floor(Math.random() * arr.length)]

    btnText.innerText = `${result}`
  })
// End Homepage Button

// Sign Up Modal
  const signUp = document.querySelector('#sign-up')
  const passField = document.querySelector('#password')
  const userField = document.querySelector('#username')



}) // DOMContentLoaded;
