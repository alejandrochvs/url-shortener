module.exports = function(app, db) {

  app.route('/:url')
    // Check and retrieve url to redirect if it exist.
    .get(handleGet);

  app.get('/new/:url*', handlePost);

  function handleGet(req, res) {
    var appURL = process.env.APP_URL || req.protocol + '://' + req.get('host').slice(0,-3) + '/';
    var url = appURL + req.params.url;
    if (url != appURL + 'favicon.ico') {
      findURL(url, db, res);
    }
  }

  function handlePost(req, res) {
    // Create short url, store and display the info.
    var url = req.url.slice(5);
    var appURL = process.env.APP_URL || req.protocol + '://' + req.get('host');
    var urlObj = {};
    if (validateURL(url)) {
      urlObj = {
        "original_url": url,
        "short_url": appURL + "/" + linkGen(),
      };
      res.send(urlObj);
      save(urlObj, db);
    } else {
      urlObj = {
        "error": "Wrong url format, make sure you have a valid protocol and real site.",
      };
      res.send(urlObj);
    }
  }

  function linkGen() {
    var num = Math.floor(100000 + Math.random() * 900000);
    return num.toString().substring(0, 4);
  }

  function save(obj, db) {
    // Save object into db.
    var sites = db.collection('sites');
    sites.save(obj, function(err, result) {
      if (err) throw err;
      console.log('Saved new URL.');
    });
  }

  function findURL(link, db, res) {
    // Check to see if the site is already there
    var sites = db.collection('sites');
    // get the url
    sites.findOne({
      "short_url": link
    }, function(err, result) {
      if (err) throw err;
      if (result) {
        console.log('Found url ' + result);
        console.log('Redirecting to: ' + result.original_url);
        res.redirect(result.original_url);
      } else {
        res.send({
        "error": "This url is not on the database."
      });
      }
    });
  }

  function validateURL(url) {
    // Checks to see if it is an actual url
    // Regex from https://gist.github.com/dperini/729294
    var regex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
    return regex.test(url);
  }

};