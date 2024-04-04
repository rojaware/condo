"use strict";


const _ = require('lodash');
const cors = require("cors");
const express = require('express')
const app = express();

const bodyParser = require('body-parser');

const eventRoute = require('./event.route');


app.use(cors());
app.options('*', cors());

// parse requests of content-type - application/json
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use('/api', eventRoute);
app.use('/', function (req, res) {
  res.send('Future Home of Condo Management Service');
});

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
});
