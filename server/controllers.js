const multiparty = require('multiparty');
const AWS = require('aws-sdk');
const fs = require('fs');
const fileType = require('file-type');
const bluebird = require('bluebird');
const { SkateLog } = require('../database-mongo');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

AWS.config.setPromisesDependency(bluebird);

const s3 = new AWS.S3();

const uploadFile = (buffer, name, type) => {
  const params = {
    ACL: 'public-read',
    Body: buffer,
    Bucket: process.env.S3_BUCKET,
    ContentType: type.mime,
    Key: `${name}.${type.ext}`,
  };
  return s3.upload(params).promise();
};

module.exports.getAll = (req, res) => {
  SkateLog.find()
    .sort([['date', -1]])
    .exec((error, logs) => {
      if (error) {
        res.sendStatus(500);
      } else {
        res.json(logs);
      }
    });
};

module.exports.addSession = (request, response) => {
  const form = new multiparty.Form();
  form.parse(request, async (error, fields, files) => {
    if (error) throw new Error(error);
    try {
      const { date, location, notes } = fields;
      const { path } = files.file[0];
      const buffer = fs.readFileSync(path);
      const type = fileType(buffer);
      const timestamp = Date.now().toString();
      const fileName = `bucketFolder/${timestamp}-lg`;
      const data = await uploadFile(buffer, fileName, type);
      await SkateLog.create({
        date: date[0],
        location: location[0],
        footy: data.Location,
        notes: notes[0],
      }, (err) => {
        if (err) throw new Error(err);
      });
      return response.status(200).send(data);
    } catch (error) {
      return response.status(400).send(error);
    }
  });
};

module.exports.total = (req, res) => {
  SkateLog.count({}, (err, count) => {
    if (err) {
      res.status(400);
    } else {
      res.status(200).json(count);
    }
  });
};

module.exports.deleteLog = (req, res) => {
  SkateLog.remove({ _id: req.query.id }, (error, data) => {
    if (error) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
};

module.exports.getAllCoordinates = (req, res) => {
  SkateLog.find({ location: /\d+/ })
    .exec((err, data) => {
      if (err) {
        res.sendStatus(400);
      } else {
        res.json(data);
      }
    });
};
