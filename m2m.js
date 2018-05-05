var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

//read config
var propertiesreader = require("properties-reader");
var properties = propertiesreader("./conf/m2m.properties");

//init vars
var listenport = properties.path().listenport;

//init loggger
var logpath = properties.path().log.path;
var logpname = properties.path().log.name;
var logmaxsize = properties.path().log.maxsize.kb;
// var logger = require('./util/logutil')(logpath, logpname, logmaxsize);

//init index
var indexpath = properties.path().index.path;
var index = require('./routes/index')(indexpath);

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false}));


app.use('/', index);

//set port
app.set('port', listenport);
app.listen(app.get('port'), function(){
    console.log('Server started on port ' + app.get('port'));
});