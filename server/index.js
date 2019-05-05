const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('./controllers');

var items = require('../database-mongo');

var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/items', controllers.getAll)

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

