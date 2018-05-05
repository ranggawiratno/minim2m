var winston = require("winston");

module.exports = function(_logpath, _logname, _maxsize){
    var fname = _logpath + _logname
    console.log(fname);

    var options = {
        infolog: {
            level: "info",
            filename: fname + ".info",
            handleExceptions: true,
            json: true,
            maxsize: _maxsize,
            colorize: false
        },
        errorlog: {
            level: "error",
            filename: fname + ".error",
            handleExceptions: true,
            json: true,
            maxsize: _maxsize,
            colorize: false
        },
        console: {
            level: "debug",
            handleExceptions: true,
            json: false,
            colorize: true
        }
    }

    var logger = new winston.Logger({
        transports: [
            new winston.transports.File(options.infolog),
            new winston.transports.File(options.errorlog)
            //new winston.transports.Console(options.console)
        ],
        exitOnError: false
    });

    return logger;
}