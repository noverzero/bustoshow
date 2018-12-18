document.addEventListener("DOMContentLoaded", () => {
  M.AutoInit();
  console.log("It's Alive!")

  const logInButton = document.querySelector('.login-btn')
  const signInButton = document.querySelector('.signup-btn')
  const navLinks = document.querySelector('.nav-links')
  const navWrapper = document.querySelector('.nav-wrapper')

  axios.all([axios.get("/routes/token")]).then(axios.spread((bool)=>{
    let areWeLoggedIn = bool.data.boolean
    console.log("logged in?", areWeLoggedIn)
    let firstName = bool.data.obj.firstName
    let lastName = bool.data.obj.lastName

    if(areWeLoggedIn){
      navLinks.removeChild(logInButton)

      signInButton.removeAttribute('class', 'modal-trigger')
      signInButton.setAttribute('class', 'sign-out signup-btn btn')

      signInButton.innerText = "Sign Out"

      let uList = document.createElement('ul')
      let list = document.createElement('li')
      let anchor = document.createElement('a')
      uList.setAttribute('id', 'nav-mobile')
      uList.setAttribute('class', 'left hide-on-med-and-down')
      anchor.setAttribute('href', '#!')
      anchor.innerText = `signed in as: ${firstName} ${lastName}`


      navWrapper.appendChild(uList)
      uList.appendChild(list)
      list.appendChild(anchor)

      signInButton.addEventListener("click",(e)=>{
        axios.delete("/routes/token")
        window.location.href = "/"
      })
    }
  }))
})
