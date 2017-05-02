const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const shortUrl = require('./models/shortUrl');

app.use(bodyParser.json());
app.use(cors());
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:shortUrl")
app.use(express.static(__dirname + "/public"))
var port = process.env.PORT || 8080;

app.listen(port, ()=> {
    console.log('App listening on port ' + port);
});

app.get('/new/:urlToShorten*',(req,res,next)=>{
  var urlToShorten = req.params.urlToShorten;
  var expression =/[-a-zA-Z0-9@:%._\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = expression;
  if (regex.test(urlToShorten) === true){
    var short = Math.floor(Math.random()*100000).toString();
    var data = new shortUrl({
      originalUrl : urlToShorten,
      shortenUrl : short
    });
    data.save(err=>{
      if (err){
        res.send('Error saving to database.');
      }
    });
    return res.json(data);
  }else{
    var data = new shortUrl({
    originalUrl : "Url does not match standard format",
    shortenUrl : "InvalidUrl"
  });
  return res.json(data);
  }
});
app.get('/:urlToForward',(req,res,next)=>{
  var shorterUrl = req.params.urlToForward;
  if (shorterUrl != (null || "favicon.ico")){
    shortUrl.findOne({'shortenUrl' : shorterUrl},(err,data)=>{
    if (err) return res.send('Error reading database');
    var re = RegExp("^(http|https)://","i");
    var strToCheck = data.originalUrl;
    if(re.test(strToCheck)){
      res.redirect(301,data.originalUrl);
    }else{
      res.redirect(301,"http://" + data.originalUrl);
    }
  });
  }
});