var express = require('express');
var app = express();
var router = express.Router();

router.use('/:id',function(req,res){
    res.json(req.params.id);
});

module.exports = router;
