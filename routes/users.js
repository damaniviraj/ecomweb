var express = require('express');
var router = express.Router();
var mySqlCon = require('mysql');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

var sqlInfo = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ecomweb'
}


router.post('/display', function (req, res, next) {
  
    // connect to MySQL server
    var client = mySqlCon.createConnection(sqlInfo);
    client.connect();
  
    // Perform query and wait for results
    client.query("SELECT * FROM products WHERE category_id =1", function (err, row, fields) {
    console.log(asdf);
      client.end();
      // Handle error
  
      if (err) throw err;
      else {
        var status = null;
        var data = {
        
          userresults: row,
          status : "asm"
  
        };
       
        res.send(data);
      }
    });
  });

router.post('/', function(req, res, next) {
  
  res.render('welcome');
});

module.exports = router;
