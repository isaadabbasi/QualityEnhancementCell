const 
    Admin = require('../database/models/admin.model');


class AdminJoint {
    
    constructor(){}

    findByEmail(email, projections){
        console.log('finding admin by email')
        return new Promise((resolve, reject) => {
            let cb = (err, admin) => { 
                console.log(err, admin)
                if(err)
                    reject({status: 500, body: err.message})
                
                resolve({status: 200, body: admin})
            }
            Admin.findOne({email}, projections, cb)
        });
    }


    // save(admin){
    //     let _admin = new Admin(admin);
    //     new Promise((resolve, reject) => {
    //         _admin.save(err => {
    //             if(err){
    //                 console.log('ERROR AT SAVING ADMIN', err);
    //                 reject();
    //             }
    //             else {
    //                 console.log('ADMIN SAVED');
    //                 resolve();
    //             }
    //         })
    //     });
    // }
}

module.exports = new AdminJoint();