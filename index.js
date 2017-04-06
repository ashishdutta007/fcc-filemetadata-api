var app = require('./server/server.js').app;
var port = process.env.PORT || 3000;

console.log('Inside index.js');

//Express server listening on port 3000
app.listen(port, function(error) {
    if (error) {
        return console.log('Error occurred', error);
    } else {
        console.log('Express Server listening on port ' + port);
    }
});
