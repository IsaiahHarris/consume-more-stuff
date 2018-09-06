require('dotenv').config();

const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const Busboy = require('busboy');
const Item = require('../../db/models/Item');
const itemId = require('./ItemById');

// Required for withRelated to work:
const User = require('../../db/models/User');
const Category = require('../../db/models/Category');
const Condition = require('../../db/models/Condition');
const ItemStatus = require('../../db/models/ItemStatus');

// Items Root Route:
router.route('/')
  .get((req, res) => {
    // Fetches all items for the home page:
    return Item.query(function(qb) {
      qb.orderBy('created_at', 'DESC');
    })
      .where({ deleted_at: null })
      .fetchAll({
        withRelated: ['seller', 'category', 'condition', 'itemStatus']
      })
      .then(items => {
        return res.json(items);
      })
      .catch(err => {
        return res.json({ error: err.message });
      });
  })
  .post((req, res) => {
    const itemInput = {
      title: req.body.title.trim(),
      price: req.body.price ? req.body.price.trim() : null,
      manufacturer: req.body.manufacturer ? req.body.manufacturer.trim() : null,
      model: req.body.model ? req.body.model.trim() : null,
      dimensions: req.body.dimensions ? req.body.dimensions.trim() : null,
      details: req.body.details ? req.body.details.trim() : null,
      image_url: req.body.image_url ? req.body.image_url.trim() : null,
      seller_id: Number(req.body.seller_id),
      category_id: Number(req.body.category_id),
      item_status_id: Number(req.body.item_status_id),
      condition_id: Number(req.body.condition_id)
    };

    // Variables to be used if the new item includes an image:
    let itemId;
    let imageData;
    let image_url;

    if (req.files.file) {
      imageData = req.files.file;
    }

    return new Item()
      .save(itemInput)
      .then(response => {
        return response.refresh({
          withRelated: ['seller', 'category', 'condition', 'itemStatus']
        });
      })
      .then(response => {
        if (imageData) {
          const busboy = new Busboy({ headers: req.headers });

          // Set itemId to ensure file is saved to unique AWS folder:
          itemId = response.attributes.id;

          busboy.on('finish', () => {
            uploadToS3(itemId, imageData);
          });
          return req.pipe(busboy);
        }

        return response;
      })
      .then(response => {
        if (imageData) {
          // Set default placeholder if user did not upload image:
          image_url = imageData
            ? `https://cms-2018.s3.amazonaws.com/${itemId}/${imageData.name}`
            : 'https://i.imgur.com/34axnfY.png';

          return new Item()
            .where({ id: itemId })
            .save({ image_url }, { patch: true });
        }

        return response;
      })
      .then(response => {
        return response.refresh({
          withRelated: ['seller', 'category', 'condition', 'itemStatus']
        });
      })
      .then(item => {
        return res.json(item);
      })
      .catch(err => {
        return res.json({ error: err.message });
      });
  });

// Items Search Route, let George know if you need search route from category
router.route('/search/:term').get((req, res) => {
  // Fetches all items in home based on a search term:
  const term = `%${req.params.term}%`;

  return Item.query(qb => {
    qb.whereRaw(`LOWER(title) LIKE ?`, [term]).andWhere({ deleted_at: null });
  })
    .fetchAll()
    .then(items => {
      return res.json(items);
    })
    .catch(err => {
      return res.json({ error: err.message });
    });
});

// Items Category Route:
router.route('/category/:categoryId').get((req, res) => {
  // Fetch all items for different categories:
  const category_id = req.params.categoryId;
  console.log('category running: ', category_id);
  return Item.query(qb => {
    qb.where({ category_id }).andWhere({ deleted_at: null });
  })
    .fetchAll({
      withRelated: ['seller', 'category', 'condition', 'itemStatus']
    })
    .then(items => {
      return res.json(items);
    })
    .catch(err => {
      return res.json({ error: err.message });
    });
});

//-- Specfic Item Routes located at ItemById.js --//
router.use('/', itemId);

// -----------------------=[   HELPER FUNCTION(S)   ]=----------------------- //

function uploadToS3(itemId, file) {
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
        return err;
      }
      console.log('Success:', data);
      return data;
    });
  });
}

module.exports = router;
