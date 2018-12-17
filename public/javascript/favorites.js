document.addEventListener("DOMContentLoaded", function(){ console.log("it's alive!!!!")

const logInButton = document.querySelector('.login-btn')
const signInButton = document.querySelector('.signup-btn')
const navLinks = document.querySelector('.nav-links')
const navWrapper = document.querySelector('.nav-wrapper')


let loggedin = true
let firstName = 'Daniel'
let lastName = 'Laruso'

if(loggedin){
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

  // <!-- <ul id="nav-mobile" class="left hide-on-med-and-down">
  //   <li><a href="sass.html">Sass</a></li>
  // </ul> -->

}




})
