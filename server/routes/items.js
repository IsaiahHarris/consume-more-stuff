const express = require('express');
const router = express.Router();
const Item = require('../db/models/Item');

router.route('/')
  .get((req, res) => { // Fetches all the items
    return Item.fetchAll() // Need to include a where depending on  category
      .then(items => {
        return res.json(items);
      })
      .catch(err => {
        return res.json({ 'error': err.message })
      });
  })
  .post((req, res) => { // Posts one new item
    //--Primary Keys--// 
    const title = req.body.title.trim();
    const price = req.body.price.trim();
    const manufacturer = req.body.manufacturer.trim();
    const model = req.body.model.trim();
    const dimensions = req.body.dimensions.trim();
    const details = req.body.details.trim();
    const image_url = req.body.image_url.trim();
    //--Foreign Keys--//
    const seller_id = parseInt(req.body.seller_id);
    const category_id = 1; // Only works for vehicles
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
      condition_id,
    }

    // Save item to db with bookshelf
    return new Item()
      .save(itemInput)
      .then(item => {
        return res.json(item);
      })
      .catch(err => {
        return res.json({ 'error': err.message })
      });
  })

module.exports = router;