require('dotenv').config();

const express = require('express');
const router = express.Router();

const AWS = require('aws-sdk');
const Busboy = require('busboy');

function uploadToS3(userId, file) {
  const s3bucket = new AWS.S3({
    accessKeyId: process.env.IAM_USER_KEY,
    secretAccessKey: process.env.IAM_USER_SECRET,
    Bucket: process.env.S3_BUCKET_NAME
  });

  s3bucket.createBucket(() => {
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `${userId}/${file.name}`,
      Body: file.data
    };

    s3bucket.upload(params, (err, data) => {
      if (err) {
        console.log(err);
      }
      console.log('Success:', data);
      return data;
    });
  });
}

router.post('/s3Upload', (req, res) => {
  console.log('BODY', req.body);
  console.log('FILES', req.files);

  const busboy = new Busboy({ headers: req.headers });

  busboy.on('finish', () => {
    const userId = 1;
    const file = req.files.file;

    uploadToS3(userId, file);

    res.json({ test: 'test' });
    console.log('Upload Complete:', file);
  });

  req.pipe(busboy);
});

module.exports = router;
