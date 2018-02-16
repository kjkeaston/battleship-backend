var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var GameSchema = new Schema({
	playerShipLocations: {
    type: [[Number, Number]],
    default: []
  },
  computerShipLocations: {
    type: [[Number, Number]],
    default: []
  },
	playerGuesses: [[Number, Number]],
  availableGuessesComputer: [[Number, Number]],
  playerHits: {
    type: Number,
    default: 0
  },
  computerHits: {
    type: Number,
    default: 0
  },
  computerTurn: {
    type: Boolean,
    default: false
  },
  gameFinished: {
    type: Boolean,
    default: false
  }
});

var Game = mongoose.model('Game', GameSchema);

module.exports = Game;
