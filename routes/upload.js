
var express = require('express');
var router = express.Router();
var fileUpload = require('express-fileupload');


router.get('/',function(req,res,next){

  res.render('upload');
})

router.post('/', function (req, res, next) {
  if (!req.files)
  return res.status(400).send('No files were uploaded.');

  //The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;

  //  // Use the mv() method to place the file somewhere on your server
    sampleFile.mv('D:/ecomweb/upload/'+req.files.sampleFile.name, function(err) {
      if (err)
       return res.status(500).send(err);
      var save_db_path = req.files.sampleFile.name;
      
     res.send('File uploaded!');
  
});

//res.render('upload');
});


module.exports = router;


/* GET users listing. */
//router.get('/upload', function(req, res, next) {

    //    if (!req.files)
    //     return res.status(400).send('No files were uploaded.');

    //  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    //   let sampleFile = req.files.sampleFile;

    //  // Use the mv() method to place the file somewhere on your server
    //   sampleFile.mv('D:/ecomweb/upload/'+req.files.sampleFile.name, function(err) {
    //     if (err)
    //       return res.status(500).send(err);

    //    //res.send('File uploaded!');
       //res.render('upload');
      //});

//});



