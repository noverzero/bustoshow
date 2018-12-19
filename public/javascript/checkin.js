document.addEventListener("DOMContentLoaded", () => {
  M.AutoInit()

  axios.get("/routes/events/12/pickup/7").then((checkinInfo) => {

    let usersArr = checkinInfo.data
    
    // Creating Table/ Blocks
    const body = document.querySelector('body')
    const checkinList = document.querySelector('#checkin-list')
    const events = document.querySelector('#checkin-events-row')
    const subheader = document.querySelector('#subheader')
    
    subheader.setAttribute("class","subheaderText")
    subheader.innerText = `PICKUP: ${usersArr[0].locationName}, SHOW: ${usersArr[0].headliner}`

    const createRows = () => {
    let num = 0
      usersArr.forEach(user => {
        num++
        let riderFirstName = user.firstName
        let riderLastName = user.lastName
        let firstNameDiv = document.createElement('div')
        let lastNameDiv = document.createElement('div')
        let checkInDiv = document.createElement('div')
        let checkInForm = document.createElement('form')
        let checkInCheckBox = document.createElement('input')
        let checkInLabel = document.createElement('label')
        let checkInSpan = document.createElement('span')

        firstNameDiv.setAttribute('class', 'col l5 s5 row-element valign-wrapper date-div')
        lastNameDiv.setAttribute('class', 'col l5 s5 row-element valign-wrapper')
        checkInDiv.setAttribute('class', 'col l2 s2 row-element valign-wrapper')
        checkInCheckBox.setAttribute('type', 'checkbox')
        checkInCheckBox.setAttribute('class', `filled-in checkbox-user`)
        checkInCheckBox.setAttribute('id', `checkinbox ${num}`)
        checkInLabel.setAttribute('for', `checkinbox ${num}`)

        firstNameDiv.innerText = `${riderFirstName}`
        lastNameDiv.innerText = `${riderLastName}`

        events.appendChild(firstNameDiv)
        events.appendChild(lastNameDiv)
        events.appendChild(checkInDiv)
        checkInDiv.appendChild(checkInForm)
        checkInForm.appendChild(checkInLabel)
        checkInLabel.appendChild(checkInCheckBox)
        checkInLabel.appendChild(checkInSpan)

        checkInCheckBox.addEventListener('click', () => {
          console.log('CLICKKED')
        })
      })

    }
    createRows()
  })

})
