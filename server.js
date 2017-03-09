var express = require('express');
var path = require('path');
var mongo = require('mongodb');
var routes = require('./public/routes/index.js');
var api = require('./public/api/url-shortener.js');
var app = express();
require('dotenv').config({
  silent: true
});
var port = process.env.PORT || 8080;
app.listen(port, function() {
    console.log('App listening on port ' + port);
});

mongo.MongoClient.connect(process.env.MONGOLAB_URI || 'mongodb://localhost:27017/url-shortener', function(err, db) {
  if (err) {
    throw new Error('Database failed to connect!');
  } else {
    console.log('Successfully connected to MongoDB on port 27017.');
  }
  db.createCollection("sites", {
    capped: true,
    size: 5242880,
    max: 5000
  });
  //routes(app, db);
  //api(app, db);
});

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'pug');;