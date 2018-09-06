require('dotenv').config();

const express = require('express');
const router = express.Router();

const AWS = require('aws-sdk');
const Busboy = require('busboy');

function uploadToS3(res, itemId, file) {
  const s3bucket = new AWS.S3({
    accessKeyId: process.env.IAM_USER_KEY,
    secretAccessKey: process.env.IAM_USER_SECRET,
    Bucket: process.env.S3_BUCKET_NAME
  });

  s3bucket.createBucket(() => {
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `${itemId}/${file.name}`,
      Body: file.data
    };

    s3bucket.upload(params, (err, data) => {
      if (err) {
        console.log(err);
        return res.json({ error: err });
      }
      console.log('Success:', data);
      return res.json({ data });
    });
  });
}

router.post('/s3Upload', (req, res) => {
  console.log('S3UPLOAD REQ', req);

  const busboy = new Busboy({ headers: req.headers });

  busboy.on('finish', () => {
    const itemId = req.body.itemId;
    const file = req.files.file;

    uploadToS3(res, itemId, file);
  });

  req.pipe(busboy);
});

module.exports = router;
