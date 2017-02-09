var express = require('express');
var router = express.Router();

var env = process.env.NODE_ENV || 'development';
var config = require('../config/config.json')[env];

//GET : Get the DB Connection Details
router.get('/', function (req, res) {
    //remove the password
    var safeConfig = config;
    safeConfig.password = '************';
    res.send(safeConfig);
});

module.exports = router;