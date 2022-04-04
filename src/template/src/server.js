// Require Dependencies
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const logger = require('./util/logger');

// Load .env Enviroment Variables to process.env
require('dotenv').config();

// Instantiate an Express Application
const app = express();

// Configure Express App Instance
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Configure custom logger middleware
app.use(logger.dev, logger.combined);

// Configure custom middleware
app.use(cookieParser());
app.use(cors());
app.use(helmet());

// This middleware adds the json header to every response
app.use('*', (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

// Assign Routes
app.use('/', require('./routes/router.js'));

// Handle not valid route
app.use('*', (req, res) => {
  res.status(404).json({ status: false, message: 'Endpoint Not Found' });
});

// Open Server on selected Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.info('Server listening on port', PORT));
