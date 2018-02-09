var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var GameSchema = new Schema({
	p1_positions: {
    type: [[Number, Number]],
    default: []
  },
  p2_positions: {
    type: [[Number, Number]],
    default: []
  },
  p2_guesses: [[Number, Number]],
  p1_hits: {
    type: Number,
    default: 0
  },
  p2_hits: {
    type: Number,
    default: 0
  },
  game_finished: {
    type: Boolean,
    default: false
  }
});

var Game = mongoose.model('Game', GameSchema);

module.exports = Game;
