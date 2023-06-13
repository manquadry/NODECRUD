require('./models/db');
//express object
const express = require('express');
//Add path for handle bars
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');



//request statement for emplooye controller
const employeeController = require('./controllers/employeeController');

//express object instance
var app = express();
//set body parser for the form
app.use(bodyparser.urlencoded({
    extended:true
})); 
//convert form data from bosyparser to json
app.use(bodyparser.json());

//set view directory
app.set('views', path.join(__dirname, '/views/'));
//app.engine('hbs', exphbs.engine({extname: 'hbs', defualtLayout : 'layout' , layoutsDir: __dirname + '/views/layouts',partialsDir:__dirname+'/views/partials/'}));
app.engine('hbs', exphbs.engine ({extname:'hbs',defaultLayout:'mainLayout',layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'hbs');

// app.engine('handlebars', exphbs.engine());
// app.set('view engine', 'handlebars')


app.listen(3100,()=>{
console.log("Express server start @ port:3100");
});

//Add a route for employee controller
 app.use('/Employee', employeeController);


 





