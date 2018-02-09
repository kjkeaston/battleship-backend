var express = require('express');
var router = express.Router();
var GamePageController = require('../controllers/GamePageBackend.js');

//Game Routes
router.get('/api/games', GamePageController.index);
router.post('/api/games', GamePageController.create);
router.get('/api/games/:game_id', GamePageController.show);
router.put('/api/games/:game_id', GamePageController.update);
router.delete('/api/games/:game_id', GamePageController.destroy);
router.put('/api/games/:game_id/computer_guess', GamePageController.computerGuess);

module.exports = router;
