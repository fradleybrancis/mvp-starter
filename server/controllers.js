var { SkateLog } = require('../database-mongo');

module.exports.getAll = (req, res) => {
  SkateLog.find()
    .sort([['date', -1]])
    .exec((error, logs) => {
      if(error) {
        res.sendStatus(500);
      } else {
        res.json(logs);
      }
    }) 
}

module.exports.addSession = (req, res) => {
  SkateLog.create(req.body, (error, session) => {
    if (error) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  })
}

module.exports.total = (req, res) => {
  SkateLog.find({"kickflip": true})
    .exec((err, data) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.send(data);
      }
    })
}

module.exports.deleteLog = (req, res) => {
  SkateLog.remove({ "date": req.query.date }, (error, data) => {
  if (error) {
        console.log(error);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
  })
}