var waterfall = require('promise-waterfall');

module.exports = function (models) {

    var ids = {};

    var dept1 = function () {
        return models.department.create({
            name: "Business Systems Dept.",
            owner: "Mehrgan Langeroodi",
            createdBy: "Steve Kent",
            modifiedBy: "Steve Kent"
        }).then((r) => ids.dept1 = r.id);
    }
    var dept2 = function (res) {
        return models.department.create({
            name: "Quality Dept.",
            owner: "Greg Buyer",
            createdBy: "Steve Kent",
            modifiedBy: "Steve Kent"
        }).then((r) => ids.dept2 = r.id);
    }
    var sys1 = function (res) {
        return models.system.create({
            name: "Report Manager",
            description: "Dev Manager App",
            owner: "Steve Kent",
            githubRepo: "Steve Kent",
            createdBy: "Steve Kent",
            updatedBy: "Steve Kent"
        }).then((r) => {
            ids.sys1 = r.id
            r.addDepartments([ids.dept1]);
        });
    }
    var sys2 = function (res) {
        return models.system.create({
            name: "SWI App",
            description: "Standard Work Instruction App",
            owner: "Steve Kent",
            githubRepo: "Steve Kent",
            createdBy: "Steve Kent",
            updatedBy: "Steve Kent"
        }).then((r) => {
            ids.sys2 = r.id
            r.addDepartments([ids.dept1, ids.dept2]);
        });
    }
    var sys3 = function (res) {
        return models.system.create({
            name: "Self Validation App",
            description: "Self Validation Application",
            owner: "Steve Kent",
            githubRepo: "Steve Kent",
            createdBy: "Steve Kent",
            updatedBy: "Steve Kent"
       }).then((r) => {
            ids.sys3 = r.id
            r.addDepartments([ids.dept1, ids.dept2]);
        });
    }

    var exec = [
        dept1,
        dept2,
        sys1,
        sys2,
        sys3
    ];

    models.department.findAll().then(data => {
        if (data.length == 0) {
            console.log("Seeding Dev Manager Started");
            waterfall(exec)
                .then(() => {
                    console.log("Seeding Dev Manager Complete");
                })
                .catch((err) => {
                    console.log("Seeding Dev Manager Failed", err);
                });
        } else {
            console.log('Seeding Dev Manager not required');
        }
    });
}

