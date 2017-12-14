const
    express = require('express'),
    router = express.Router(),
    AdminJoint = require('../joints/admin.joint'),
    { generateHash, bcryptCompare, isObjectId } = require('../utils/common.utils')
    
    addAdmin = (req, res, next) => {
        console.log('add called')
        const [{
            email = null,
            password = null
        }, {root = 0}] = [req.body, req.params];

        console.log(req.params);
        if (!isObjectId(root)) {
            res.sendStatus(401); return;
        }
        
        if(!email || !password) {
            res.status(500).send("You must provide email and password");
            return;
        }

        AdminJoint.findByEmail(email)
            .then(({body}) => {
                if (body && body._id){
                    res.status(409).send("Email Already Exists");
                    return;
                }

                generateHash(password)
                    .then(hash => AdminJoint.save({email, password: hash}))
                        .then( message =>{
                            res.status(200).send(message)
                        })
                        .catch(err => {
                            res.status(500).send(err);
                        });
                })
            .catch(console.log);
    },

    login = (req, res) => {
        const { email = null, password = null } = req.body;
        
        let record = {};

        if(!email || !password) {
            res.status(500).send("Please provide email and password");
            return;
        }

        AdminJoint.findByEmail(email)
            .then(({body}) => {
                if(!body){
                    res.status(404).send("Invalid Email");
                    return;
                } 
                record = {
                    _id: body._id,
                    email: body.email,
                    root: body.root
                }

                return bcryptCompare(password, body.password);
            })
            .then( compared => {
                compared ? res.status(200).send(record) : res.status(401).send("Invalid Password")
            })
        .catch(console.log)
    },

    getAdmins = (req, res, next) => {
        let { root = 0 } = req.params;
        
        if (!root || !isObjectId(root)) {
            res.sendStatus(401);
            return;
        }
                
        AdminJoint.find()
            .then(({status, body})=> {
                res.status(status).send(body)
            })
            .catch(({status, body})=>{
                res.status(status).send(body)
            });
    },
    deleteAdmin = (req, res) => {
        let { root = 0, actor = 0 } = req.params;
        
        if (!root || !actor || !isObjectId(root) || !isObjectId(root)) {
            res.sendStatus(401);
            return;
        }

        AdminJoint.isAdmin(root)
            .then(({ root: is_root = false })=> is_root ? AdminJoint.remove(actor) : null)
            .then(done => {
                res.sendStatus(!done ? 401 : 200);
            })
    }

router
    .route('/:root?')
    .get(getAdmins)
    .post(addAdmin)

router.delete('/:root?/:actor?', deleteAdmin)
router.post('/login', login); 

module.exports = router;