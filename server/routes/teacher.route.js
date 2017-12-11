const 
    express = require('express'),
    router = express.Router(),
    teacherJoint = require('../joints/teachers.joint'),
    
    addTeacherHandler = (req, res, next) =>{ 
        let 
            fullname = req.body.fullname,
            designation = req.body.designation,
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
                if(err.status === 409)
                    res.status(err.status).send(err.body);                    
                else 
                    res.status(501).send("Unable to add new teacher");

            })
    },

    getDetailsHandlder = (req, res, next)=>{
        const 
            query = req.query,
            params = {};
        console.log('req query: ', req.query);
        query.department && (params.departments = query.department);
        query.fullname && (params.fullname = query.fullname);

        teacherJoint.deepSearch(params)
            .then(result =>{
                let { status = 0, body = null } = result;
                res.status(status).send(body)
            })
            .catch(err=>{
                console.log(err)
                res.status(404).send(err.body)
            })
    },

    wrappedRouteHandler = (operation)=>{
        return (req, res)=> {
            const { _id = null } = req.params, body = req.body || {};
            if(!_id){
                res.status(400).send(`Must send \'id\' to ${operation} the teacher`);
                return;
            }
            if(operation === 'update' && !Object.keys(body).length){
                res.status(400).send(`Send params to update the teacher`);
                return;
            }
            teacherJoint[operation](_id, body)
                .then(resolve => { 
                    res.status(200).send(resolve.body); 
                })
                .catch(err => { console.log(err) })
        }
    }


    
router.get('/details', getDetailsHandlder);
router.post('/add', addTeacherHandler);

router.route('/:_id')
    .post(wrappedRouteHandler('update'))
    .get(wrappedRouteHandler('fetch'))
    .delete(wrappedRouteHandler('remove'));

module.exports = router;