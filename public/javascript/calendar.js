document.addEventListener('DOMContentLoaded', (event) => {
  console.log("It's Alive")
  M.AutoInit();
  axios.all([axios.get("/routes/events"),axios.get("/routes/pickup")]).then(axios.spread((eventss,pickupss)=>{
    console.log(eventss.data);
    console.log(pickupss.data);
    pickupArr = [...pickupss.data]
    eventsArr = [...eventss.data]

    console.log('eventsArr::', eventsArr)

    // Creating Table/ Blocks
    const body = document.querySelector('body')
    const calendar = document.querySelector('.calendar-section')
    const events = document.querySelector('#events-row')


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

      while (bookModal.hasChildNodes()) {
        bookModal.removeChild(bookModal.lastChild);
      }

      let eventInfo = event.target.value
      let headliner = eventInfo.headliner
      let date = eventInfo.date
      let venue = eventInfo.venue
      let day = eventInfo.day
      let modalTitle = document.createElement('h5')

      modalTitle.innerText = `${headliner} - ${day} (${date}) at ${venue}`

      bookModal.appendChild(modalTitle)

      // USE WITH Location
      pickupArr.forEach(option => {
        let service = "Bueses To Show"
        let time = option.departureTime
        let location = option.locationName
        let headliner = option.headliner
        let venue = option.venue
        let price = option.price
        let saleEnd = "11:30PM Day of Show"
        let roundTrip = true
        let rTrip

        roundTrip ? rTrip = '(and back)' : rTrip = ''

        let row = document.createElement('div')
        let pickupOption = document.createElement('div')

        row.setAttribute('class', 'row')
        pickupOption.setAttribute('class', 'pickupOpt col s12 l12')

        pickupOption.innerText = `${service} | ${time} ${location} to ${headliner} at ${venue} ${rTrip} \n Price: $${price} \n ${saleEnd}`

        if(option.headliner === eventInfo.headliner && moment(option.date).format("MM/DD/YY") === date){
          modalTitle.appendChild(row)
          row.appendChild(pickupOption)
        }
      })
    })

    // Book Button
    const bookBtn = document.querySelector('.book-btn')

    bookBtn.addEventListener('click', (event) => {
      console.log('Book button clicked from modal')
      bookBtn.setAttribute('class', 'modal-close')
    })

    // Sort (Stretch)



  }))
}) // DOMContentLoaded;
