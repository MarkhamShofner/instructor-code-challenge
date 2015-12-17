var express = require('express');
// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/movies'); //potentially change on deployment
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false // TODO <----potentially true?
}));

app.get('/', express.static(path.join(__dirname, 'public')));
// TODO potentially remove / adjust this call for some sort of index show

app.get('/favorites', function(req, res) {
  console.log("***get favorites***");
  var data = fs.readFileSync('./data.json');
  res.setHeader('Content-Type', 'application/json');
  console.log(data);
  res.send(data);
});

// post route for favorites
app.post('favorites', function(req, res) {
  if (!req.body.name || !req.body.oid) {
    res.send("Error");
    // return;
    // ^return what?
  } else {}
  //figure out purpose for this chunk of code
  // var data = JSON.parse(fs.readFileSync('./data.json'));
  // data.push(req.body);
  // fs.writeFile('./data.json', JSON.stringify(data));
  // res.setHeader('Content-Type', 'application/json');
  // res.send(data);
});

// set up routes

app.listen(process.env.PORT || 3000, function() {
  console.log("Listening on port 3000");
});
