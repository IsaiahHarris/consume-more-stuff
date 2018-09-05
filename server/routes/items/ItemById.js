// Imports
const express = require('express');
const router = express.Router();
const knex = require('../../db/knex');
const Item = require('../../db/models/Item');

router.route('/:id')
  .get((req, res) => { // Get a specifc item info
    const id = req.params.id;

    return new Item()
      .query(qb => {
        qb.where({ id })
          .andWhere({ deleted_at: null });
      })
      .fetchAll({ withRelated: ['seller', 'category', 'condition', 'itemStatus'] })
      .then(item => {
        return res.json(item);
      })
      .catch(err => {
        return res.json({ 'error': err.message })
      });
  })
  .put((req, res) => { // Edit a specfic item info
    // console.log('REQ', req);
    //--Primary Keys--//
    const id = req.params.id ? req.params.id : req.body.id;

    const title = req.body.title ? req.body.title.trim() : null;
    const price = req.body.price ? req.body.price.trim() : null;
    const manufacturer = req.body.manufacturer ? req.body.manufacturer.trim() : null;
    const model = req.body.model ? req.body.model.trim() : null;
    const dimensions = req.body.dimensions ? req.body.dimensions.trim() : null;
    const details = req.body.details ? req.body.details.trim() : null;
    const image_url = req.body.image_url ? req.body.image_url.trim() : null;
    //--Foreign Keys--//
    const category_id = parseInt(req.body.category_id);
    const item_status_id = parseInt(req.body.item_status_id);
    const condition_id = parseInt(req.body.condition_id);

    // Edit using bookshelf
    return new Item()
      .query(qb => {
        qb.where({ id })
          .andWhere({ deleted_at: null });
      })
      .save({
        title: title ? title : null,
        price: price ? price : null,
        manufacturer: manufacturer ? manufacturer : null,
        model: model ? model : null,
        dimensions: dimensions ? dimensions : null,
        details: details ? details : null,
        image_url: image_url ? image_url : null,
        category_id,
        item_status_id,
        condition_id,
      }, { patch: true })
      .then(response => {
        console.log('Edited Item', response);
        return response.refresh({ withRelated: ['seller', 'category', 'condition', 'itemStatus'] })
      })
      .then(item => {
        return res.json(item);
      })
      .catch(err => {
        console.log(err.message);
        return res.json({ 'error': err.message })
      });
  })
  .delete((req, res) => { // FAKE deleting the specific item
    const id = req.params.id;

    return new Item()
      .query(qb => {
        qb.where({ id })
          .andWhere({ deleted_at: null });
      })
      // .where({ id })
      .save({
        deleted_at: knex.fn.now() // Change the status of deleted_at timestamp
      }, { patch: true })
      .then(() => {
        return new Item().where({ id }).refresh()
      })
      .then(item => {
        return res.json(item);
      })
      .catch(err => {
        console.log(err.message);
        return res.json({ 'error': err.message })
      });
  })

module.exports = router;