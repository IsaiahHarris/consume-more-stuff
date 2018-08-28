const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./routes');

const PORT = process.env.PORT || 8080;
app.use(bodyParser.json());

//-- send you to all the api routes --//
app.use('/api', routes);

//-- 404 --//
app.get('*', (req, res) => {
  res.status(404).send({'message': 'Page not found!'});
})

//-- Catch all system errors --//
app.use(function(err, req, res, next) {
  console.log(err.stack);
  res.status(500).send('Something broke on the server side');
});


//-- Listening on PORT --/
app.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
});