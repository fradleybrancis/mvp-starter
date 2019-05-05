var items = require('../database-mongo');

module.exports.getAll = (req, res) => {
  items.selectAll(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
}