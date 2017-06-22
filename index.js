// System variables
var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var parser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});
var path = require('path');
var port = process.env.PORT || 80;
// Router variables
var New = require('./routes/new');
var search = require('./routes/search');

// App
app.use(express.static(path.join(__dirname, 'public')));
app.use('/new', urlencodedParser, New);
app.use('/', urlencodedParser, search);
app.listen(port, function () {
    console.log('App listening on port ' + port);
});
