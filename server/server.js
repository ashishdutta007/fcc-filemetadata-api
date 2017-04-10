//Import express module
var express = require('express');
//Import multer module
var multer = require('multer');
var app = express();

console.log('Inside server.js');

//To create diskStorage to store uploaded files
var storage = multer.diskStorage({
    //destination folder to store files
    destination: function(request, file, callback) {
        callback(null, 'tmp/uploads');
    },
    //filename to be assigned to the uploaded file
    filename: function(request, file, callback) {
        callback(null, file.originalname + '-' + Date.now());
    }
});

//Create multer middleware with storage options
//without the options object the files will be kept in memory
var upload = multer({ storage: storage });

//Logging all incoming requests
app.use('/', function(request, response, next) {
    console.log('Request for file metadata microservice');
    request.on('error', function(error) {
        return console.log('Error occurred', error);
    });
    response.on('error', function(error) {
        return console.log('Error occurred', error);
    });
    next();
});

//Path u provide to express.static() is relative to the directory from where you launch node process
//Serve static files from static express server
app.use('/', express.static('client'));

//post endpoint
//pass every request to this endpoint via multer middleware
app.post('/upload', upload.single('data'), function(request, response) {
    request.on('error', function(error) {
        return console.log('Error occurred', error);
    });
    response.on('error', function(error) {
        return console.log('Error occurred', error);
    });
    //check file availability
    if (request.file) {
        console.log(request.file.originalname);
        response.status(200).json({
            filename: request.file.originalname,
            size: request.file.size,
            type: request.file.mimetype
        });
    } else {
        return console.log("No file found");
        response.status(500).json({ error: "No file was provided in the 'data' field" });
    }
});

module.exports.app = app;
