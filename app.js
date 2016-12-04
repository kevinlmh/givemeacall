var express = require('express');
var twilio = require('twilio');
var bodyParser = require('body-parser');

var app = express();

app.set('port', (process.env.PORT || 3000));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
    res.end("What are you doing here? You shouldn't be here");
});

app.post('/voice', function(req, res) {
    console.log('received voice request');
    console.log(req.body);
});

app.post('/sms', function(req, res) {
    console.log('received sms request');
    console.log(req.body);
});

app.listen(app.get('port'), function() {
    console.log('app started on port', app.get('port'));
});