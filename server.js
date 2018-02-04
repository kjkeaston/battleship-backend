require('dotenv').config();

let express = require('express');
// db = require('./models'),
let app = express();
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
let models = require('./models');
let Game = models.Game;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
  next();
});

function allRowColumnPossibilities(gridSize) { //if 5x5, gridSize = 5
  let numberPossibilitiesArray = Array.from(Array(gridSize).keys());
  let allPossibilities = [];
  numberPossibilitiesArray.map(oneRow => {
    numberPossibilitiesArray.map(oneColumn => {
      allPossibilities.push([oneRow, oneColumn]);
    });
  });
  return allPossibilities;
};

function chooseUniqueShips(gridSize, shipCount) {
  let allPossibilities = allRowColumnPossibilities(gridSize);
  let ships = [];
  for (let i = 0; i < shipCount; i++) {
    let randomIdx = Math.floor(Math.random() * allPossibilities.length); //gets a random index
    element = allPossibilities[randomIdx] //selects element at that randomIdx
    ships.push(element) //pushes element into ships array
    allPossibilities.splice(randomIdx, 1) //cuts element from allPossibilities array
  }
  return ships
}

app.post('/api/games', function create(req, res) {
  let p2ShipLocations = chooseUniqueShips(5, 3); //the gridSize and shipCount needs to be passed in as variables, currently hardcoded
  let game = new Game ({
    p1_positions: req.body.p1_positions,
    p2_positions: [p2ShipLocations],
    game_finished: false
  })
  game.save( function(err, game) {
    if (err) res.send(err);
    else res.json(game);
    console.log("Created new game")
  });
});

app.get('/api/games/:game_id', function show(req, res) {
  Game.findById(req.params.game_id, function(err, game){
    if (err) res.send(err);
    else res.json(game);
  });
});

let port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log(`Listening on port ${ port }`);
  console.log('Listening to Battleship-Backend');
});
