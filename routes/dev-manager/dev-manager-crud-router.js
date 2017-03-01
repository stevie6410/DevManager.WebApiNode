var express = require('express');
var router = express.Router();
var db = require('../../models/dev-manager');
var pluralize = require('pluralize');

db.models.forEach(function (model) {
    if (db[model].generateRoutes) {
        var routeEntityName = pluralize.plural(model);
        var includeModels = [];
        console.log(`       /api/${routeEntityName}`);

        //console.log(`Adding CRUD routes for ${routeEntityName}`);
        //console.log('===========================================================');
        //Build a list of relations to include
        if ("hasManyModels" in db[model]) {
            db[model].hasManyModels.forEach(function (to) {
                // console.log(`Adding many relationship for ${model} into ${to}`)          
                includeModels.push(db[to]);
            });
        }
        if ("belongsToModels" in db[model]) {
            db[model].belongsToModels.forEach(function (to) {
                // console.log(`Adding single relationship for ${model} into ${to}`)
                includeModels.push(db[to]);
            });
        }
        if("belongsToManyModels" in db[model]){
            db[model].belongsToManyModels.forEach(function (to) {
                // console.log(`Adding single relationship for ${model} into ${to}`)
                includeModels.push(db[to.model]);
            });
        }

        //console.log(`       GET:    /api/${routeEntityName}`);
        //GET: All
        router.get(`/${routeEntityName}`, function (req, res) {
            db[model].findAll().then(data => {
                res.send(data);
            });
        });

        //console.log(`       GET:    /api/${routeEntityName}/:id`);
        //GET: Individual
        router.get(`/${routeEntityName}/:id`, function (req, res) {
            // console.log('including: ', includeModels);
            db[model].findById(req.params.id, {
                include: includeModels
            }).then(data => {
                res.send(data);
            });
        });

        //console.log(`       POST:   /api/${routeEntityName}`);
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

        //console.log(`       PUT:    /api/${routeEntityName}/:id`);
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

        //console.log(`       DELTE:  /api/${routeEntityName}/:id`);
        router.delete(`/${routeEntityName}/:id`, function (req, res) {
            db[model].findById(req.params.id)
                .then((data) => {
                    return data.destroy()
                }).then(() => {
                    res.type("application/json");
                    res.status(200);
                    res.send(JSON.stringify({ 'status': 'ok' }));
                })
                .catch((err) => {
                    res.status(400);
                    res.send(err);
                })
        });
    }
}, this);

module.exports = router;
