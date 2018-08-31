require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./routes');
const PORT = process.env.PORT || 8080;

//auth imports
const session = require('express-session');
const Redis = require('connect-redis')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const User = require('./db/models/User');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))



app.use(session({
  store: new Redis(),
  secret: process.env.PASSPORT_SECRET,
  resave: false,
  saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  return done(null, {
    id: user.id,
    username: user.username
  })
})

passport.deserializeUser((user, done) => {
  new User({ id: user.id })
    .fetch()
    .then(user => {
      if (!user) {
        return done(null, false)
      } else {
        user = user.toJSON();
        return done(null, {
          id: user.id,
          username: user.username
        })
      }
    })
    .catch(err => {
      console.log('err.messagejhjh', err.message);
      return done(err)
    })
})

passport.use(new LocalStrategy(function (username, password, done) {
  return new User({ username: username }).fetch()
    .then(user => {
      if (user === null) {
        return done(null, false, { message: 'bad username or password' });
      } else {
        user = user.toJSON();
        bcrypt.compare(password, user.password)
          .then(samePassword => {
            if (samePassword) { return done(null, user); }
            else {
              return done(null, false, { message: 'bad username or password' });
            }
          })
      }
    })
    .catch(err => {
      console.log('err', err);
      return done(err);
    });
}));

//-- send you to all the api routes --//
app.use('/api', routes);

//-- 404 --//
app.get('*', (req, res) => {
  res.status(404).send({ 'message': 'Page not found!' });
})

//-- Catch all system errors --//
app.use(function (err, req, res, next) {
  console.log(err.message);
  res.status(500).send('Something broke on the server side');
});


//-- Listening on PORT --/
app.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
});