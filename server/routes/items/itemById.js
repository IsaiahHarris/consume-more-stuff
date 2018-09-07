const express = require('express');
const router = express.Router();

const knex = require('../../db/knex');
const Item = require('../../db/models/Item');
const { uploadToS3 } = require('./../../../util');

// Required for withRelated to work:
const User = require('../../db/models/User');
const Category = require('../../db/models/Category');
const Condition = require('../../db/models/Condition');
const ItemStatus = require('../../db/models/ItemStatus');

router.route('/:id')
  .get((req, res) => {
    // Get a specifc item info:
    const itemId = req.params.id;

    return new Item()
      .query(qb => {
        qb.where({ id: itemId }).andWhere({ deleted_at: null });
      })
      .fetchAll({
        withRelated: ['seller', 'category', 'condition', 'itemStatus']
      })
      .then(item => {
        return res.json(item);
      })
      .catch(err => {
        return res.json({ error: err.message });
      });
  })
  .put((req, res) => {
    // Edit a specfic item info:
    const itemId = req.params.id;

    const itemInput = {
      title: req.body.title.trim(),
      price: req.body.price ? req.body.price.trim() : null,
      manufacturer: req.body.manufacturer ? req.body.manufacturer.trim() : null,
      model: req.body.model ? req.body.model.trim() : null,
      dimensions: req.body.dimensions ? req.body.dimensions.trim() : null,
      details: req.body.details ? req.body.details.trim() : null,
      category_id: Number(req.body.category_id),
      item_status_id: Number(req.body.item_status_id),
      condition_id: Number(req.body.condition_id)
    }

    // Used to store model of item edited in DB:
    let editedItem;

    // To be used if the user chooses to submit a new image:
    let imageData;

    if (req.files.file) {
      imageData = req.files.file;
    }

    return new Item()
      .query(qb => {
        qb.where({ id: itemId }).andWhere({ deleted_at: null });
      })
      .save(itemInput, { patch: true })
      .then(response => {
        editedItem = response;

        if (imageData) {
          return uploadToS3(itemId, imageData);
        } else {
          return null;
        }
      })
      .then(response => {
        if (response) {
          const imageUrl = response.Location;
          return editedItem
            .where({ id: itemId })
            .save({ image_url: imageUrl }, { patch: true });
        } else {
          return editedItem;
        }
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
        console.log(err.message);
        return res.json({ error: err.message });
      });
  })
  .delete((req, res) => {
    // FAKE deletion of a specific item:
    const itemId = req.params.id;

    return (
      new Item()
        .query(qb => {
          qb.where({ id: itemId }).andWhere({ deleted_at: null });
        })
        .save(
          {
            deleted_at: knex.fn.now() // Change the status of deleted_at timestamp.
          },
          { patch: true }
        )
        .then(() => {
          return new Item().where({ id: itemId }).refresh();
        })
        .then(item => {
          return res.json(item);
        })
        .catch(err => {
          console.log(err.message);
          return res.json({ error: err.message });
        })
    );
  });

module.exports = router;
