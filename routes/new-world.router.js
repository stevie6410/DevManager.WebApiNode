var express = require('express');
var router = express.Router();
var models = require('../models');
var model = models.database;
var NewWorldController = require('../controllers/new-world.controller');

var ctrl = new NewWorldController(model);

router.get('/', function (req, res) {

    var databases;

    ctrl.getAll().then(data => {
        console.log(data);
        databases = data;
        res.send(data);
    });

    res.send(ctrl.getAll());

    // console.log('Model', models.database);

    // models.database.findAll().then(data => {
    //     res.send(models.database);
    // });

});

module.exports = router;