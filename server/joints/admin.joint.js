const 
    Admin = require('../database/models/admin.model');


class AdminJoint {
    
    constructor(){}

    findByEmail(email, projections){
        // console.log('finding admin by email')
        return new Promise((resolve, reject) => {
            let cb = (err, admin) => { 
                // console.log(err, admin)
                if(err)
                    reject({status: 500, body: err.message})
                
                resolve({status: 200, body: admin})
            }
            Admin.findOne({email}, projections, cb)
        });
    }


    save(adminModel){
        let admin = new Admin(adminModel);
        return new Promise((resolve, reject) => {
            admin.save(err => {
                err ? reject("Unable to create admin") : resolve("Admin Created");
            })
        });
    }
}

module.exports = new AdminJoint();