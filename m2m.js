var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var propertiesreader = require("properties-reader");

var properties = propertiesreader("./conf/m2m.properties");
var indexpath = properties.path().indexpath;

// var index = require('./routes/index')
var index = require('./routes/index')(indexpath);

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false}));


app.use('/', index);

//set port
app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), function(){
    console.log('Server started on port ' + app.get('port'));
});