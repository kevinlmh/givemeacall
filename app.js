var express = require('express')
var twilio = require('twilio')

var app = express()


app.get('/', function(req, res) {
    res.end("What are you doing here? You shouldn't be here")
})

app.listen(5000, function() {
    console.log('app started on port 5000')
})