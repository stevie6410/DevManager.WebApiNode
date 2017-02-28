var waterfall = require('promise-waterfall');

module.exports = function (models) {

    var ids = {};

    var wf1 = function () {
        return models.workflow.create({
            name: "Default SAO Reports Workflow"
        });
    };

    var wf2 = function (res) {
        ids.wf1 = res.id;
        return models.workflow.create({
            name: "BEdrock Reports Workflow"
        });
    };

    var env1 = function (res) {
        ids.wf2 = res.id;
        return models.deployEnvironment.create({
            name: "Testing",
            category: "TEST"
        });
    };

    var env2 = function (res) {
        ids.env1 = res.id;
        return models.deployEnvironment.create({
            name: "Production",
            category: "PROD"
        });
    };

    var db1 = function (res) {
        ids.env2 = res.id;
        return models.database.create({
            name: "ReportData - Test",
            databaseName: "ReportData",
            serverName: "DC0348",
            useWindowsAuth: false,
            username: 'appUser',
            password: 'Password2'
        });
    };

    var db2 = function (res) {
        ids.db1 = res.id;
        return models.database.create({
            name: "ReportData - Prod",
            databaseName: "ReportData",
            serverName: "DCWSAORD001P",
            useWindowsAuth: false,
            username: 'appUser',
            password: 'Password2'
        });
    };

    var rs1 = function (res) {
        ids.db2 = res.id;
        return models.reportServer.create({
            name: "SAO Report Server - Test",
            reportServerAddress: 'http://DC0348:81/ReportServer/',
            reportManagerAddress: 'http://DC0348:81/Reports/'
        });
    };

    var rs2 = function (res) {
        ids.rs1 = res.id;
        return models.reportServer.create({
            name: "SAO Report Server - Production",
            reportServerAddress: 'http://DCWSAORD001P/ReportServer/',
            reportManagerAddress: 'http://DCWSAORD001P/Reports/'
        });
    };

    var pkg1 = function (res) {
        ids.rs2 = res.id;
        return models.package.create({
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
        return models.package.create({
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
        return models.workflowStage.create({
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
        return models.workflowStage.create({
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
        return models.deployment.create({
            status: "Pending",
            createdBy: "Steve Kent",
            deployedBy: "Steve Kent",
            deployedOn: new Date(),
            deploy_environment_id: ids.env1,
            package_id: ids.pkg1,
            workflow_stage_id: ids.wfs1
        });
    }

    var depEv1 = function (res) {
        ids.dep1 = res.id;
        return models.deploymentEvent.create({
            message: "Deployment Created",
            deployment_id: ids.dep1
        });
    }

    var pkgRpt1 = function (res) {
        ids.depEv1 = res.id;
        return models.packageReport.create({
            name: "Sales Order Shortages",
            description: "Sales Order Report",
            reportId: '9093dnd30dnakklkdi39jd09309nd0n',
            path: "/SAO Shared/Sales Orders/Sales Order Shortages",
            type: "Report",
            package_id: ids.pkg1
        });
    }

    var pkgObj1 = function (res) {
        ids.pkgRpt1 = res.id;
        return models.packageDbObject.create({
            guid: "dandn39dnao9838398298hndnd839n8",
            objectKey: "ReportData.dbo.uspSalesOrderStatus",
            databaseName: "ReportData",
            schemaName: "dbo",
            objectName: "uspSalesOrderStatus",
            objectType: "PROCEDURE",
            lastEventType: "CREATE",
            lastEventDDL: `
                CREATE PROCEDURE dbo.uspSalesOrderStatus
                AS

                SELECT
                    * 
                FROM
                    sys.objects
            `,
            createdBy: "Steve Kent",
            modifiedBy: "Steve Kent",
            deployOrder: 0,
            package_id: ids.pkg1
        });
    }

    var pkgObj2 = function (res) {
        ids.pkgObj1 = res.id;
        return models.packageDbObject.create({
            guid: "dandn39dnao983ede8398298hndnd839n8",
            objectKey: "ReportData.dbo.usp_SalesOrderStatus_ByOwner",
            databaseName: "ReportData",
            schemaName: "dbo",
            objectName: "uspSalesOrderStatus_ByOwner",
            objectType: "PROCEDURE",
            lastEventType: "CREATE",
            lastEventDDL: `
                CREATE PROCEDURE dbo.uspSalesOrderStatus_ByOwner
                AS

                SELECT TOP 1
                    * 
                FROM
                    sys.objects
            `,
            createdBy: "Steve Kent",
            modifiedBy: "Steve Kent",
            deployOrder: 0,
            package_id: ids.pkg1
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
        depEv1,
        pkgRpt1,
        pkgObj1,
        pkgObj2
    ];

    models.workflow.findAll().then(data => {
        if (data.length == 0) {
            console.log("Seeding Report Sync Started");
            waterfall(exec)
                .then(() => {
                    console.log("Seeding Report Sync Complete");
                    // console.log(ids);
                })
                .catch((err) => {
                    console.log("Seeding Report Sync Failed", err);
                });
        } else {
            console.log('Seeding Report Sync not required');
        }
    });
}

