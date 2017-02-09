var express = require('express');
var router = express.Router();
var db = require('../models');
var pluralize = require('pluralize');

db.models.forEach(function (model) {
    if (db[model].generateRoutes) {
        var routeEntityName = pluralize.plural(model);

        console.log(`Adding CRUD routes for ${routeEntityName}`);

        //GET: All
        router.get(`/${routeEntityName}`, function (req, res) {
            db[model].findAll().then(data => {
                res.send(data);
            });
        });

        //GET: Individual
        router.get(`/${routeEntityName}/:id`, function (req, res) {
            db[model].findById(req.params.id).then(data => {
                res.send(data);
            });
        });

        //POST: Add New
        router.post(`/${routeEntityName}`, function (req, res) {
            res.type('application/json');
            db[model].create(req.body)
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
        router.put(`/${routeEntityName}/:id`, function (req, res) {
            res.type('application/json');
            db[model]
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

        router.delete(`/${routeEntityName}/:id`, function (req, res) {
            db[model].findById(req.params.id)
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



    }
}, this);

module.exports = router;
