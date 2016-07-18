var express = require('express');
var router = express.Router();
var dbcalls = require('../calls/dbcalls.js');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'APT 310', message: "" });
});

router.get('/:name/dashboard', function(req, res, next) {
  dbcalls.months().then(function(result){
    dbcalls.usermonthpayments(req.params.name).then(function(dataresult){
      res.render('dashboard', { title: 'APT 310', name: req.params.name, months: result.rows, data: dataresult.rows});
    });
  });
});

router.get('/data/:name', function(req, res, next) {
  dbcalls.usermonthpayments(req.params.name).then(function(dataresult){
    res.json(dataresult.rows);
  });
});

router.post('/', function(req, res, next) {
  dbcalls.usersdb().then(function(results){
    var myusers = dbcalls.users(results.rows);
    var input = dbcalls.capFirst(req.body.name);
    if (myusers.indexOf(input) < 0){
      var nope = input + " doesn't live here.";
      res.render('index', { title: 'APT 310', message: nope});
    }
    else{ res.redirect('/'+input+'/dashboard')}
  });
});

router.post('/update/:id/:status', function(req, res, next) {
  dbcalls.updatestatus(req.params.id, req.params.status).then(function(){
    console.log("updated " + req.params.id);
  });
});

module.exports = router;
