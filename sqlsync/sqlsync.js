"use strict"

var Request = require('tedious').Request;

module.exports = class {

    constructor(connection, dbObjects) {
        this.connection = connection;
        this.dbObjects = dbObjects;
    }

    printPackageObjectNames() {
        if (this.dbObjects) {
            console.log("=========== Objects to Deploy ===========");
            this.dbObjects.forEach(obj => {
                console.log(obj.objectKey);
            });
            console.log("=========================================");
        }
    }

    deploy() {
        if (this.dbObjects) {
            this.dbObjects.forEach(obj => {
                //Create a new request
                this.exec(obj.lastEventDDL);
            });
        };
    }


    exec(sql) {
        console.log('Going to execute: ', sql);
        var request = new Request(sql, function (err, rowCount) {

            if (err) {
                //Handle Error
                console.log(err);
            }

            request.on('requestCompleted', function (err, rowCount, rows) {
                console.log('Request Completed!');
                console.log(err);
            });
        });

        //Run the script
        this.connection.execSql(request);
    }

}

