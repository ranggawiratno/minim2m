var express = require('express');
var router = express.Router();
var myindexpath = "/";

module.exports = function(_indexpath, _logger){
    var router = express.Router();
    var logger = _logger;

    myindexpath += _indexpath;
    router.get(myindexpath, function(req, res){
        var username = req.query.username;
        var password = req.query.password;
        var sender = req.query.sender;
        var msisdn = req.query.msisdn;
        var message = req.query.message;
        
        res.send(processRequest(username, password, sender, msisdn, message));
    });
    
    router.post(myindexpath, function(req, res){
        var username = req.body.username;
        var password = req.body.password;
        var sender = req.body.sender;
        var msisdn = req.body.msisdn;
        var message = req.body.message;
    
        res.send(processRequest(username, password, sender, msisdn, message));
    });
    return router;
};

function processRequest(username, password, sender, msisdn, message) {
    var response = username + " "
                 + password + " " 
                 + sender + " " 
                 + message;
    return response;
};