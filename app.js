// Basic lib
const express = require('express');
const router = require('./src/routes/api');
const app = new express();
const bodyPerser = require('body-parser')


// Security middleware lib import
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');

// Database lib import
const mongoose = require('mongoose');


// Security middleware implement
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

// BodyPerser implement
app.use(bodyPerser.json());

// Request rate limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3000
});
app.use(limiter);


// MongoDB database connection
const URI = 'mongodb://127.0.0.1:27017/ToDo';
const OPTION = { user: '', pass: '' }

mongoose.connect(URI, OPTION, (error) => {
  if (!error) console.log('Database Connection Success');
  console.log(error);
});


// Routing implement
app.use('/api/v1', router);

// Undefined router manage
app.use('*', (req, res) => {
  res.status(404).json({ status: 'Fail', data: 'Not Found' });
});

module.exports = app;