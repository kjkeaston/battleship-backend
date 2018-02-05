let db = require('./models');


let seedGames = [
{
  p1_positions: [],
  p2_positions: [],
  p1_guesses: [],
  p2_guesses: [],
  game_finished: false
}
]

db.Game.remove({}, function(err, games){
  // code in here runs after all games are removed
  db.Game.create(seedGames, function(err, games){
    // code in here runs after all games are created
    if (err) { return console.log('ERROR', err); }
    console.log("All games:", games);
    console.log("created", games.length, "games");
    process.exit();
  });
});
