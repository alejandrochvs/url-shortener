var express = require('express');
var app = express();
var router = express.Router();
var mongoose = require('mongoose');
var mongoURL = process.env.MONGODB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://localhost/url_shortener';
var urls = require('./user_model.js');
router.use('/:id', function (req, res) {
    var toFind = req.params.id;
    if (!isNaN(toFind)) {
        mongoose.Promise = global.Promise;
        mongoose.connect(mongoURL);
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function () {
            urls.findOne({
                short_url_id: toFind
            }, function (err, docs) {
                if (err) {
                    res.send(err)
                    db.close();
                    return;
                }
                if (docs != null) {
                    res.redirect(docs.original_url);
                } else {
                    res.send('Not found.');
                }
                db.close();
            });
        });
    } else {
        res.send('It has to be a number.');
    }
});

module.exports = router;
