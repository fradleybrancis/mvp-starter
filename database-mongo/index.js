var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/skateLogs');

var db = mongoose.connection;

db.on('error', function(err) {
  console.log('mongoose connection error', err);
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var sessionSchema = mongoose.Schema({
  date: Date,
  homies: String,
  location: String,
  kickflip: Boolean,
});

var SkateLog = mongoose.model('logs', sessionSchema);

module.exports.SkateLog = SkateLog;