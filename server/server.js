require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const busboy = require('connect-busboy');
const busboyBodyParser = require('busboy-body-parser');
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
app.use(busboy());
app.use(busboyBodyParser());

//-- PASSPORT configs start --//
app.use(session({
  store: new Redis(),
  secret: process.env.PASSPORT_SECRET,
  resave: false,
  saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  console.log('serialized user ', user);
  console.log('serialize done', done);

  return done(null, {
    id: user.id,
    username: user.username
  })
})

passport.deserializeUser((user, done) => {
  console.log('deserializing user: ', user);
  new User({ id: user.id}).fetch()
  .then(user => {
    user = user.toJSON();
    return done(null, { // You can get more stuff from db
      id: user.id,
      username: user.username
    })
  })
  .catch((err) => {
    console.log(err);
    return done(err);
  })
})

passport.use(new LocalStrategy(function(username, password, done) {
  return new User({username: username}).fetch()
  .then( user => {
    console.log(user)
    if (!user) {
      console.log('user null not working?');
      return done({message: 'Wrong Username'});
    }
    else {
      console.log('else not working?');
      user = user.toJSON();
      console.log(password, user.pasword);
      bcrypt.compare(password, user.password)
      .then((samePassword) => {
        if (samePassword) { return done(null, user); }
        else {
          return done({message: 'Wrong Password'});
        }
      })

    }
  })
  .catch( err => {
    console.log('error: ', err);
    return done(err);
  })
}))
//-- PASSPORT configs end --//

// Send you to all the api routes
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