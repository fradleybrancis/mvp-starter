const express = require('express');
const path = require('path');
const controllers = require('./controllers');

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded());

app.use(express.static(path.join(__dirname, '/../react-client/dist')));

app.get('/logs', controllers.getAll);

// app.get('/total', controllers.total);

app.get('/allCoordinates', controllers.getAllCoordinates);

app.post('/logs', controllers.addSession);

app.delete('/logs', controllers.deleteLog);

app.listen(port, () => {
  console.log('listening on port' + port);
});
