const logger = require("log4js")

logger.configure({
    appenders:{
        logConsole: {type:"console"},

    
    },
    categories:{
  
        default:{appenders:['logConsole'],level:"all"},
       

    }

})



module.exports =  logger