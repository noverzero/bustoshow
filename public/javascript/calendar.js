document.addEventListener('DOMContentLoaded', (event) => {
  console.log("It's Alive")
  M.AutoInit();

  const reservationPostLocation = '/payment.html'

  axios.all([axios.get("/routes/events"), axios.get("/routes/pickup")]).then(axios.spread((eventss, pickupss) => {
    pickupArr = [...pickupss.data]
    eventsArr = [...eventss.data]

    console.log('eventsArr::', eventsArr)

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


      const modalFooter = document.createElement('div')
      const aTag = document.createElement('a')
      const bookSeat = document.createElement('button')

      modalFooter.setAttribute('class', 'modal-footer col l12 s12')
      aTag.setAttribute('class', 'modal-close waves-effect btn-flat')
      bookSeat.setAttribute('class', 'btn waves-effect waves-light book-btn')
      bookSeat.setAttribute('type', 'submit')
      bookSeat.setAttribute('name', 'action')
      bookSeat.setAttribute('onclick', 'submit()')
      modalFooter.setAttribute('class', 'modal-footer')
      form.setAttribute('action', reservationPostLocation)
      // form.setAttribute('method', 'post')


      bookSeat.innerText = "Book Seat"
      aTag.innerText = "Cancel"


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
}) // DOMContentLoaded;
