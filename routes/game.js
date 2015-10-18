var express = require('express');
var router = express.Router();
//var GroundObjects = require('D:/fallenRealm/TileObjects/generateGround.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('game', {
       title: 'Game Page Title',
       test: 'Something Cool!'
    });
    //res.sendFile(__dirname + '/TileObjects/Spritesheet/landscapeTiles_sheet');
});


module.exports = router;
