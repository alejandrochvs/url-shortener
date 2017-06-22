var express = require('express');
var app = express();
var router = express.Router();
var mongoURL = process.env.MONGODB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://localhost/url_shortener';
var mongoose = require('mongoose');
var urls = require('./user_model.js');

router.use('/*', function (req, res) {
    var url = req.params[0];
    if (url != "") {
        var expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;
        var regex = new RegExp(expression);
        if (url.match(regex)) {
            var random = Math.floor(Math.random() * 10000);
            var host = req.protocol + '://' + req.headers.host;
            var json = {
                original_url: url,
                short_url: host + '/' + random,
                short_url_id : random
            }
            mongoose.Promise = global.Promise;
            mongoose.connect(mongoURL);
            var db = mongoose.connection;
            db.on('error', console.error.bind(console, 'connection error:'));
            db.once('open', function () {
                var testUrl = new urls(json);
                testUrl.save(function (err, urlSaved) {
                    if (err && err.code !== 11000) {
                        mongoose.connection.close();
                        return res.send(err);
                    }
                    if (err && err.code === 11000) {
                        mongoose.connection.close();
                        return res.send('Url already exists.');
                    }
                    res.json(json);
                    mongoose.connection.close();
                });
            });
        } else {
            res.send('Bad url.');
        }
    } else {
        res.send('Bad url.');
    }
});
module.exports = router;
