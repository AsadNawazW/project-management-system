import mongoose from "mongoose";

export async function  initDb()
{

    console.log("DB Init!")
    let mongoDbConnectUrl = 'mongodb://'

    if(process.env.MONGODB_USERNAME && process.env.MONGODB_PASSWORD)
    {
        mongoDbConnectUrl = mongoDbConnectUrl +  process.env.MONGODB_USERNAME + ':' + process.env.MONGODB_PASSWORD + '@'   
    }

    mongoDbConnectUrl = mongoDbConnectUrl + process.env.MONGODB_HOST + ':' + process.env.MONGODB_PORT

    if(process.env.MONGODB_DATABASE  !== undefined || process.env.MONGODB_DATABASE === null)
    {
        mongoDbConnectUrl = mongoDbConnectUrl + '/' + process.env.MONGODB_DATABASE
    }


    //mongoDbConnectUrl = mongoDbConnectUrl + '?w=majority'


    mongoose.connection.on('error',function (err) {  
        console.log('Mongoose default connection error: ' + err);
    }); 

    mongoose.connection.on('connected', function () {  
        console.log('Mongoose default connection open to ' + mongoDbConnectUrl);
    });

    let connect = await mongoose.connect(mongoDbConnectUrl,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })   
    console.log(mongoDbConnectUrl)
       

}

export async function closeConnection()
{
    console.log("DB Closed!")
    let disconnect =  await mongoose.connection.close();    
    //let disconnect = mongoose.disconnect();    
}

export async function dropDatabase()
{
    await mongoose.connection.db.dropDatabase();
}

export async function dropCollection(collectionName)
{
    await mongoose.connection.db.dropDatabase(collectionName);
}

export const clearDatabase = async () => {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany({});
    }
}
