const 
    express = require('express'),
    router = express.Router(),
    Student = require('../database/models/student.model'),
    bcrypt = require('bcrypt'),
    saltRounds = 10, 

    generateHash = (password)=>{
        console.log(`password about to encrypt: ${password}`);
        return new Promise((resolve, reject)=>{
            let genHashCb = (err, hash)=>{
                if(err)
                    reject(err)
                
                if(!err && hash)
                    resolve(hash)

            };
            
            bcrypt.hash(password, saltRounds, genHashCb)
        })
    },
    loginCallback = (req, res, next)=> {
        let 
            password = req.body.password,
            recordFindCb = (err, record)=>{
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
            searchQuery = {},
            responseParams= {
                __v: false,
                created: false,
                fullname: false
            };

        req.body.rollnumber ? 
            searchQuery['rollnumber'] = req.body.rollnumber 
            :
            searchQuery['employee_id'] = req.body.employee_id;
        
        console.log(`Search Query: `, searchQuery);

        Student.findOne(searchQuery, responseParams, recordFindCb)
    },

    registrationCallback = (req, res, next)=> {
        console.log(typeof req.body);
        let 
            fullname = req.body.fullname.trim(),
            department = req.body.department.trim(),
            rollnumber = req.body.rollnumber.trim().toUpperCase(),
            password = req.body.password;
            

            generateHash(password) // return hash with 10 round salt added
                .then(hash=> {
                    let student = new Student({
                        fullname, department, rollnumber, password: hash
                    }),
                    saveStudentCb = err => {
                        if(err)
                            // console.log(err)
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
router.post('/registration', registrationCallback);

module.exports = router;