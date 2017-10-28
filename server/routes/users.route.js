const 
    express = require('express'),
    router = express.Router(),
    AdminJoint = require('../joints/admin.joint'),
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
            searchQuery['email'] = req.body.email;
        
        console.log(`Search Query: `, searchQuery);
        searchQuery.hasOwnProperty('rollnumber') ?
            Student.findOne(searchQuery, responseParams, recordFindCb)
            :
            AdminJoint.findByEmail(searchQuery.email, responseParams)
                .then(admin => {
                    if(admin.body && '_id' in admin.body){
                        admin.body.password = null;
                         res.status(200).send(admin.body);
                    } else 
                        res.status(401).send('No Match Found');
                })
                .catch(err=> {
                    res.status(500).send(err.body)
                    // console.log('PROMISE REJECTED AT FINDING BY EMAIL');
                })
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