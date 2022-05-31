const mongoose = require('mongoose')



//const mongoDbConnectUrl = `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE}`
const mongoDbConnectUrl = `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/`
console.log(mongoDbConnectUrl)


mongoose.connection.on('error',function (err) {  
    console.log('Mongoose default connection error: ' + err);
}); 

mongoose.connection.on('connected', function () {  
    console.log('Mongoose default connection open to ' + mongoDbConnectUrl);
});

dbInstance = mongoose.connect(mongoDbConnectUrl,() => {
    console.log("Connected with mongodb")
})


module.exports = dbInstance