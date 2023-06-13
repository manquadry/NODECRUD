const mongoose = require('mongoose');// Call to mongodb driver connectiom
const dbName='EmployeeDB';
// var mongoose = require("mongoose")

// //Connect to mongodb database with port number and DB NAME
// mongoose.connect('mongodb://127.0.0.1:27017/customerdetails', { useNewUrlParser: true }, (err) => {
//     if (!err) { console.log('MongoDB Connection Succeeded.') }
//     else { console.log('Error in DB connection : ' + err) }
// });

// require('./employee.model');


//DB CONNECT CONFIGURATION
mongoose.connect('mongodb://127.0.0.1:27017/EmployeeDB',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//GET THE CONNECTION FROM MONGODB
 var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connection  to Database EmployeeDB Successful"))
require('./employee.model');


