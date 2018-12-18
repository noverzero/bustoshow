document.addEventListener("DOMContentLoaded", () => {
  M.AutoInit();
  console.log("It's Alive!")

  const logInButton = document.querySelector('.login-btn')
  const signInButton = document.querySelector('.signup-btn')
  const navLinks = document.querySelector('.nav-links')
  const navWrapper = document.querySelector('.nav-wrapper')
  const accountButton = document.querySelector('#account-button')
  const userInfo =  document.querySelector('#user-info')



  let loggedin = true
  let firstName = 'Daniel'
  let lastName = 'Laruso'
  let favArr = [
    {id: 14, venue: "Red Rocks Amphitheatre", headliner: "The 1975", date: "2019-04-30T06:00:00.000Z", startTime: "19:00:00"},
    {id: 16, venue: "Red Rocks Amphitheatre", headliner: "Umphrey's McGee", date: "2019-06-21T06:00:00.000Z", startTime: "19:00:00"},
    {id: 3, venue: "1st Bank Center", headliner: "Why Don't We", date: "2019-03-27T06:00:00.000Z", startTime: "19:00:00"}

  ]

  if (loggedin) {
    console.log("Loged In!!!")
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

    userInfo.innerText = `${firstName} ${lastName}`

    // Creating Table/ Blocks
    const reservationSection = document.querySelector('#reservation-section')
    const reservationsList = document.querySelector('#reservations-list')
    const events = document.querySelector('#events-row')

    const createRows = (favArr) => {
      console.log('inside createRows', favArr)
      favArr.forEach(event => {
        let dateDiv = document.createElement('div')
        let dayDiv = document.createElement('div')
        let headlineDiv = document.createElement('div')
        let venueDiv = document.createElement('div')
        let buttonDiv = document.createElement('div')
        let button = document.createElement('a')

        dateDiv.setAttribute('class', 'col l2 s2 row-element valign-wrapper date-div')
        dayDiv.setAttribute('class', 'col l2 s2 row-element valign-wrapper')
        headlineDiv.setAttribute('class', 'col l3 s3 row-element valign-wrapper')
        venueDiv.setAttribute('class', 'col l3 s3 row-element valign-wrapper')
        buttonDiv.setAttribute('class', 'col l2 s2 row-element valign-wrapper row-element-last')
        button.setAttribute('class', 'waves-effect waves-light btn event-btn z-depth-0 center valign-wrapper modal-trigger')
        button.setAttribute('data-target', 'modal3')
        button.setAttribute('id', 'event-button')


        dateDiv.innerText = `${moment(event.date).format("MM/DD/YY")}`
        dayDiv.innerText = `${moment(event.date).format("ddd")}`
        headlineDiv.innerText = `${event.headliner}`
        venueDiv.innerText = `${event.venue}`
        button.innerText = 'Book'
        button.value = {
          date: `${moment(event.date).format("MM/DD/YY")}`,
          day: `${moment(event.date).format("ddd")}`,
          headliner: `${event.headliner}`,
          venue: `${event.venue}`
        }


        events.appendChild(dateDiv)
        events.appendChild(dayDiv)
        events.appendChild(headlineDiv)
        events.appendChild(venueDiv)
        events.appendChild(buttonDiv)
        buttonDiv.appendChild(button)
      })

    }

    createRows(favArr)

  } else {
    accountButton.classList.add('hide')
  }




})
