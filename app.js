var express = require('express');
var twilio = require('twilio');
var bodyParser = require('body-parser');

var accountSid = process.env.accountSid;
var authToken = process.env.authToken;
var client = new twilio.RestClient(accountSid, authToken);

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
    console.log('sms from',req.body.From, 'content', req.body.Body);
    if (req.body.Body == "call me") {
        client.calls.create({
            url: "http://demo.twilio.com/docs/voice.xml",
            to: req.body.From,
            from: "+14158013021",
        }, function(err, call) {
            process.stderr.write(call.sid);
        });
    } else {
        res.set('content-type', 'text/xml');
        res.end(`<?xml version="1.0" encoding="UTF-8" ?> 
            <Response>
                <Message>Usage: send 'call me' to call this number or send 'call #number' to call another number.</Message>
            </Response>`);
    }
});

app.listen(app.get('port'), function() {
    console.log('app started on port', app.get('port'));
});