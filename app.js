var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mongoose = require('mongoose');
var passport = require('passport');
var bodyParser = require('body-parser');

var app = express();
const authRoute = require('./routes/auth');
const bookSeat = require('./routes/booking');
const Home = require('./routes/home')

require('./auth-config');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB Config
const DB_URL = require('./config/keys').MongoURI;

//connect to mongo
//---------------------------------------------
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Connected to MongoDB")
    })
    .catch(err => {
        throw err
    })
//--------------------------------------------
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//---------------------------------------------
app.use('/home', passport.authenticate('jwt', { session: false }), Home);
app.use('/', authRoute);
app.use('/seatBook', bookSeat);




app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
