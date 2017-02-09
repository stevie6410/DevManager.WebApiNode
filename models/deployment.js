"use strict";
var S = require('sequelize');

module.exports = function (sequelize, DataTypes) {
    var Deployment = sequelize.define('Deployment', {
        //Fields in the model
        status: { type: S.STRING, allowNull: false },
        createdBy: { type: S.STRING, allowNull: false },
        deployedBy: { type: S.STRING, allowNull: true },
        deployedOn: { type: S.DATE, allowNull: true }
    },
        {
            classMethods: {
                associate: function (models) {
                    Deployment.belongsTo(models.DeployEnvironment);
                    Deployment.belongsTo(models.Package);
                    Deployment.hasMany(models.DeploymentEvent);
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

    return Deployment;
};

