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
    },
    getDetailsHanlder = (req, res, next)=>{
        let 
            searchQuery = {};
        if(Object.keys(req.body).length){
                        
            if(req.body.hasOwnProperty('department'))
                searchQuery['departments'] = req.body.department
            if(req.body.hasOwnProperty('teacher') || req.body.hasOwnProperty('fullname'))
                searchQuery['fullname'] = req.body.teacher || req.body.fullname
            
            teacherJoint.findResultFor(searchQuery)
                .then(result =>{
                    console.log(result)
                    res.status(302).send(result)
                })
                .catch(err=>{
                    // console.log(err)
                    res.status(404).send(err.body)
                })
            // res.status(200).send(searchQuery)
        }
        else 
            res.status(406).send('Send Params to get details')
    }



router.post('/add', addTeacherHandler);
router.post('/details', getDetailsHanlder);
module.exports = router;