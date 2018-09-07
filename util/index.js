require('dotenv').config();

const AWS = require('aws-sdk');

module.exports = {
  uploadToS3: (itemId, file) => {
    return new Promise((resolve, reject) => {
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
            return reject(err);
          }
          console.log('Success:', data);
          return resolve(data);
        });
      });
    });
  }
};
