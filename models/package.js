"use strict";
var S = require('sequelize');
var Workflow = require('./workflow');

module.exports = function (sequelize, DataTypes) {

    var packageModel = sequelize.define("package", {
        name: { type: S.STRING, allowNull: false, unique: true },
        description: { type: S.TEXT, allowNull: true },
        status: { type: S.TEXT, allowNull: false },
        ticketRef: { type: S.TEXT, allowNull: false },
        createdBy: { type: S.TEXT, allowNull: false },
        modifiedBy: { type: S.TEXT, allowNull: true }
    }, {
            classMethods: {
                associate: function (models) {
                    packageModel.belongsTo(models.workflow);
                    packageModel.hasMany(models.packageDbObject, { as: 'dbObjects' });
                }
            },
            underscored: true,
            timestamps: true,
            createdAt: 'created_on',
            updatedAt: 'modified_on',
            deletedAt: 'deleted_on',
            paranoid: true //Add deleted timestamp flag instead of actual deletion
        });

        packageModel.generateRoutes = true;

    return packageModel;

};