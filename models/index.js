var mongoose = require('mongoose');
mongoose.connect( process.env.MONGODB_URI || 'mongodb://localhost/front_end');

mongoose.Promise = global.Promise;

module.exports.Game = require('./Game');
