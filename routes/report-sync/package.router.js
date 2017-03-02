var express = require('express');
var router = express.Router();
var db = require('../../models/report-sync');

router.get('/:id', function (req, res) {
    db.package.findById(req.params.id, {
        include: [
            { model: db.packageDbObject },
            {
                model: db.deployment, include: [
                    { model: db.deployEnvironment },
                    { model: db.workflowStage }
                ]
            }
        ]
    }).then(
        data => {
            res.send(data);
        });
});

module.exports = router;

