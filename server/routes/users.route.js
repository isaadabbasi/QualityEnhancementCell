const 
    express = require('express'),
    router = express.Router(),
    Student = require('../db_models/models/student.model'),
    
    loginCallback = (req, res, next)=> {

        let recordFindCb = (err, records)=>{
            // console.log(records)
            if(err)
                res.status(501).send("Error occured on login attempt");
            if(!err)
                res.status(200).send(records);
        }, 
        searchQuery = {};

        req.body.rollnumber ? 
            searchQuery['rollnumber'] = req.body.rollnumber 
            :
            searchQuery['employee_id'] = req.body.employee_id;
        
        console.log(`Search Query: `, searchQuery);
        Student.find(searchQuery, recordFindCb)
    },

    registrationCallback = (req, res, next)=> {
        console.log(typeof req.body);
        let 
            fullname = req.body.fullname.trim(),
            department = req.body.department.trim(),
            rollnumber = req.body.rollnumber.trim().toUpperCase(),
            password = req.body.password.trim(),
            student = new Student({
                fullname, department, rollnumber, password
            }),
            saveStudentCb = err => {

                if(err)
                    res.status(409).send("Account Already Exists");

                if(!err)
                    res.status(201).send("Account Created");
            };

        student.save(saveStudentCb);
    }


router.post('/login', loginCallback);
router.post('/registration', registrationCallback);

module.exports = router;