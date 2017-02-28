"use strict";
var S = require('sequelize');

module.exports = function (sequelize, DataTypes) {
    var deploymentEvent = sequelize.define('deploymentEvent', {
        //Fields in the model
        message: { type: S.TEXT, allowNull: true }
    },
        {
            classMethods: {
                belongsToModels: [
                    'deployment'
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

    deploymentEvent.generateRoutes = true;

    return deploymentEvent;
};

