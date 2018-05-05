var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mkdirp = require('mkdirp');

//read config
var propertiesreader = require("properties-reader");
var properties = propertiesreader("./conf/m2m.properties");

//init vars
var listenport = properties.path().listenport;

//init loggger
var logpath = properties.path().log.path;
var logpname = properties.path().log.name;
var logmaxsize = properties.path().log.maxsize.mb;
var logdateformat = properties.path().log.dateformat;

//winston can't create dir, so let's make one
mkdirp(logpath, function (err) {
    if (err) console.error(err)
    else console.log("directory " + logpath +  "created")
});

var logger = require('./util/logutil')(logpath, logpname, logmaxsize, logdateformat);

logger.writeinfo("Starting up...");

//init index
var indexpath = properties.path().index.path;
var index = require('./routes/index')(indexpath, logger);

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false}));


app.use('/', index);

//set port
app.set('port', listenport);
app.listen(app.get('port'), function(){
    console.log('Server started on port ' + app.get('port'));
});