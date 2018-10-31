require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const busboy = require('connect-busboy');
const busboyBodyParser = require('busboy-body-parser');
const app = express();
const routes = require('./routes');
const PORT = process.env.PORT || 8080;

// Auth Imports:
const session = require('express-session');
const Redis = require('connect-redis')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const User = require('./db/models/User');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(busboy());
app.use(busboyBodyParser());

// ---------------------=[   PASSPORT Config Start   ]=--------------------- //
app.use(
  session({
    store: new Redis(),
    secret: process.env.PASSPORT_SECRET,
    resave: false,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  return done(null, {
    id: user.id,
    username: user.username
  });
});

passport.deserializeUser((user, done) => {
  new User({ id: user.id })
    .fetch()
    .then(user => {
      user = user.toJSON();
      return done(null, {
        // You can get more data from DB:
        id: user.id,
        username: user.username
      });
    })
    .catch(err => {
      console.log(err);
      return done(err);
    });
});

passport.use(
  new LocalStrategy(function(username, password, done) {
    return new User({ username: username })
      .fetch()
      .then(user => {
        if (!user) {
          return done({ message: 'Wrong Username' });
        } else {
          user = user.toJSON();
          bcrypt.compare(password, user.password).then(samePassword => {
            if (samePassword) {
              return done(null, user);
            } else {
              return done({ message: 'Wrong Password' });
            }
          });
        }
      })
      .catch(err => {
        console.log('error: ', err);
        return done(err);
      });
  })
);
// ----------------------=[   PASSPORT Config End   ]=---------------------- //

app.use('/api', routes);

// 404 Handler:
app.get('*', (req, res) => {
  res.status(404).send({ message: 'Page not found!' });
});

// Catch-All Error Handler:
app.use(function(err, req, res, next) {
  console.error(err.stack);

  if (err) {
    res.status(500).json({ error: err });
  }

  next();
});

app.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
});
