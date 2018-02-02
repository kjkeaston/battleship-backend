require('dotenv').config();

let express = require('express');
// db = require('./models'),
let app = express();
let bodyParser = require('body-parser');
app.use(bodyParser.json());

// let battleshipRouter = require('./config/routes.js');

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
//   next();
// });

// app.use(battleshipRouter);

let port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log(`Listening on port ${ port }`);
  console.log("Listening to Battleship-Backend");
});
