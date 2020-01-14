const mongoose = require('mongoose');
const bluebird = require('bluebird');

mongoose.Promise = bluebird;

mongoose.connect(`mongodb+srv://brad:${process.env.mongoPW}@fradleyscluster-dcayx.mongodb.net/test`, {
  useNewUrlParser: true,
});

const db = mongoose.connection;

db.on('error', (err) => {
  console.log('mongoose connection error', err);
});

db.once('open', () => {
  console.log('mongoose connected successfully');
});

const sessionSchema = mongoose.Schema({
  date: Date,
  footy: String,
  location: String,
  notes: String,
  fileName: String,
});

const SkateLog = mongoose.model('logs', sessionSchema);

module.exports.SkateLog = SkateLog;
