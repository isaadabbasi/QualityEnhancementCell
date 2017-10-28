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
        console.log('reqbody: ', req.body);
        let 
            searchQuery = {};
        if(Object.keys(req.body).length){
                        
            if('department' in req.body)
                searchQuery['departments'] = req.body.department
            if('teacher' in req.body)
                searchQuery['fullname'] = req.body.teacher
            
            teacherJoint.findResultFor(searchQuery)
                .then(result =>{
                    console.log(result)
                    res.status(200).send(result)
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