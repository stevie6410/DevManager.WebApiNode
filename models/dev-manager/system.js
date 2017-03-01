"use strict";

var S = require('sequelize');

module.exports = function (sequelize, DataTypes) {

    var system = sequelize.define("system", {
        name: { type: S.STRING, allowNull: false },
        description: { type: S.STRING, allowNull: true },
        owner: { type: S.STRING, allowNull: false },
        githubRepo: { type: S.STRING, allowNull: true },
        createdBy: { type: S.STRING, allowNull: false },
        updatedBy: { type: S.STRING, allowNull: true }
    }, {
            classMethods: {
                belongsToManyModels: [
                    { model: 'department', through: 'systemDepartments' }
                ]
            },
            underscored: true,
            timestamps: true,
            createdAt: 'created_on',
            updatedAt: 'modified_on',
            deletedAt: 'deleted_on',
            paranoid: true //Add deleted timestamp flag instead of actual deletion
        });

    system.generateRoutes = true;

    return system;

} 
