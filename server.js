// set requirements
var express = require('express');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// get main route
app.get('/', express.static(path.join(__dirname, 'public')));

// get route for favorites data
app.get('/favorites', function(req, res) {
  console.log("***get favorites***");
  var data = fs.readFileSync('./data.json');
  res.setHeader('Content-Type', 'application/json');
  console.log(data);
  res.send(data);
});

// post route for favorites data
app.post('/favorites', function(req, res) {
  if (!req.body.name || !req.body.oid) {
    var data = JSON.parse(fs.readFileSync('./data.json'));
    data.push(req.body);
    fs.writeFile('./data.json', JSON.stringify(data));
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  } else {
    console.log("error");
    res.send("Error");
  }
});

// set app to listen on port 3000, or (if deployed) at the env.PORT on heroku
app.listen(process.env.PORT || 3000, function() {
  console.log("Listening on port 3000");
});
