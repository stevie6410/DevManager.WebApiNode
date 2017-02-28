"use strict";

var S = require('sequelize');

module.exports = function (sequelize, DataTypes) {

    var department = sequelize.define("department", {
        name: { type: S.STRING, allowNull: false },
        owner: { type: S.STRING, allowNull: false },
        createdBy: { type: S.STRING, allowNull: false },
        updatedBy: { type: S.STRING, allowNull: true }
    }, {
            classMethods: {
                belongsToModels: [
                    // 'package'
                ]
            },
            underscored: true,
            timestamps: true,
            createdAt: 'created_on',
            updatedAt: 'modified_on',
            deletedAt: 'deleted_on',
            paranoid: true //Add deleted timestamp flag instead of actual deletion
        });

    department.generateRoutes = true;

    return department;

} 
