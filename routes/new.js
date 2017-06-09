var express = require('express');
var app = express();
var router = express.Router();
router.use('/*', function (req, res) {
    var url = req.params[0];
    if (url != "") {
        var expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;
;
        var regex = new RegExp(expression);
        if (url.match(regex)) {
            var random = Math.floor(Math.random() * 10000);
            var host = req.protocol + '://' + req.headers.host;
            var json = {
                original_url: url
                , short_url: host + '/' + random
            }
            res.json(json);
        }
        else {
            res.send('Bad url.');
        }
    }
    else {
        res.send('Bad url.');
    }
});
module.exports = router;
