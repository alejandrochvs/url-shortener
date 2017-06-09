var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var router = express.Router();
var path = require('path');
var mongodb = require('mongodb');
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});
var New = require('./routes/new');
var search   = require('./routes/search');
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'jade');
app.use('/new', urlencodedParser, New);
app.use('/',urlencodedParser,search);
app.listen(3000, function () {
    console.log('App listening on port 3000!');
});
