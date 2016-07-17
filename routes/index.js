var express = require('express');
var router = express.Router();
var dbcalls = require('../calls/dbcalls.js');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'APT 310', message: "" });
});

router.post('/', function(req, res, next) {
  dbcalls.usersdb().then(function(results){
    var myusers = dbcalls.users(results.rows);
    var input = dbcalls.capFirst(req.body.name);
    if (myusers.indexOf(input) < 0){
      var nope = input + " doesn't live here."
      res.render('index', { title: 'APT 310', message: nope});
    }
    else{ res.render('dashboard', { title: 'APT 310', name: input }) }
  });
});

module.exports = router;
