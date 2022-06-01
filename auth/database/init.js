const mongoose = require('mongoose')

function initDb()
{

    let mongoDbConnectUrl = 'mongodb://'

    if(process.env.MONGODB_USERNAME && process.env.MONGODB_PASSWORD)
    {
        mongoDbConnectUrl = mongoDbConnectUrl +  process.env.MONGODB_USERNAME + ':' + process.env.MONGODB_PASSWORD + '@'   
    }

    mongoDbConnectUrl = mongoDbConnectUrl + process.env.MONGODB_HOST + ':' + process.env.MONGODB_PORT

    if(process.env.MONGODB_DATABASE  === undefined || process.env.MONGODB_DATABASE === null)
    {
        mongoDbConnectUrl = mongoDbConnectUrl + '/' + process.env.MONGODB_DATABASE
    }


    console.log(mongoDbConnectUrl)


    mongoose.connection.on('error',function (err) {  
        //console.log('Mongoose default connection error: ' + err);
    }); 

    mongoose.connection.on('connected', function () {  
        console.log('Mongoose default connection open to ' + mongoDbConnectUrl);
    });

    mongoose.connect(mongoDbConnectUrl,() => {
        //console.log("Connected with mongodb")
    })
   

    mongoose.connection.once('open', function () {
      console.log("Connected to database");      
    });    

}

function closeConnection()
{
    mongoose.connection.close();    
}


module.exports = { initDb , closeConnection }