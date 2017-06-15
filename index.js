var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var router = express.Router();
var path = require('path');
var mongodb = require('mongodb');
var mongoose = require('mongoose');
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});
var New = require('./routes/new');
var search = require('./routes/search');
var port = process.env.PORT || 80;
//var Schema = mongoose.Schema();
//mongoose.connect('mongodb://localhost/url_shortener');
//var dataSchemaJSON = {
//    original_url: String
//    , short_url: String
//}
//var dataSchema = new Schema(dataSchemaJSON);
//var urlObj = mongoose.model("URLS", dataSchema);
//var urlTest = new urlObj({
//    original_url: 'test'
//    , short_url: '123'
//});
//urlTest.save(function(err,res){
//    console.log("Recibimos tus datos.");
//});
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'jade');
app.use('/new', urlencodedParser, New);
app.use('/', urlencodedParser, search);
app.use('/',function(req,res){
    res.render('index');
})
app.listen(port, function () {
    console.log('App listening on port 3000!');
});