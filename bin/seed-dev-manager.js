var waterfall = require('promise-waterfall');

module.exports = function (models) {

    var ids = {};

    var dept1 = function() {
        return models.department.create({
            name: "Business Systems Dept.",
            owner: "Mehrgan Langeroodi",
            createdBy: "Steve Kent",
            modifiedBy: "Steve Kent"
        });
    }
 

    var exec = [
        dept1
    ];

    models.department.findAll().then(data => {
        if (data.length == 0) {
            console.log("Seeding Dev Manager Started");
            waterfall(exec)
                .then(() => {
                    console.log("Seeding Dev Manager Complete");
                    // console.log(ids);
                })
                .catch((err) => {
                    console.log("Seeding Dev Manager Failed", err);
                });
        } else {
            console.log('Seeding Dev Manager not required');
        }
    });
}

