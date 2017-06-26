var express = require('express');
var app = express();
var path = require('path');
var moment = require('moment');
moment().format();
var chrono = require('chrono-node');

var object;

function dateChecker (date) {
    console.log(chrono.parseDate(date));
    if (isNaN(date)===false) {
        object = {
           unix: date,
           natural: moment.unix(date).format("MMM Do, YYYY")
       }; 
    }
    else if (Boolean(chrono.parseDate(date))!== false ) {
        var newdate = date.replace(/%20/g, '');
        console.log(newdate);
          object = {
        unix: Date.parse(chrono.parseDate(newdate)),
        natural: moment(chrono.parseDate(newdate)).format("MMM Do, YYYY")
    }
}
else {
    object = {
        unix: null,
        natural: null,
    };
}
}

app.get('/', function(req,res) {
    res.sendFile(path.join(__dirname, './time.html'));
});

app.get('*', function(req, res) {
    var date = req.path.substr(1); 
    dateChecker(date);
    res.send(object);
});
app.listen(process.env.PORT||8080);
