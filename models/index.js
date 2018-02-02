var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/front_end");

module.exports.Game = require("./Game");
