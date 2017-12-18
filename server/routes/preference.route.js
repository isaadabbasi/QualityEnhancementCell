const   
    express = require('express'),
    router = express.Router(),
    Preferences = require('../database/models/preferences.model');
class PreferencesJoint {
    constructor(){}

    get(){
        return Preferences.findOne({})
    }

    update(_id, payload){
        console.log(_id, payload);
        return Preferences.findByIdAndUpdate( _id, {
            $set: payload
        });
    }
}

var Joint = new PreferencesJoint()
module.exports.joint = Joint;



router.get('/', ( req, res )=>{
    Joint.get()
        .then(prefs => {
            if(!prefs || !prefs._id){
                res.sendStatus(404); return;
            }

            res.status(200).send(prefs);
        })
        .catch(()=>{
            res.sendStatus(500);
        })
});

router.put('/:_id', ( req, res )=> {
    const 
        [ { _id : id = null } , { session : session = null } ] = [ req.params, req.body ];
    
    Joint.update(id, {session})
        .then( ()=> {
            res.sendStatus(200);
        }).catch(err => {
            console.error(err.message);
            res.sendStatus(501);
        })
})

module.exports = router;
