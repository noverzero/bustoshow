document.addEventListener('DOMContentLoaded', function(event) {
  console.log("It's Alive")
  M.AutoInit();


  // To be carried over from bookBtn.value
  let bookingBtn = {
    headliner: 'Bandz All Here',
    day: 'Monday',
    date: '12/12/3021',
    venue: 'Moon Base',
    pickupLoc: 'Cheba Hut on the Hill',
    pickupTime: '5:00pm'
  }

  // To be replaced with user data from db
  const userPaymentInfo = {
    first: 'Dustin',
    last: 'Huth',
    email: 'sweepTheLeg@karatemail.com',
    event: bookingBtn.event,
    pickup: bookingBtn.pickup
  }

  const paymentField = document.querySelector('.payment-header')

  const paymentHeader = document.createElement('h4')
  const pickupHeader = document.createElement('h4')

  pickupHeader.setAttribute('class', 'redText')


  paymentHeader.innerText = `${bookingBtn.headliner} - ${bookingBtn.day} (${bookingBtn.date}) at ${bookingBtn.venue}`

  pickupHeader.innerText = `Pickup: ${bookingBtn.pickupLoc} - ${bookingBtn.pickupTime}`

  paymentField.appendChild(paymentHeader)
  paymentField.appendChild(pickupHeader)

  const firstNameField = document.querySelector('#first_name_payment')
  const lastNameField = document.querySelector('#last_name_payment')
  const emailField = document.querySelector('#email_payment')





  const userFirstName = userPaymentInfo.first
  const userLastName = userPaymentInfo.last
  const userEmail = userPaymentInfo.email


  let loggedIn = true

  if (loggedIn) {
    firstNameField.setAttribute('value', `${userFirstName}`)
    lastNameField.setAttribute('value', `${userLastName}`)
    emailField.setAttribute('value', `${userEmail}`)


    M.updateTextFields();
  }


  // Create a Stripe client.
  var stripe = Stripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

  // Create an instance of Elements.
  var elements = stripe.elements();

  // Custom styling can be passed to options when creating an Element.
  // (Note that this demo uses a wider set of styles than the guide below.)
  var style = {
    base: {
      color: '#32325d',
      lineHeight: '18px',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4'
      }
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a'
    }
  };

  // Create an instance of the card Element.
  var card = elements.create('card', {
    style: style
  });

  // Add an instance of the card Element into the `card-element` <div>.
  card.mount('#card-element');

  // Handle real-time validation errors from the card Element.
  card.addEventListener('change', function(event) {
    var displayError = document.getElementById('card-errors');
    if (event.error) {
      displayError.textContent = event.error.message;
    } else {
      displayError.textContent = '';
    }
  });

  // Handle form submission.
  var form = document.getElementById('payment-form');
  form.addEventListener('submit', function(event) {
    event.preventDefault();

    stripe.createToken(card).then(function(result) {
      if (result.error) {
        // Inform the user if there was an error.
        var errorElement = document.getElementById('card-errors');
        errorElement.textContent = result.error.message;
      } else {
        // Send the token to your server.
        stripeTokenHandler(result.token);
      }
    });
  });

  // Submit the form with the token ID.
  function stripeTokenHandler(token) {
    // Insert the token ID into the form so it gets submitted to the server
    var form = document.getElementById('payment-form');
    var hiddenInput = document.createElement('input');
    hiddenInput.setAttribute('type', 'hidden');
    hiddenInput.setAttribute('name', 'stripeToken');
    hiddenInput.setAttribute('value', token.id);
    form.appendChild(hiddenInput);

    // Submit the form
    form.submit();
  }




}) // DOMContentLoaded;
