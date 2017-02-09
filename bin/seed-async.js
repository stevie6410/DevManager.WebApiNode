var waterfall = require('promise-waterfall');

module.exports = function (models) {

    var ids = {};

    var wf1 = function () {
        return models.Workflow.create({
            name: "Default SAO Reports Workflow"
        });
    };

    var wf2 = function (res) {
        ids.wf1 = res.id;
        return models.Workflow.create({
            name: "BEdrock Reports Workflow"
        });
    };

    var env1 = function (res) {
        ids.wf2 = res.id;
        return models.DeployEnvironment.create({
            name: "Testing",
            category: "TEST"
        });
    };

    var env2 = function (res) {
        ids.env1 = res.id;
        return models.DeployEnvironment.create({
            name: "Production",
            category: "PROD"
        });
    };

    var db1 = function (res) {
        ids.env2 = res.id;
        return models.Database.create({
            name: "ReportData - Test",
            databaseName: "ReportData",
            serverName: "DC0348",
            useWindowsAuth: true
        });
    };

    var db2 = function (res) {
        ids.db1 = res.id;
        return models.Database.create({
            name: "ReportData - Prod",
            databaseName: "ReportData",
            serverName: "DCWSAORD001P",
            useWindowsAuth: true
        });
    };

    var rs1 = function (res) {
        ids.db2 = res.id;
        return models.ReportServer.create({
            name: "SAO Report Server - Test",
            reportServerAddress: 'http://DC0348:81/ReportServer/',
            reportManagerAddress: 'http://DC0348:81/Reports/'
        });
    };

    var rs2 = function (res) {
        ids.rs1 = res.id;
        return models.ReportServer.create({
            name: "SAO Report Server - Production",
            reportServerAddress: 'http://DCWSAORD001P/ReportServer/',
            reportManagerAddress: 'http://DCWSAORD001P/Reports/'
        });
    };

    var pkg1 = function (res) {
        ids.rs2 = res.id;
        return models.Package.create({
            name: "Package 1",
            description: "Seed Package 1",
            status: "Pending",
            ticketRef: "SAORPT-101",
            createdBy: "Steve Kent",
            modifiedBy: "Steve Kent",
            workflow_id: ids.wf1
        });
    };

    var pkg2 = function (res) {
        ids.pkg1 = res.id;
        return models.Package.create({
            name: "Package 2",
            description: "Seed Package 2",
            status: "Pending",
            ticketRef: "SAORPT-102",
            createdBy: "Steve Kent",
            modifiedBy: "Steve Kent",
            workflow_id: ids.wf1
        });
    };

    var wfs1 = function (res) {
        ids.pkg2 = res.id;
        return models.WorkflowStage.create({
            name: "SAO Report - Testing",
            sequence: 1,
            workflow_id: ids.wf1,
            database_id: ids.db1,
            report_server_id: ids.rs1,
            deploy_environment_id: ids.env1
        });
    }

    var wfs2 = function (res) {
        ids.wfs1 = res.id;
        return models.WorkflowStage.create({
            name: "SAO Report - Production",
            sequence: 1,
            workflow_id: ids.wf1,
            database_id: ids.db2,
            report_server_id: ids.rs2,
            deploy_environment_id: ids.env2
        });
    }

    var dep1 = function (res) {
        ids.wfs2 = res.id;
        return models.Deployment.create({
            status: "Pending",
            createdBy: "Steve Kent",
            deployedBy: "Steve Kent",
            deployedOn: new Date(),
            deploy_environment_id: ids.env1,
            package_id: ids.pkg1
        });
    }

    var depEv1 = function(res){
        ids.dep1 = res.id;
        return models.DeploymentEvent.create({
            message: "Deployment Created",
            deployment_id: ids.dep1
        });
    }

    var exec = [
        wf1,
        wf2,
        env1,
        env2,
        db1,
        db2,
        rs1,
        rs2,
        pkg1,
        pkg2,
        wfs1,
        wfs2,
        dep1,
        depEv1
    ];

    models.Workflow.findAll().then(data => {
        if (data.length == 0) {
            console.log("Seeding Started");
            waterfall(exec)
                .then(() => {
                    console.log("Seeding Complete");
                    // console.log(ids);
                })
                .catch((err) => {
                    console.log("Seeding Failed", err);
                });
        } else {
            console.log('Seeding not required');
        }
    });
}
