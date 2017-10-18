var session = require('express-session');
var express = require('express');
var router = express.Router();
var mySqlCon = require('mysql');
var fs = require('fs');
var fileUpload = require('express-fileupload'); // only for file upload



var sqlInfo = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ecomweb'
}


router.get('/', function (req, res, next) {

  

  var client = mySqlCon.createConnection(sqlInfo);
  client.connect();

  client.query("SELECT * FROM category ORDER BY id DESC", function (err, row, fields) {


    client.end();


    if (err) throw err;
    else {
      var status = null;
      var data = {
        //title: 'To do list',
        userresults: row,
        status: "asm"

      };

      res.render("category", data);

    }
  });
});




router.get('/delete/:id?', function (req, res) {
  var id = req.params.id;

  var client = mySqlCon.createConnection(sqlInfo);
  client.connect();



  client.query("DELETE FROM `category` WHERE id = " + id + "", function (err, row, fields) {

    client.end();
    var response = {
      "status": 1,
      "msg": "row deleted"

    }
    // Handle error
    if (err) throw err;
    else {
      // We got a result: render it
      //console.log(row);
      res.redirect('/category');
    }
  });
});
router.get('/insert', function (req, res, next) {

  res.render('add_category');
});

router.post('/insert', function (req, res) {

  var pic = req.body.pic;
  
  var categ_name = req.body.categ_name;
  var save_db_path = "";

  var client = mySqlCon.createConnection(sqlInfo);
  client.connect();

  //  Start File Uploading 
      if (!req.files)
      return res.status(400).send('No files were uploaded.');

      //The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
      let sampleFile = req.files.sampleFile;
      save_db_path= req.files.sampleFile.name;
      //  // Use the mv() method to place the file somewhere on your server
        sampleFile.mv('./public/upload/'+req.files.sampleFile.name, function(err) {
          if (err)
          return res.status(500).send(err);
           
        });
         
  // End file uploading

  client.query("INSERT INTO category(name,catImg) VALUES('" + categ_name + "','" + save_db_path + "')", function (err, status) {

    client.end();

    var response = {
      "status": 1,
      "msg": "row inserted",

    }
    // Handle error
    if (err) throw err;
    else {
      res.redirect('/category');
    }
  });
});

router.get('/edit/:id?', function (req, res, next) {
  var id = req.params.id;
  

  var client = mySqlCon.createConnection(sqlInfo);
  client.connect();
  client.query("SELECT * FROM category WHERE id = " + id + "", function (err, row, fields) {

    console.log("SELECT * FROM category WHERE id = " + id + "");
    
    
        client.end();
    
    
        if (err) throw err;
        else {
          var status = null;
          var data = {
            //title: 'To do list',
            results: row[0],
            status: ""
    
          };
              
          res.render("edit_category",data);
        }
      });
    });
    
router.post('/edit/:id?', function (req, res) {

  var id = req.body.id;
  var name = req.body.name;
  var save_db_path = "";

  var client = mySqlCon.createConnection(sqlInfo);
  client.connect();

  //The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  if(typeof req.files.sampleFile!== 'undefined')
  {
    if (fs.existsSync("./public"+req.body.hdn_img)) {
      
      fs.unlink("./public"+req.body.hdn_img);
    }
    let sampleFile = req.files.sampleFile;
    save_db_path= req.files.sampleFile.name;
    //  // Use the mv() method to place the file somewhere on your server
      sampleFile.mv('./public/upload/'+req.files.sampleFile.name, function(err) {
        if (err)
        return res.status(500).send(err);
      });
      var string_update = "name ='" + name + "', catImg='" + save_db_path + "'";
  }
  else
  {
    var string_update = "name ='" + name + "'";
  }
  var q = client.query("UPDATE category SET "+string_update+"  WHERE id = " + id + "", function (err, status) {
    //console.log("UPDATE category SET name ='" + name + "' WHERE id = " + id + "");
    client.end();
    var response = {
      "status": 1,
      "msg": "row updated",

    }
    // Handle error
    if (err) throw err;
    else {
      //fs.unlink("./public"+req.body.hdn_img);
      res.redirect('/category');
    }
  });
});

router.get('/display/:id?', function (req, res, next) {

});

router.post('/display/:id?', function (req, res, next) {
  var pic = req.body.pic;

  });




module.exports = router;
