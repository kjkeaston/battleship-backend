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

function pickRandomElement(possibilitiesArray) {
  let randomIdx = Math.floor(Math.random() * possibilitiesArray.length);
  let element = possibilitiesArray[randomIdx];
  return element;
}

function removeFromP2Guesses(positions, guess) {
  positions.map((pos, idx) => {
    if (isEqual(pos, guess)) {
      positions.splice(idx, 1);
    }
  })
  return positions
}

// Add new Game to DB on 'Enter' click
function create(req, res) {
  let p2ShipLocations = chooseUniqueShips(10, 6); //the gridSize and shipCount needs to be passed in as variables, currently hardcoded
  let game = new Game ({
    p2_positions: p2ShipLocations,
    p2_guesses: allRowColumnPossibilities(10),
    computerPlay: false,
    p1_hits: 0,
    p2_hits: 0,
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
  let guess = req.body.p1_guesses;
  let p2Play = req.body.computerPlay;
  Game.findOne({_id: req.params.game_id}, function(err, foundGame){
    let foundGameP2Pos = foundGame.p2_positions;
    let foundGameP1Pos = foundGame.p1_positions;
    if (err) res.send(err);
    if (guess) {
      if (isHit(foundGameP2Pos, guess)) {
        foundGame.p1_guesses = guess
        foundGame.p1_hits = (foundGame.p1_hits + 1)
        foundGame.save(function(err, saved){
        res.send(true)
        });
      } else {
        res.send(false)
      }
    } else if (p2Play) {
      let p2RandomGuess = pickRandomElement(foundGame.p2_guesses);
      let doesHitmatch = isHit(foundGame.p1_positions, p2RandomGuess);
      if (doesHitmatch) {
        foundGame.p2_hits = (foundGame.p2_hits + 1);
        foundGame.p2_guesses = removeFromP2Guesses(foundGame.p2_guesses, p2RandomGuess)
        foundGame.save(function(err, saved){
          console.log(saved.p2_guesses)
          res.json(p2RandomGuess)
        });
      } else {
        res.status(200).send(false)
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
