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
    res.end(`<html>
        <head>
            <title>Give me a call</title>
        </head>
        <body>
            <form action='/sms'>
                <input name='From'>
                <input type='submit' value="Call me!">
            </form>
        </body>
    </html>`);
});

app.get('/voice', function(req, res) {
    res.set('content-type', 'text/xml');
    res.end(`<?xml version="1.0" encoding="UTF-8" ?> 
            <Response>
            <Say>Thanks for using call me. You are very welcome!</Say>
            <Play>http://demo.twilio.com/docs/classic.mp3</Play>
            </Response>`);
});

app.post('/sms', function(req, res) {
    console.log('sms from',req.body.From, 'content', req.body.Body);
    if (req.body.Body == "call me") {
        client.calls.create({
            url: "https://givemeacall.herokuapp.com/voice",
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

app.get('/')

app.listen(app.get('port'), function() {
    console.log('app started on port', app.get('port'));
});