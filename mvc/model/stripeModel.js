const knex = require("../../knex.js")

// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
const stripe = require("stripe")("sk_test_UpJeVveXeyBBKiiJUcE4SWm6")

// Token is created using Checkout or Elements!
// Get the payment token ID submitted by the form:
