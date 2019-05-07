const express = require('express');
const controllers = require('./controllers');

var app = express();
app.use(express.json());
app.use(express.urlencoded());

app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/logs', controllers.getAll);

app.get("/total", controllers.total);

app.post('/logs', controllers.addSession);

app.delete("/logs", controllers.deleteLog);

app.listen(3000, () => {
  console.log('listening on port 3000');
});

