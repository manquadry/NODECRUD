const express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
 
//Emplooye schema object
const Employee =mongoose.model('Employee');

router.get('/', (req, res) => {
    // res.json('Sample Test');
    res.render("employee/addOrEdit",{
        viewTitle:"Insert Employee" 
    });
});

//create a post router for submitted form
router.post('/',(req,res) =>{
//  console.log('Submitting a form');
// console.log(req.body);
//call the function insert record
    if (req.body._id == '')
    insertRecord(req, res);
    else
    updateRecord(req, res);
});

//INSERT RECORD TO MONGODB
function insertRecord(req,res) {

    var employee = new Employee();
    var employee = new Employee();
    employee.fullName = req.body.fullName;
    employee.email = req.body.email;
    employee.mobile = req.body.mobile;
    employee.city = req.body.city;
    // employee.save((err,doc) => {
    //     if(!err)
    //     res.redirect('employee/list');
    //     else{
    //         console.log('Error during record insertion :' + err);
    //     }
    // });

    //add collection to database 
    employee.save()
    .then(function () {
      console.log(employee);
      res.redirect('employee/list');
    })
    .catch(function (err) {
      console.log(err);
      if (err.name == 'ValidationError') {
        handleValidationError(err, req.body);
        res.render("employee/addOrEdit", {
            viewTitle: "Insert Employee",
            employee: req.body
        });
    }
    else
        console.log('Error during record insertion : ' + err);
    });

}

function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}


function updateRecord(req, res) {
    
    Employee.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true })
          .then(docs => {
            res.redirect('employee/list');
            // return user;
          })
          .catch(err => {
            // If an error occurs while executing the query, it will be caught here
            // You can handle the error here
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("employee/addOrEdit", {
                    viewTitle: 'Update Employee',
                    employee: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
          });
      

}


router.get('/list', (req, res) => {
    //  res.json('Route to list');
     Employee.find().lean()
     .then((docs) =>  res.render("employee/list",{
        list: docs
    }))
    .catch((error) => console.log(error));
        
});

router.get('/:id', (req, res) => {
    Employee.findById(req.params.id).lean()

    .then(docs => {
        // handle user object here
        res.render("employee/addOrEdit", {
            viewTitle: "Update Employee",
            employee:docs
        });
      })
});

router.get('/delete/:id', (req, res) => {
    Employee.findByIdAndRemove(req.params.id)
    .then(docs => {
        res.redirect('/employee/list');
        // return user;
      })
      .catch(err => {
        // If an error occurs while executing the query, it will be caught here
        // You can handle the error here
        
            console.log('Error during record DELETE : ' + err);
      });
});


module.exports = router; 
