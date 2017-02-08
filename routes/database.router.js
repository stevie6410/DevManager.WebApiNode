var models = require('../models');
var express = require('express');
var router = express.Router();

//GET: All
router.get('/', function (req, res) {
    models.Database.findAll().then(data => {
        res.send(data);
    });
});

//GET: Individual
router.get('/:id', function (req, res) {
    models.Database.findById(req.params.id).then(data => {
        res.send(data);
    });
});

//POST: Add New
router.post('/', function (req, res) {
    res.type('application/json');
    models.Database.create(req.body)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            console.log("Error", err);
            res.status(400);
            res.send(err);
        });
});

//PUT: Update
router.put('/:id', function (req, res) {
    res.type('application/json');
    models.Database
        .findById(req.params.id) //First get the DB version of the record
        .then((data) => {
            if (data) {
                data
                    .update(req.body)   //Now update that version with the req.body
                    .then((newData) => {
                        res.send(newData);
                    })
                    .catch((err) => {
                        res.status(400);
                        res.send(err);
                    });
            }
        })
        .catch((err) => {
            res.status(400);
            res.send(err);
        });
});

router.delete('/:id', function (req, res) {
    models.Database.findById(req.params.id)
        .then((data) => {
            return data.destroy()
        }).then(() => {
            res.status(200);
            res.send();
        })
        .catch((err) => {
            res.status(400);
            res.send(err);
        })
});


module.exports = router;
