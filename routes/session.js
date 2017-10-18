var express = require('express');
var router = express.Router();
var mySqlCon = require('mysql');
var session = require('express-session')


var sqlInfo = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ecomweb'
}

router.post('/session', function (req, res, next) {
    
      
      var client = mySqlCon.createConnection(sqlInfo);
      client.connect();
    
     
      client.query("SELECT * FROM users", function (err, row, fields) {
      
        client.end();
      
    
        if (err) throw err;
        else {
          var status = null;
          var data = {
            title: 'Login',
            userresults: row,
            status : "displyed"
    
          };
          
          res.render('\session.hbs',data);
        }
      });
    });
    module.exports = router;