var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var GameSchema = new Schema({
	p1_positions: [],
  p2_positions: [],
	p1_guesses: [],
  p2_guesses: [],
  p1_hits: Number,
  p2_hits: Number,
  computerPlay: Boolean,
  game_finished: Boolean
});

var Game = mongoose.model('Game', GameSchema);

module.exports = Game;
