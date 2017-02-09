"use strict";
var S = require('sequelize');

module.exports = function (sequelize, DataTypes) {
    var DeploymentEvent = sequelize.define('DeploymentEvent', {
        //Fields in the model
        message: { type: S.TEXT, allowNull: true }
    },
        {
            classMethods: {
                associate: function (models) {
                    DeploymentEvent.belongsTo(models.Deployment);
                }
            },
            //Options for the model
            underscored: true,
            timestamps: true,
            createdAt: 'created_on',
            updatedAt: false,
            deletedAt: 'deleted_on',
            paranoid: true //Add deleted timestamp flag instead of actual deletion});
        });

    return DeploymentEvent;
};

