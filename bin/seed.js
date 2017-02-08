module.exports = function (models) {

    console.log('Starting Seed');
    
    //Check Workflow
    models.Workflow.findAll().then((data) => {
        if (data.length == 0) {
            models.Workflow.create({
                name: "Default SAO Workflow"
            }).then((wf) => {
                //Deploy Environment 1
                models.DeployEnvironment.create({
                    name: "Testing",
                    category: "TEST"
                }).then(env1 => {
                    //Deploy Environment 2
                    models.DeployEnvironment.create({
                        name: "Production",
                        category: "PROD"
                    }).then(env2 => {
                        //Database 1
                        models.Database.create({
                            name: "ReportData - Test",
                            databaseName: "ReportData",
                            serverName: "DC0348",
                            useWindowsAuth: true
                        }).then(db1 => {
                            //Database 2
                            models.Database.create({
                                name: "ReportData - Prod",
                                databaseName: "ReportData",
                                serverName: "DCWSAORD001P",
                                useWindowsAuth: true
                            }).then(db2 => {
                                //ReportServer 1
                                models.ReportServer.create({
                                    name: "SAO Report Server - Test",
                                    reportServerAddress: 'http://DC0348:81/ReportServer/',
                                    reportManagerAddress: 'http://DC0348:81/Reports/'
                                }).then(rs1 => {
                                    //ReportServer 2
                                    models.ReportServer.create({
                                        name: "SAO Report Server - Production",
                                        reportServerAddress: 'http://DCWSAORD001P/ReportServer/',
                                        reportManagerAddress: 'http://DCWSAORD001P/Reports/'
                                    }).then(rs2 => {
                                        //Package 1 
                                        models.Package.create({
                                            name: "Package 1",
                                            description: "Seed Package 1",
                                            status: "Pending",
                                            ticketRef: "SAORPT-101",
                                            createdBy: "Steve Kent",
                                            modifiedBy: "Steve Kent",
                                            workflow_id: wf.id
                                        }).then((pkg1) => {
                                            //Package 2 
                                            models.Package.create({
                                                name: "Package 2",
                                                description: "Seed Package 2",
                                                status: "Pending",
                                                ticketRef: "SAORPT-102",
                                                createdBy: "Steve Kent",
                                                modifiedBy: "Steve Kent",
                                                workflow_id: wf.id
                                            }).then((package2) => {
                                                //Workflow Stage 1 
                                                models.WorkflowStage.create({
                                                    name: "SAO Report - Testing",
                                                    sequence: 1,
                                                    workflow_id: wf.id,
                                                    database_id: db1.id,
                                                    report_server_id: rs1.id,
                                                    deploy_environment_id: env1.id
                                                }).then(wfs1 => {
                                                    //Workflow Stage 2
                                                    models.WorkflowStage.create({
                                                        name: "SAO Report - Production",
                                                        sequence: 2,
                                                        workflow_id: wf.id,
                                                        database_id: db2.id,
                                                        report_server_id: rs2.id,
                                                        deploy_environment_id: env2.id
                                                    }).then(wfs2 => {

                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        }
    });

}


