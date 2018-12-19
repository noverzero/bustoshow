document.addEventListener("DOMContentLoaded", () => {
  M.AutoInit();
  console.log("It's Alive")

  const logInButton = document.querySelector('.login-btn')
  const signInButton = document.querySelector('.signup-btn')
  const sidenav = document.querySelector('#mobile-demo')
  const sidenavLogin = document.querySelector('.login-link')
  const sidenavSignup = document.querySelector('.signup-link ')
  const navLinks = document.querySelectorAll('.nav-links')
  const navWrapper = document.querySelector('.nav-wrapper')
  const fabSideNav = document.querySelector('#fab-SideNav')
  const sideNavName = document.querySelector('.sidenav-name')
  const sideNavEmail = document.querySelector('.sidenav-email')
  const upcomingEventField = document.querySelector('.sidenav')
  const watchlistField = document.querySelector('.watchlist')
  const sideNavLogin = document.querySelector('#sidenav-login-btn')
  const sideNav = document.querySelector('#mobile-demo')


  // Add call to user's favorited
  const userUpcomingEvents = []

  //grabbing watch list from local storage and appending all items on load
  let userWatchlist = []
  if(JSON.parse(localStorage.getItem("watchlist"))){
    userWatchlist = JSON.parse(localStorage.getItem("watchlist"))
  }
  console.log("local storage array;",userWatchlist)

  axios.all([axios.get("/routes/token"),axios.get("/routes/reservations")]).then(axios.spread((bool,allReservationArray)=>{

    //everything below this line until the line of dashes is the calendar.js page
    const reservationPostLocation = '/payment.html'

    let loggedIn = bool.data.boolean
    let firstName = bool.data.obj.firstName
    let lastName = bool.data.obj.lastName
    let userEmail = bool.data.obj.email
    console.log("reservations: ",allReservationArray.data)
    console.log("logged in:", loggedIn)

    allReservationArray.data.forEach((reservation)=>{
      if(userEmail === reservation.email){
        userUpcomingEvents.push(reservation)
      }
    })
      console.log("users upcoming events :",userUpcomingEvents)
    if(!loggedIn){
      fabSideNav.setAttribute('class', 'hide')
    }
    // End if logged out

    if(loggedIn){
      const uList = document.createElement('ul')
      const list = document.createElement('li')
      const anchor = document.createElement('a')

      navLinks[1].removeChild(logInButton)
      sideNav.removeChild(sideNavLogin)

      signInButton.removeAttribute('class', 'modal-trigger')
      sidenavSignup.removeAttribute('class', 'modal-trigger')
      sidenavLogin.removeAttribute('class')

      uList.setAttribute('id', 'nav-mobile')
      uList.setAttribute('class', 'left hide-on-med-and-down')
      anchor.setAttribute('class', 'welcome-tag')
      signInButton.setAttribute('class', 'sign-out signup-btn btn')


      anchor.innerText = `Welcome, ${firstName} ${lastName}!`
      signInButton.innerText = "Sign Out"
      sidenavSignup.innerText = 'Sign Out'
      sidenavLogin.innerText = ''
      // sideNavName.innerText = firstName + ' ' + lastName + '\n'
      // sideNavEmail.innerText = userEmail


      navWrapper.appendChild(uList)
      uList.appendChild(list)
      // list.appendChild(anchor) ///////////////////////////////////////////////////DUSTIN TO DO MOVE ANCHOR FOR WELCOME

      signInButton.addEventListener("click",(addEventListener)=>{
        axios.delete("/routes/token")
        window.location.href = "/"
      })

      sidenavSignup.addEventListener("click",(event)=>{
        axios.delete("/routes/token")
        window.location.href = "/"
      })

      // FAB Sidenav Upcoming Events
      if(userUpcomingEvents.length >= 1){
        userUpcomingEvents.forEach(event => {
          const upcomingLi = document.createElement('li')
          const upcomingATag = document.createElement('a')

          upcomingATag.setAttribute('class', 'side-li waves-effect')

          upcomingATag.innerText = `${event.headliner} | ${moment(event.date).format("MM/DD/YY")} | ${event.time} | ${event.venue}`

          upcomingEventField.appendChild(upcomingLi)
          upcomingLi.appendChild(upcomingATag)
        })
      }
      else if(userUpcomingEvents.length === 0){
        const upcomingLi = document.createElement('li')
        const upcomingATag = document.createElement('a')

        upcomingATag.setAttribute('class', 'side-li waves-effect')

        upcomingATag.innerText = 'No upcoming events!'

        upcomingEventField.appendChild(upcomingLi)
        upcomingLi.appendChild(upcomingATag)
      }
      // End Upcoming Events

      // FAB Sidenav Watchlist

      const watchlistEventFieldLi = document.createElement('li')
      const watchlistEventFieldATag = document.createElement('a')

      const watchlistDividerLi = document.createElement('li')
      const watchListDivder = document.createElement('div')

      watchlistEventFieldATag.setAttribute('class', 'subheader')
      watchListDivder.setAttribute('class', 'divider')

      watchlistEventFieldATag.innerText = 'Watchlist'

      upcomingEventField.appendChild(watchlistEventFieldLi)
      watchlistEventFieldLi.appendChild(watchlistEventFieldATag)
      upcomingEventField.appendChild(watchListDivder)
    }
    //end of logged in  //////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\///////////////\\\\\\\\\\\\\\\\\\\\
    //start of calendar //////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\///////////////\\\\\\\\\\\\\\\\\\\\
    axios.all([axios.get("/routes/events"), axios.get("/routes/pickup")]).then(axios.spread((eventss, pickupss) => {
      pickupArr = [...pickupss.data]
      eventsArr = [...eventss.data]

      // Creating Table/ Blocks
      const body = document.querySelector('body')
      const calendar = document.querySelector('.calendar-section')
      const events = document.querySelector('#events-row')
      const form = document.createElement('form')



      const createRows = () => {
        eventsArr.forEach(event => {
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

      createRows()

      // Book Function
      const bookModal = document.querySelector('#modal3-content')

      calendar.addEventListener('click', (event) => {
        while (bookModal.firstChild) {
          bookModal.removeChild(bookModal.firstChild);
        }
        while(form.firstChild){
          form.removeChild(form.firstChild)
        }//WE NEED 2 WHILE LOOPS TO CLEAR THIS SHIZ

        let eventInfo = event.target.value
        let headliner = eventInfo.headliner
        let date = eventInfo.date
        let venue = eventInfo.venue
        let day = eventInfo.day
        let modalTitle = document.createElement('h5')

        modalTitle.innerText = `${headliner} - ${day} (${date}) at ${venue}`


        const modalFooter = document.createElement('div')
        const aTag = document.createElement('a')
        const bookSeat = document.createElement('button')
        const watchlistBtn = document.createElement('button')

        modalFooter.setAttribute('class', 'modal-footer col l12 s12')
        aTag.setAttribute('class', 'modal-close waves-effect btn-flat')
        bookSeat.setAttribute('class', 'btn waves-effect waves-light book-btn')
        watchlistBtn.setAttribute('class', 'btn-flat waves-effect waves-light modal-close')
        bookSeat.setAttribute('type', 'submit')
        bookSeat.setAttribute('name', 'action')
        bookSeat.setAttribute('onclick', 'submit()')
        modalFooter.setAttribute('class', 'modal-footer')
        form.setAttribute('action', reservationPostLocation)
        // form.setAttribute("id","DELETE")
        // form.setAttribute('method', 'post')


        bookSeat.innerText = "Book Seat"
        watchlistBtn.innerText = "Add to Watchlist"
        aTag.innerText = "Cancel"
        watchlistBtn.addEventListener("click",(clickyclick)=>{
          userWatchlist.push(eventInfo)
          localStorage.setItem("watchlist", JSON.stringify(userWatchlist))
          console.log(userWatchlist);
          if(userWatchlist.length >= 1){
            const watchlistLi = document.createElement('li')
            const watchlistATag = document.createElement('a')
            watchlistATag.setAttribute('class', 'side-li waves-effect')
            watchlistATag.innerText = `${userWatchlist[userWatchlist.length-1].headliner} | ${userWatchlist[userWatchlist.length-1].date} | ${userWatchlist[userWatchlist.length-1].day} | ${userWatchlist[userWatchlist.length-1].venue}`
            upcomingEventField.appendChild(watchlistLi)
            watchlistLi.appendChild(watchlistATag)
          }
        })
        bookModal.appendChild(modalTitle)
        bookModal.appendChild(form)

        // USE WITH Location
        pickupArr.forEach(option => {
          let service = "Bus To Show"
          let time = option.departureTime
          let location = option.locationName
          let optHeadliner = option.headliner
          let venue = option.venue
          let price = option.price
          let optDate = option.date
          let saleEnd = "11:30PM Day of Show"
          let roundTrip = true
          let rTrip

          roundTrip ? rTrip = '(and back)' : rTrip = ''

          let row = document.createElement('div')
          let pickupOption = document.createElement('div')
          let ticketQuantity = document.createElement('div')
          let ticketSelect = document.createElement('input')

          row.setAttribute('class', 'row')
          pickupOption.setAttribute('class', 'pickupOpt col s10 l11')
          ticketQuantity.setAttribute('class', 'col s2 l1 ticket-quantity-field')
          ticketSelect.setAttribute('type', 'number')
          ticketSelect.setAttribute('class', 'input validate ticket-input')



          pickupOption.innerText = `${service} | ${time} ${location} to ${headliner} at ${venue} ${rTrip} \n Price: $${price} \n ${saleEnd}`

          if (optHeadliner === headliner && moment(optDate).format("MM/DD/YY") === date) {
            form.appendChild(row)
            row.appendChild(pickupOption)
            row.appendChild(ticketQuantity)
            ticketQuantity.appendChild(ticketSelect)
          }
        })

        form.appendChild(modalFooter)
        modalFooter.appendChild(aTag)
        modalFooter.appendChild(watchlistBtn)
        modalFooter.appendChild(bookSeat)

      })


      // Book Button

      const ticketInput = document.querySelectorAll('.ticket-input')

      form.addEventListener('submit', (event) => {
        event.preventDefault()
        console.log(event)
        console.log(event.data)


      })

      function submit() {

      }
      // Sort (Stretch)
    }))
    ////////////////----------------------------------------------------////////////////////// end calendar.
    userWatchlist.forEach((watchListItem)=>{
      const watchlistLi = document.createElement('li')
      const watchlistATag = document.createElement('a')
      watchlistATag.setAttribute('class', 'side-li waves-effect')
      watchlistATag.innerText = `${watchListItem.headliner} | ${watchListItem.date} | ${watchListItem.day} | ${watchListItem.venue}`
      upcomingEventField.appendChild(watchlistLi)
      watchlistLi.appendChild(watchlistATag)
    })
  }))
  // End axios call
})
// End DOMContentLoaded
