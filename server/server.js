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
const saltedRounds = 12;
const bcrypt = require('bcrypt');
const User = require('./db/models/User');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use(session({
  store: new Redis(),
  secret: 'keyboard cat',
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
      console.log('err.message', err.message);
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
      return done(err);
    });
}));

app.post('/api/login', (req, res, next) => {
  req.body.username = req.body.username
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.json({ message: 'username or password invalid' })
    }
    req.login(user, (err) => {
      if (err) { return next(err); }
      else {
        res.json({ username: user.username })
      }
    });
  })(req, res, next);
});

app.post('/api/register', (req, res) => {
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

app.get('/api/logout', (req, res) => {
  req.logout();
  res.json({ success: true })
});

// const PORT = process.env.PORT || 8080;


//-- send you to all the api routes --//
app.use('/api', routes);



//-- 404 --//
app.get('*', (req, res) => {
  res.status(404).send({ 'message': 'Page not found!' });
})

//-- Catch all system errors --//
app.use(function (err, req, res, next) {
  console.log(err.stack);
  res.status(500).send('Something broke on the server side');
});


//-- Listening on PORT --/
app.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
});