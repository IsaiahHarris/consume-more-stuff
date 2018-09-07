const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 12;
const User = require('../db/models/User');
const Item = require('../db/models/Item');

router.put('/settings', (req, res) => {
  let id = req.user.id;
  let { oldPass, newPass } = req.body;
  return User.where({ id })
    .fetchAll()
    .then(user => {
      bcrypt
        .compare(oldPass, user.models[0].attributes.password)
        .then(result => {
          if (result) {
            bcrypt.genSalt(saltRounds, (err, salt) => {
              bcrypt.hash(newPass, salt, (err, hashedPassword) => {
                if (err) {
                  return res.status(500);
                }
                return User.where({ id })
                  .save({ password: hashedPassword }, { patch: true })
                  .then(user => {
                    res.json({ message: 'success' });
                  });
              });
            });
          } else {
            res.json({ message: 'wrong existing password' });
          }
        });
    });
});
// This route fetches "published" items
router.get('/published', (req, res) => {
  return Item.query(qb => {
    qb.where({ item_status_id: 1 }).andWhere({ deleted_at: null });
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

// This route returns "sold" items
router.get('/sold', (req, res) => {
  return Item.query(qb => {
    qb.where({ item_status_id: 2 }).andWhere({ deleted_at: null });
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

module.exports = router;
