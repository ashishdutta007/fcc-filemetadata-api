var express = require('express');
var multer = require('multer');
var app = express();

app.use('/', function(request, response, next) {
    console.log('Request for file metadata microservice');
    request.on('error', function(error) {
        return console.log('Error occurred', error);
    });
    response.on('error', function(error) {
        return console.log('Error occurred', error);
    });
});

app.post('/upload', function(request, response) {
	
});

module.exports.app = app;
