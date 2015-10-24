var express = require('express');
var router = express.Router();
var path = require("path");
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('game', {
    //title: 'Game Page Title',
    //test: 'Something Cool!',
  });
});
module.exports = router;
