require('dotenv').config();

// Main imports
const express = require('express');
const router = express.Router();

const AWS = require('aws-sdk');
const Busboy = require('busboy');

const Item = require('../../db/models/Item');
const itemId = require('./ItemById');
// Models I need to import for withRelatd to work
const User = require('../../db/models/User');
const Category = require('../../db/models/Category');
const Condition = require('../../db/models/Condition');
const ItemStatus = require('../../db/models/ItemStatus');

// items root route
router
  .route('/')
  .get((req, res) => {
    // Fetches all the items for homepage
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
    console.log('POST REQ', req);
    console.log('POST REQ BODY', req.body);

    const imageData = req.files.file;
    console.log('POST REQ IMG DATA', imageData);

    // Posts one new item

    //--Primary Keys--//
    const title = req.body.title.trim();
    const price = req.body.price ? req.body.price.trim() : req.body.price;
    const manufacturer = req.body.manufacturer
      ? req.body.manufacturer.trim()
      : req.body.manufacturer;
    const model = req.body.model ? req.body.model.trim() : req.body.model;
    const dimensions = req.body.dimensions
      ? req.body.dimensions.trim()
      : req.body.dimensions;
    const details = req.body.details
      ? req.body.details.trim()
      : req.body.details;
    const image_url = req.body.image_url
      ? req.body.image_url.trim()
      : req.body.image_url;

    //--Foreign Keys--//
    const seller_id = parseInt(req.body.seller_id);
    const category_id = parseInt(req.body.category_id);
    const item_status_id = parseInt(req.body.item_status_id);
    const condition_id = parseInt(req.body.condition_id);

    // No empty strings for db
    const itemInput = {
      title: title ? title : null,
      price: price ? price : null,
      manufacturer: manufacturer ? manufacturer : null,
      model: model ? model : null,
      dimensions: dimensions ? dimensions : null,
      details: details ? details : null,
      image_url: image_url ? image_url : null,
      seller_id,
      category_id,
      item_status_id,
      condition_id
    };

    let itemId;

    // Save item to db with bookshelf
    return new Item()
      .save(itemInput)
      .then(response => {
        return response.refresh({
          withRelated: ['seller', 'category', 'condition', 'itemStatus']
        });
      })
      .then(response => {
        console.log('DB RESPONSE', response);

        itemId = response.attributes.id;
        const busboy = new Busboy({ headers: req.headers });

        busboy.on('finish', () => {
          uploadToS3(itemId, imageData);
        });

        return req.pipe(busboy);
      })
      .then(s3Response => {
        console.log('FINAL S3 RESPONSE DATA', s3Response);

        //--Primary Keys--//
        const id = itemId;

        const image_url = `https://cms-2018.s3.amazonaws.com/${itemId}/${imageData.name}`;

        // Edit using bookshelf
        return new Item()
          .query(qb => {
            qb.where({ id }).andWhere({ deleted_at: null });
          })
          .save(
            {
              title: title ? title : null,
              price: price ? price : null,
              manufacturer: manufacturer ? manufacturer : null,
              model: model ? model : null,
              dimensions: dimensions ? dimensions : null,
              details: details ? details : null,
              image_url: image_url ? image_url : null,
              category_id,
              item_status_id,
              condition_id
            },
            { patch: true }
          )
          .then(response => {
            console.log('Edited Item', response);
            return response.refresh({
              withRelated: ['seller', 'category', 'condition', 'itemStatus']
            });
          })
          .then(item => {
            return res.json(item);
          })
          .catch(err => {
            console.log(err.message);
            return res.json({ error: err.message });
          });
      })
      .catch(err => {
        return res.json({ error: err.message });
      });
  });

// Items search route, let George know if you need search route from category
router.route('/search/:term').get((req, res) => {
  // Fetches all items in home based on a search term
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

// Items category route
router.route('/category/:categoryId').get((req, res) => {
  // Fetch all items for different categories
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

//-- Specfic Item Routes at ItemById.js --//
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
