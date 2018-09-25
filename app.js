var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');

var app = express();
var users = [
    {
        id: 01,
        firstname: 'Rajkumar',
        lastname: 'Patoliya',
        age: 23,
        email: 'patoliyaraj@gmail.com'
    },
    {
        id: 02,
        firstname: 'Karan',
        lastname: 'ahir',
        age: 24,
        email: 'karan@gmail.com'
    },
    {
        id: 03,
        firstname: 'Sandeep',
        lastname: 'ahir',
        age: 22,
        email: 'sandeep@gmail.com'
    }
]

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set static path
app.use(express.static(path.join(__dirname, 'public')));

// Global variables

app.use(function(req, res, next) {
    res.locals.errors = null;
    next();
});

// Express-validation Middleware-option errorFormatter
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.'),
        root = namespace.shift(),
        formParam = root;

        while(namespace.length) {
           formParam += '['+ namespace.shift() +']' 
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));
app.get('/', function(req, res) {
    res.render('index', {
        title:'Customers',
        users: users
    });
});

app.post('/users/add', function(req, res) {
    req.checkBody('firstname', 'First Name is Required').notEmpty();
    req.checkBody('lastname', 'Last Name is Required').notEmpty();
    req.checkBody('email', 'Email is Required').notEmpty();
    var errors =req.validationErrors(); 
    if(errors) {
        res.render('index', {
            title:'Customers',
            users: users, 
            errors: errors
        });
    } else {
        let newCustomer = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email
        }
        console.log('Registration Successful...');
    }
    
});

/*var logger = function(req, res, next){
    console.log("Logging...");
    next();
}
app.use(logger);*/
app.listen(3000, function() {
    console.log('Server Started at Port 3000...');
})