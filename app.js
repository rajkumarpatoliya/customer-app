var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

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

app.get('/', function(req, res) {
    res.render('index', {
        title:'Customers',
        users: users
    });
});


/*var logger = function(req, res, next){
    console.log("Logging...");
    next();
}
app.use(logger);*/
app.listen(3000, function() {
    console.log('Server Started at Port 3000...');
})