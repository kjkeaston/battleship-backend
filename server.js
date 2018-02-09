require('dotenv').config();

const express = require('express');
// don't leave commented out code
const app = express();
const bodyParser = require('body-parser');
// only need to use bodyParser once
app.use(bodyParser.urlencoded({
  extended: true
}));
const models = require('./models');

const GamesRouter = require('./config/routes.js');

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE');
  if ('OPTIONS' === req.method) {
    res.send(200);
  } else {
    next();
  }
});

app.options('/*', function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.send(200);
});

app.use(GamesRouter);


const port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log(`Listening on port ${ port } - Listening to Battleship-Backend`);
});
