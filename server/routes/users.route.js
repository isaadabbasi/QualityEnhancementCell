// import { createReadStream } from 'fs';
const 
    express = require('express'),
    router = express.Router(),
    AdminJoint = require('../joints/admin.joint'),
    Student = require('../database/models/student.model'),
    { generateHash } = require('../utils/common.utils'),
    bcrypt = require('bcrypt'),
    loginCallback = (req, res, next)=> {

        if(req.body.email) {
            res.redirect(307, '/admins/login');
            return;
        }

        const {
            rollnumber = null,
            password = null
        } = req.body;


        let recordFindCb = (err, record)=>{
                if(err)
                    res.status(501).send("Error occured on login attempt");
                if(!record)
                    res.status(401).send("No Such Account Exists")
                
                let compareCb = (err, success)=>{
                    // delete record['password'];
                    if(err)
                        res.status(500).send("Unable to compare password");
                    if(!err && success){
                        record.password = null;
                        res.status(200).send(record);
                    }
                    if(!err && !success)
                        res.status(401).send("Invalid Password");
                }
                if(record)
                    bcrypt.compare(password, record.password, compareCb)

            },
            
            responseParams= {
                _id: true, department: true, password: true
            };

            Student.findOne({rollnumber}, responseParams, recordFindCb)
    },

    registrationCallback = (req, res, next)=> {
        // console.log(req.body);
        let 
            fullname = req.body.fullname.trim(),
            department = req.body.department.trim(),
            rollnumber = req.body.rollnumber.trim().toUpperCase(),
            password = req.body.password,
            pattern = new RegExp("[D][-][0-9]{2}[-][(CS)|(ES)|(MM)|(CH)|(AR)|(IM)|(TE)|(PG)|(EE)]{2}[-][0-9]{2,3}", "i"),
            vRollnumber = pattern.exec(rollnumber);

            if(vRollnumber && vRollnumber[0]) rollnumber = vRollnumber[0];
            else {
                res.status(406).send('Invalid Rollnumber');
                return;
            }
            generateHash(password) // return hash with 10 round salt added
                .then(hash=> {
                    let student = new Student({
                        fullname, department, rollnumber, password: hash
                    }),
                    saveStudentCb = err => {
                        if(err)
                            // console.log(err.message)
                            res.status(409).send("Account Already Exists");

                        if(!err)
                            res.status(201).send("Account Created");
                    }
                    student.save(saveStudentCb);
                }).catch(err=>{
                    throw new Error(err)
                })
    }

router.post('/login', loginCallback);
router.post('/register', registrationCallback);

module.exports = router;