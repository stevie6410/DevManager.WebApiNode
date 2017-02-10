"use strict";
var S = require('sequelize');

module.exports = function (sequelize, DataTypes) {
    var deployment = sequelize.define('deployment', {
        //Fields in the model
        status: { type: S.STRING, allowNull: false },
        createdBy: { type: S.STRING, allowNull: false },
        deployedBy: { type: S.STRING, allowNull: true },
        deployedOn: { type: S.DATE, allowNull: true }
    },
        {
            classMethods: {
                belongsToModels: [
                    'deployEnvironment',
                    'package'
                ],
                hasManyModels: [
                    'deploymentEvent'
                ]
            },
            //Options for the model
            underscored: true,
            timestamps: true,
            createdAt: 'created_on',
            updatedAt: false,
            deletedAt: 'deleted_on',
            paranoid: true //Add deleted timestamp flag instead of actual deletion});
        });

    deployment.generateRoutes = true;

    return deployment;
};

