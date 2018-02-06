var models = require('../models');
var Game = models.Game;

// Get JSON view of all the games currently in DB
function index(req, res) {
  Game.find({}, function(err, game){
    if (err) {
      res.send(err);
    } else {
      res.json(game);
    }
  });
};

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

function isEqual(positions, guess) { // checks the equality of an array with 2 elements [1,2] and [1,2]
  return positions[0] === guess[0] && positions[1] === guess[1]
}

function isHit(positionsArray, guess) { // checks if guess is in positions array
  for(let i = 0; i < positionsArray.length; i++) {
    let oneItem = positionsArray[i];
      if (isEqual(oneItem, guess)) {
        return true
      }
  }
  return false
}


// Add new Game to DB on 'Enter' click
function create(req, res) {
  let p2ShipLocations = chooseUniqueShips(5, 3); //the gridSize and shipCount needs to be passed in as variables, currently hardcoded
  let game = new Game ({
    p1_positions: req.body.p1_positions,
    p2_positions: p2ShipLocations,
    game_finished: false
  })
  game.save(function (err, game) {
    if (err) {
      res.send(err);
    } else {
      res.json(game);
      console.log("Created new game");
    }
  });
};

// Get one game by game_id
function show(req, res) {
  Game.findOne({_id: req.params.game_id}, function(err, foundGame){
    if (err) res.send(err);
    else res.json(foundGame);
  });
};

function update(req, res) {
  let guess = req.body.p1_guesses
  Game.findOne({_id: req.params.game_id}, function(err, foundGame){
    let p2Pos = foundGame.p2_positions
    if (err) res.send(err);
    if (guess) {
      let oneGuess = JSON.parse(guess);
      if (isHit(p2Pos, oneGuess)) {
        res.send(true)
      } else {
        res.send(false)
      }
    } else {
      foundGame.p1_positions = req.body.p1_positions,
      foundGame.save(function(err, saved) {
        if(err) { console.log('error', err); }
        res.json(saved);
      })
    }
  });
}

function destroy(req, res) {
  Game.findByIdAndRemove(req.params.game_id, function(err, deletedGame) {
    if(err) {
      res.send(err);
      console.log("Delete error occurred", err);
    } else {
      res.send(200, `game with ID: ${req.params.game_id} was deleted!`);
    }
  });
}

module.exports.index = index;
module.exports.create = create;
module.exports.show = show;
module.exports.update = update;
module.exports.destroy = destroy;
