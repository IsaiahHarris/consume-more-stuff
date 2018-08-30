const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../db/models/User');
const saltedRounds = 12;

router.post('/register', (req, res) => {
  let {
    username,
    email
  } = req.body;
  const user_status_id = 1
  bcrypt.genSalt(saltedRounds, (err, salt) => {
    if (err) { return res.status(500); }
    bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
      if (err) { return res.status(500); }
      return new User({
        username: username.toLowerCase(),
        password: hashedPassword,
        email,
        user_status_id
      })
        .save()
        .then((result) => {
          res.json(result.attributes.username);
        })
        .catch(err => {
          console.log('err.message', err.message);
          res.json({ message: 'username already exists' })
        });
    })
  })
});

router.post('/login', (req, res, next) => {
  req.body.username = req.body.username
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.send('login failed');
    }
    req.login(user, (err) => {
      if (err) { return next(err); }
      else {
        res.json({ username: user.username })
      }
    });
  })(req, res, next);
});

router.get('/logout', (req, res) => {
  req.logout();
  res.json({ success: true })
});



module.exports = router;