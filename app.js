const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const {util, seed} = require('data-seed')
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

app.use('/', indexRouter);

module.exports = app;
