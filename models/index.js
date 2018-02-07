var mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/front_end");

module.exports.Game = require("./Game");
