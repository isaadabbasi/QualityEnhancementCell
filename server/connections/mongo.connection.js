(()=>{

    const 
        mongoose = require('mongoose'),
        host = 'localhost',
        port = '27017',
        schema = 'qec',
        connection_url = `mongodb://${host}:${port}/${schema}`,
        options = {
            useMongoClient: true
        },

        connection_cb = function (err){
            if(err)
                throw new Error(err);
            
            if(!err)
                process.stdout.write('Database Connection Established \n');
        };
    
    mongoose.connect(connection_url, options, connection_cb);
})()