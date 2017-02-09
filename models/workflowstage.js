"use strict";
var S = require('sequelize');

module.exports = function (sequelize, DataTypes) {
    var workflowStage = sequelize.define('workflowStage', {
        name: { type: S.STRING, allowNull: false },
        sequence: { type: S.INTEGER, allowNull: false }
    },
        {
            classMethods: {
                associate: function (models) {
                    workflowStage.belongsTo(models.workflow);
                    workflowStage.belongsTo(models.deployEnvironment);
                    workflowStage.belongsTo(models.database);
                    workflowStage.belongsTo(models.reportServer);
                }
            },
            underscored: true,
            timestamps: true,
            createdAt: 'created_on',
            updatedAt: 'modified_on',
            deletedAt: 'deleted_on',
            paranoid: true
        });

    workflowStage.generateRoutes = true;
    return workflowStage;
}
