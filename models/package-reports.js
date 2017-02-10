"use strict";

var S = require('sequelize');

module.exports = function (sequelize, DataTypes) {

    var packageReport = sequelize.define("packageReport", {
        name: { type: S.STRING, allowNull: false },
        description: { type: S.STRING, allowNull: true },
        reportId: { type: S.STRING, allowNull: false },
        path: { type: S.STRING, allowNull: false },
        type: { type: S.INTEGER, allowNull: false }
    }, {
            classMethods: {
                belongsToModels: [
                    'package'
                ]
            },
            underscored: true,
            timestamps: true,
            createdAt: 'created_on',
            updatedAt: 'modified_on',
            deletedAt: 'deleted_on',
            paranoid: true //Add deleted timestamp flag instead of actual deletion
        });

    packageReport.generateRoutes = true;

    return packageReport;

} 
