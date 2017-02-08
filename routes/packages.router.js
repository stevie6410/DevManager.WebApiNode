var models = require('../models');
var express = require('express');
var router = express.Router();

//GET: All Packages
router.get('/', function (req, res) {
    models.Package.findAll().then(packages => {
        res.send(packages);
    });
});

//GET: Individual Package
router.get('/:package_id', function (req, res) {
    models.Package.findById(req.params.package_id).then(package => {
        res.send(package);
    });
});

//POST: Add New Package
router.post('/', function (req, res) {
    res.type('application/json');
    models.Package.create(req.body)
        .then((package) => {
            res.send(package);
        })
        .catch((err) => {
            console.log("Error", err);
            res.status(400);
            res.send(err);
        });
});

//PUT: Update Package
router.put('/:package_id', function (req, res) {
    res.type('application/json');
    models.Package
        .findById(req.params.package_id) //First get the DB version of the record
        .then((package) => {
            if (package) {
                package
                    .update(req.body)   //Now update that version with the req.body
                    .then((newPackage) => {
                        res.send(newPackage);
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

router.delete('/:package_id', function (req, res) {
    models.Package.findById(req.params.package_id)
        .then((package) => {
            return package.destroy()
        }).then(() => {
            console.log("Deleted package: ", req.params.package_id);
            res.status(200);
            res.send();
        })
        .catch((err) => {
            res.status(400);
            res.send(err);
        })
});


module.exports = router;
