const 
    express = require('express'),
    router = express.Router(),
    teacherJoint = require('../joints/teachers.joint');
    addTeacherHandler = (req, res, next) =>{ 
        let 
            fullname = req.body.fullname.trim(),
            designation = req.body.designation.trim(),
            departments = req.body.departments,
            subjects = req.body.subjects,
            surveys = [],
            teacherModel = {
                fullname, designation, departments, subjects, surveys
            };

        teacherJoint.addTeacher(teacherModel)
            .then( prores => {
                res.status(prores.status).send(prores.body)
            })
            .catch( err => {
                res.status(501).send("Unable to add new teacher");
            })
    }



router.post('/add', addTeacherHandler);

module.exports = router;