"use strict";
var S = require('sequelize');

module.exports = function (sequelize, DataTypes) {
    var WorkflowStage = sequelize.define('WorkflowStage', {
        name: { type: S.STRING, allowNull: false },
        sequence: { type: S.INTEGER, allowNull: false }
    },
        {
            classMethods: {
                associate: function (models) {
                    console.log('models', models);
                    WorkflowStage.belongsTo(models.Workflow);
                    WorkflowStage.belongsTo(models.DeployEnvironment);
                    WorkflowStage.belongsTo(models.Database);
                    WorkflowStage.belongsTo(models.ReportServer);
                }
            },
            underscored: true,
            timestamps: true,
            createdAt: 'created_on',
            updatedAt: 'modified_on',
            deletedAt: 'deleted_on',
            paranoid: true
        });

    return WorkflowStage;
}
