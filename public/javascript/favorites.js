document.addEventListener("DOMContentLoaded", () => {
  M.AutoInit();
  console.log("It's Alive")

  const logInButton = document.querySelector('.login-btn')
  const signInButton = document.querySelector('.signup-btn')
  const sidenav = document.querySelector('#mobile-demo')
  const sidenavLogin = document.querySelector('.login-link')
  const sidenavSignup = document.querySelector('.signup-link ')
  const navLinks = document.querySelector('.nav-links')
  const navWrapper = document.querySelector('.nav-wrapper')
  const fabSideNav = document.querySelector('#fab-SideNav')
  const sideNavName = document.querySelector('.sidenav-name')
  const sideNavEmail = document.querySelector('.sidenav-email')
  const upcomingEventField = document.querySelector('.sidenav')
  const watchlistField = document.querySelector('.watchlist')


  // Add call to user's favorited
  const userUpcomingEvents = []
  const userWatchlist = []


  axios.all([axios.get("/routes/token")]).then(axios.spread((bool)=>{
    let loggedIn = bool.data.boolean
    let firstName = bool.data.obj.firstName
    let lastName = bool.data.obj.lastName
    let userEmail = bool.data.obj.email

    console.log("logged in:", loggedIn)

    if(!loggedIn){
      fabSideNav.setAttribute('class', 'hide')
    }
    // End if logged out

    if(loggedIn){
      const uList = document.createElement('ul')
      const list = document.createElement('li')
      const anchor = document.createElement('a')

      navLinks.removeChild(logInButton)

      signInButton.removeAttribute('class', 'modal-trigger')
      sidenavSignup.removeAttribute('class', 'modal-trigger')
      sidenavLogin.removeAttribute('class', 'modal-trigger')

      uList.setAttribute('id', 'nav-mobile')
      uList.setAttribute('class', 'left hide-on-med-and-down')
      anchor.setAttribute('class', 'welcome-tag')
      signInButton.setAttribute('class', 'sign-out signup-btn btn')
      sidenavLogin.setAttribute('href', 'myevents.html')


      anchor.innerText = `Welcome, ${firstName} ${lastName}!`
      signInButton.innerText = "Sign Out"
      sidenavSignup.innerText = 'Sign Out'
      sidenavLogin.innerText = 'My Events'
      // sideNavName.innerText = firstName + ' ' + lastName + '\n'
      // sideNavEmail.innerText = userEmail


      navWrapper.appendChild(uList)
      uList.appendChild(list)
      list.appendChild(anchor)

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

          upcomingATag.innerText = 'Headliner | Date | Time | Venue'

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


      if(userWatchlist.length >= 1){
        userWatchlist.forEach(event => {
          const watchlistLi = document.createElement('li')
          const watchlistATag = document.createElement('a')

          watchlistATag.setAttribute('class', 'side-li waves-effect')

          watchlistATag.innerText = 'Headliner | Date | Time | Venue'

          upcomingEventField.appendChild(watchlistLi)
          watchlistLi.appendChild(watchlistATag)
        })
      }
      else if(userWatchlist.length === 0){
        const watchlistLi = document.createElement('li')
        const watchlistATag = document.createElement('a')

        watchlistATag.setAttribute('class', 'side-li waves-effect')

        watchlistATag.innerText = 'No watchlist events!'

        upcomingEventField.appendChild(watchlistLi)
        watchlistLi.appendChild(watchlistATag)
      }


    }
    // End if logged in
  }))
  // End axios call
})
// End DOMContentLoaded
