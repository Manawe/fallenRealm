// var express = require('express');
// var router = express.Router();
//
// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express', test: 'This is a test variable ' });
// });
//
// module.exports = router;

var express = require('express');
var router = express.Router();
var path = require("path");

/* GET home page. */
router.get('/', function(req, res, next) {
  //console.log(_release);
  res.render('index', { title: 'Express', test: 'This is a test variable '});
});

module.exports = router;
