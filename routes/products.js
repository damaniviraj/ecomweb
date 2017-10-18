var express = require('express');
var router = express.Router();
var mySqlCon = require('mysql');
var fs = require('fs');



var sqlInfo = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ecomweb'
}

router.get('/', function (req, res, next) {


  var client = mySqlCon.createConnection(sqlInfo);
  client.connect();




  client.query("SELECT * FROM products ORDER BY id DESC", function (err, row, fields) {


    client.end();


    if (err) throw err;
    else {
      var status = null;
      var data = {
        //title: 'To do list',
        userresults: row,
        status: "asm"

      };

      res.render("products", data);

    }
  });
});

router.post('/delete', function (req, res) {

  var client = mySqlCon.createConnection(sqlInfo);
  client.connect();
  var todo = req.body.todo;


  client.query("DELETE FROM `products` WHERE id = " + todo + "", function (err, row, fields) {

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
      res.send(response);
    }
  });
});

router.get('/delete/:id?', function (req, res) {
  var id = req.params.id;

  var client = mySqlCon.createConnection(sqlInfo);
  client.connect();



  client.query("DELETE FROM `products` WHERE id = " + id + "", function (err, row, fields) {

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
      res.redirect('/products');
    }
  });
});

router.get('/insert', function (req, res, next) {

  var client = mySqlCon.createConnection(sqlInfo);
  client.connect();

  client.query("SELECT * FROM category ", function (err, row, fields) {

    client.end();


    if (err) throw err;
    else {
      var status = null;
      var data = {
        //title: 'To do list',
        results: row,
        status: "asm"

      };


      res.render('add_product', data);
    }
  });
});


router.post('/insert', function (req, res) {


  var save_db_path = "";
  var prod_name = req.body.prod_name;
  var prod_price = req.body.prod_price;
  var categ_id = req.body.categ_id;

  var client = mySqlCon.createConnection(sqlInfo);
  client.connect();
  if (!req.files)
  return res.status(400).send('No files were uploaded.');

  //The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;
  save_db_path= req.files.sampleFile.name;
  //  // Use the mv() method to place the file somewhere on your server
    sampleFile.mv('./public/edit/'+req.files.sampleFile.name, function(err) {
      if (err)
      return res.status(500).send(err);
       
    });


  client.query("INSERT INTO products(name,price,category_id,img) VALUES('" + prod_name + "','" + prod_price + "','" + categ_id + "','" + save_db_path +"')", function (err, status) {

    client.end();

    var response = {
      "status": 1,
      "msg": "row inserted",

    }
    // Handle error
    if (err) throw err;
    else {
      res.redirect('/products');
    }
  });
});

router.get('/edit/:id?', function (req, res, next) {
  var id = req.params.id;
  

  var client = mySqlCon.createConnection(sqlInfo);
  client.connect();
  client.query("SELECT * FROM products WHERE id = " + id + "", function (err, row, fields) {

    console.log("SELECT * FROM products WHERE id = " + id + "");
    
    
        client.end();
    
    
        if (err) throw err;
        else {
          var status = null;
          var data = {
            //title: 'To do list',
            results: row[0],
            status: ""
    
          };
              
          res.render("edit_product",data);
        }
      });
    });
    
router.post('/edit/:id?', function (req, res) {

  var id = req.body.id;

  var name = req.body.name;
  var price = req.body.price;
  var save_db_path = "";
  
  //var old_name = req.body.old_name;

  var client = mySqlCon.createConnection(sqlInfo);
  client.connect();

  // if (!req.files)
  // return res.status(400).send('No files were uploaded.');
  if(typeof req.files.sampleFile!== 'undefined')
  {
   // fs.unlink("./public"+req.body.hdn_img);
   if (fs.existsSync("./public"+req.body.hdn_img)) {
    
    fs.unlink("./public"+req.body.hdn_img);
  }
  //The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;
  save_db_path= req.files.sampleFile.name;
  //  // Use the mv() method to place the file somewhere on your server
    sampleFile.mv('./public/edit/'+req.files.sampleFile.name, function(err) {
      if (err)
      
      return res.status(500).send(err);
    });
    var string_update = "name ='" + name + "', price ='" + price + "', img='" + save_db_path + "'";
  }
  else
  {
    var string_update = "name ='" + name + "',price ='" + price + "'";
  }

  var q = client.query("UPDATE products SET "+string_update+"  WHERE id = " + id + "", function (err, status) {
    console.log("UPDATE products SET name ='" + name + "' WHERE id = " + id + "");
    client.end();

    var response = {
      "status": 1,
      "msg": "row updated",

    }
    // Handle error
    if (err) throw err;
    else {
      //fs.unlink("./public"+req.body.hdn_img);
      res.redirect('/products');
    }
  });
});


module.exports = router;
