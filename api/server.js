"use strict";

const fs = require('fs');
const _ = require('lodash');
const cors = require("cors");
const express = require('express')
const app = express();

const bodyParser = require('body-parser');
const eventRoute = require('./event.route');
const emailScheduler = require('./shared/email-scheduler');
var config = require('./dbconfig');

app.use(cors());
app.options('*', cors());

// parse requests of content-type - application/json
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use('/api', eventRoute);

// app.use('/config', function (req, res) {
//   try {
//     const jsonData = fs.readFileSync('./config.json', 'utf8');
//     const parsedData = JSON.parse(jsonData);
//     console.log(parsedData); // Your JSON data as a JavaScript object
//     res.send(parsedData);
//   } catch (error) {
//     console.error('Error reading JSON file:', error.message);
//   }
// });
app.use('/', function (req, res) {
  res.send('Future Home of Condo Management Service');
});

// email scheduler ...
emailScheduler.startCron(); // start service..

app.use((req, res) => {
  res.status(404);
  res.json({
    error: {
      code: 404
    }
  });
})

const PORT = process.env.PORT || 8090;
app.listen(PORT, () => {
  console.log(`Started server on port ${PORT} on ... `);
  console.log('target database ==> ' + config.database);  
});
