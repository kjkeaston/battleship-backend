var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var GameSchema = new Schema({
	p1_positions: [],
  p2_positions: [],
	p1_guesses: [],
  p2_guesses: []
});

var Game = mongoose.model('Game', GameSchema);

module.exports = Game;
