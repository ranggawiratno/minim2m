var winston = require("winston");
var moment = require("moment");

module.exports = function(_logpath, _logname, _maxsize, _dateformat){
    var logger = null;
    var fname = _logpath + _logname
    console.log(fname);
    
    var timeStampFormat = () => moment().format(_dateformat).trim();
    console.log(timeStampFormat);

    var options = {
        infolog: {
            level: "info",
            timestamp: timeStampFormat,
            filename: fname + ".info",
            handleExceptions: true,
            json: false,
            maxsize: _maxsize * 1024* 1024,
            colorize: false
        },
        errorlog: {
            level: "error",
            timestamp: timeStampFormat,
            filename: fname + ".error",
            handleExceptions: true,
            json: false,
            maxsize: _maxsize * 1024 * 1024,
            colorize: false
        },
        console: {
            level: "debug",
            handleExceptions: true,
            json: false,
            colorize: true
        }
    }

    try{
        logger = new Logger();
        logger.setInfoLoggers(options.infolog, options.console);
        logger.setErrorLoggers(options.errorlog, options.console);
    }catch(err){
        console.log(err);
    }

    return logger;
}

class Logger{
    constructor(_loginfo, _logerror){
        this.loginfo = _loginfo;
        this.logerror = _logerror;
    }

    setInfoLoggers(infoconf, consoleconf){
        this.loginfo = new winston.Logger({
            transports: [
                new winston.transports.File(infoconf),
                new winston.transports.Console(consoleconf)
            ],
            exitOnError: false
        }); 
    }
    
    setErrorLoggers(errorconf, consoleconf){
        this.logerror = new winston.Logger({
            transports: [
                new winston.transports.File(errorconf),
                new winston.transports.Console(consoleconf)
            ],
            exitOnError: false
        }); 
    }
    
    writeinfo(message){
        if(null != this.loginfo){
            this.loginfo.info(message);
        }else{
            console.log(message);
        }
    }
    
    writererror(message){
        if(null != this.logerror){
            this.logerror.error(message);
        }else{
            console.error(message);
        }
    }
}