var session = require('express-session');
var express = require('express');
var router = express.Router();
var mySqlCon = require('mysql');
var md5 = require('md5');



router.use(session({ secret: 'keyboard cat',saveUninitialized:false, resave:false, cookie: { maxAge: 60000 }}));

var sqlInfo = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ecomweb'
}


router.get('/', function (req, res, next) {
   sess = req.session;
   sess.email;

 if(sess.email){
    res.render('welcome')
}
else{
  res.render('index', { title: 'Login ' });
} 
});

// router.post('/login',function(req,res){
//   sess = req.session;
// //In this we are assigning email to sess.email variable.
// //email comes from HTML page.
//   sess.email=req.body.email;
//   res.end('done');
// });

// router.get('/admin',function(req,res){
//   sess = req.session;
// if(sess.email) {
// res.write('<h1>Hello'+sess.email+'</h1>');
// res.end('<a href="+">Logout</a>');
// } else {
//     res.write('<h1>Please login first.</h1>');
//     res.end('<a href="+">Login</a>');
// }
// });

router.get('/logout',function(req,res){
  req.session.destroy(function(err) {
    if(err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  });
});




router.post('/', function (req, res, next) {
  var email = req.body.email;
  var password = md5(req.body.password);
  var client = mySqlCon.createConnection(sqlInfo);

  client.connect();

  var q = client.query('SELECT * FROM users WHERE email ="' + email + '" and password="' + password + '"', function (error, results, fields) {

    client.end();
    if (error) {
      // console.log("error ocurred",error);
      res.send({
        "code": 400,
        "failed": "error ocurred"
      })
    } else {
      if (results != "") {
        // res.send({
        //   "code":200,
        //   "msg":"login successfully"
        //     });
          // Login session created
          sess = req.session;
          //In this we are assigning email to sess.email variable.
          //email comes from HTML page.
            sess.email=email;
            if(sess.email){
              res.render('welcome');
          }
          else{
            res.render('index', { title: 'Login ' });
          }
//res.send(sess.email);
          // Session End

//res.render("welcome");
      }
      else {
        res.send({
          "code": 204,
          "msg": "Email does not exits"
        });
      }
      // res.send("index?sucess");
    }
  });
  //console.log(q.sql);
});

module.exports = router;

