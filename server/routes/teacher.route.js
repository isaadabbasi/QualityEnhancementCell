const 
    express = require('express'),
    router = express.Router(),
    teacherJoint = require('../joints/teachers.joint');
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
                res.status(501).send("Unable to add new teacher");
            })
    },
    getDetailsHandlder = (req, res, next)=>{
        console.log('req query: ', req.query);
        let 
            searchQuery = {};
                        
            if('department' in req.query)
                searchQuery['departments'] = req.query.department
            if('fullname' in req.query)
                searchQuery['fullname'] = req.query.fullname;
            
            teacherJoint.deepSearch(searchQuery)
                .then(result =>{
                    console.log(result)
                    res.status(200).send(result)
                })
                .catch(err=>{
                    // console.log(err)
                    res.status(404).send(err.body)
                })
    },

    wrappedRouteHandler = (operation)=>{
        return (req, res)=> {
            const { _id = null } = req.params;
            if(!_id){
                res.status(400).send(`Must send \'id\' to ${operation} the teacher`);
                return;
            }

            teacherJoint[operation](_id)
                .then(resolve => { 
                    res.status(200).send(resolve.body); 
                })
                .catch(err => { console.log(err) })
        }
    }



router.get('/details', getDetailsHandlder);
router.post('/add', addTeacherHandler);
router.route('/:_id')
    // .get(wrappedRouteHandler('fetch'))
    // .update(wrappedRouteHandler('update'))
    .delete(wrappedRouteHandler('remove'));

module.exports = router;