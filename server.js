require('dotenv').config();

let express = require('express');
// db = require('./models'),
let app = express();
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
var models = require('./models');
var Game = models.Game;

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
//   next();
// });
app.post('/api/games', function create(req, res) {
  Game.create(req.body, function(err, game) {
    console.log(req.body);
    if (err) res.send(err);
    else res.json(game);
  });
});

let port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log(`Listening on port ${ port }`);
  console.log('Listening to Battleship-Backend');
});
