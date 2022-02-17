const mongoose = require("mongoose")
const mongodb = require("./key")
const logger = require("../logs/log4")
const Logs =logger.getLogger()
mongoose.connect(mongodb.URL,{
    useUnifiedTopology: true,
    useNewUrlParser:true
})

.then((mongodb) =>{Logs.debug("Base de datos conectada exitosamente")})
.catch((err) =>{Logs.warn("No se pudo conectar a la base de datos" + err)})

