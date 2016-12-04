var express = require('express');
var twilio = require('twilio');

var app = express();

app.set('port', (process.env.PORT || 3000));

app.get('/', function(req, res) {
    res.end("What are you doing here? You shouldn't be here");
});

app.listen(app.get('port'), function() {
    console.log('app started on port', app.get('port'));
});