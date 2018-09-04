const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../db/models/User');
const saltedRounds = 12;

router.post('/register', (req, res) => {
  console.log('Register Route Backend: ', req.body);
  let {
    username,
    email
  } = req.body;
  const user_status_id = 1
  bcrypt.genSalt(saltedRounds, (err, salt) => {
    if (err) { return res.status(500); }
    bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
      if (err) { return res.status(500); }
      // needs username(unique), password, and email(unique) to register
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
          res.json({ message: 'username/email already exists' })
        });
    })
  })
});

// Log in with username and password
router.post('/login', (req, res, next) => {
  if(req.user) { // if user is logged in tell them to log out first
    res.status(400).json({message: `${req.user.username} is already logged in`});
  } else {
    passport.authenticate('local', (err, user) => {
      if (err) {
        return res.status(400).json({message: err.message});
      } else {
        req.login(user, (err) => {
          if (err) { return next(err); }
          else {
            res.json({ username: user.username })
          }
        })
      }
    })(req, res, next);
  }
});

router.get('/logout', (req, res) => {
  req.logout();
  res.json({ success: true })
});



module.exports = router;