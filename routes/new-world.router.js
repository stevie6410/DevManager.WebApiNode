var express = require('express');
var router = express.Router();

var NewWorldController = require('../controllers/new-world.controller');
var ctrl = new NewWorldController();


router.get('/', function (req, res) {
    ctrl.getAll()
        .then(data => {
            res.status(200);
            res.send(data);
        })
        .catch(err => {

        });
});

module.exports = router;