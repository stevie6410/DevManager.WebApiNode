"use strict"

var express = require('express');
var router = express.Router();
var SqlSync = require('../sqlsync/sqlsync');
var Connection = require('tedious').Connection;
var ConnectionPool = require('tedious-connection-pool');
var db = require('../models');

var poolConfig = {
    min: 1,
    max: 2,
    log: true
};

router.get('/:id/deploy', function (req, res) {
    //Deploy the objects
    //Get the deployment objects

    db.deployment.findById(req.params.id, {
        include: [
            {
                model: db.package, include: [
                    { model: db.packageDbObject }
                ]
            },
            { model: db.deployEnvironment },
            {
                model: db.workflowStage, include: [
                    { model: db.deployEnvironment },
                    { model: db.database },
                    { model: db.reportServer }
                ]
            }
        ]
    }).then(data => {
        //Create a connection based on the workflow stage environment
        if (data.workflowStage == null) {
            res.status(400);
            res.send(JSON.stringify({ 'Message': 'Deployment --> WorkflowStage is missing' }));

        }
        console.log("We do have a workflowStage");
        //res.send(data);
        var connectionConfig = {
            server: data.workflowStage.database.serverName,
            userName: data.workflowStage.database.username,
            password: data.workflowStage.database.password,
            options: {
                database: data.workflowStage.database.databaseName
            }
        };

        var pool = new ConnectionPool(poolConfig, connectionConfig);

        pool.on('error', function (err) {
            console.error(err);
        });

        pool.acquire(function (err, connection) {
            if (err) {
                console.error(err);
                reuturn;
            }

            console.log('Connected to ' + connectionConfig.options.database);

            var sqlSync = new SqlSync(connection, data.package.packageDbObjects);

            sqlSync.printPackageObjectNames();
            sqlSync.deploy();
            res.send(sqlSync.dbObjects);

        });
    });
});

module.exports = router;