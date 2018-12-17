const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const {util, seed} = require('data-seed')
const cors = require("cors")
require("dotenv").config()

const indexRouter = require('./mvc/routes/routes');

const stripe = require("stripe")("sk_test_UpJeVveXeyBBKiiJUcE4SWm6");

const charge = stripe.charges.create({
  amount: 999,
  currency: 'usd',
  source: 'tok_visa',
  receipt_email: 'jenny.rosen@example.com',
});

const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use(cors())
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
//// CORS HEADERS \\\\
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
//   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, DELETE, PUT')
//   res.header('Referrer-Policy', 'no-referrer')
//   if (req.method === 'OPTIONS') {
//     return res.sendStatus(200)
//   }
//   else {
//     next()
//   }
// })
app.use(cors())
app.use('/routes', indexRouter);

module.exports = app;
