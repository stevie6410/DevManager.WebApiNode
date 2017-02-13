"use strict"

// var Connection = require('tedious').Connection;
// var config = {
//     server: 'DC0348',
//     userName: 'appUser',
//     password: 'Password2',
//     options: {
//         database: 'ReportData'
//     }
// };
// var connection = new Connection(config);
// var Request = require('tedious').Request;

// connection.on('connect', function (err) {
//     if (!err) {
//         console.log('Connected to db');
//         executeStatment();
//     } else {
//         console.log('Connnection failed: ', err);
//     }
// });

// function executeStatment() {
//     var request = new Request("SELECT TOP 2 * FROM sys.objects", function (err, rowCount) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log(rowCount + ' rows');
//         }
//     });

//     request.on('row', function (columns) {
//         columns.forEach(function (column) {
//             console.log(column.value);
//         });
//     });

//     connection.execSql(request);
// }

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

