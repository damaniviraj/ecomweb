var session = require('express-session');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var fileUpload = require('express-fileupload');


var index = require('./routes/index');
var users = require('./routes/users');
var session = require('./routes/session');
var category = require('./routes/category');
var products = require('./routes/products');
var upload = require('./routes/upload');
//var add_category = require('./routes/add_category');



var app = express();

function isUserAuthenticated(req,res,next){
  //you can check anything heref like req.url ,session ect.
   
  //so let's check if user session exists
  if(req.session.email){
  //user logged in
  return next();
  }
  //user not authenticated redirect them to login page or anywhere you want
  res.redirect("/");
  };

var authenticate = function (req, res, next) {

   var ses =function (error, results, fields)
  {
    
        client.end();
        if (error) {
          // console.log("error ocurred",error);
          res.send({
            "code": 400,
            "failed": "error ocurred"
          })
        } else {
          if (results != "") {
                sess = req.session;         
                sess.email=email;
                if(sess.email){
                  res.render('welcome');
              }
              else{
                res.render('index', { title: 'Login ' });
              }
            }
          }
          }
  
next();
};  

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(authenticate);
//app.use(isUserAuthenticated);
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());


//app.use(session({secret: 'max', saveUninitialized:false, resave:false}));



app.use('/', index);
app.use('/users', users);
app.use('/session',session);
app.use('/category',isUserAuthenticated, category);
app.use('/products',isUserAuthenticated, products);
app.use('/upload',upload);
//app.use('/add_product',add_product);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
