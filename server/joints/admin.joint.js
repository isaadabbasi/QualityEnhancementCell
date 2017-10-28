const 
    Admin = require('../database/models/admin.model');

export class AdminJoint {
    
    constructor(){}

    findByEmail(email, projections){
        new Promise((resolve, reject) => {
            Admin.findOne({email}, projections)
                .then(res=> {
                    console.log('what is found: ', res);
                })
                .catch(err => {
                    console.log('err caught: ', err);
                })
        });

    }
}

module.exports = new AdminJoint();