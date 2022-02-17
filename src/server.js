const express = require("express")
const {engine } = require("express-handlebars")
const path = require("path")
const dotenv = require("dotenv")
const session = require("express-session")
const passport = require("passport")
const morgan = require("morgan")
const flash = require("connect-flash")
const {allowInsecurePrototypeAccess} = require("@handlebars/allow-prototype-access")
const Handlebars = require("handlebars")
const logger = require("log4js")


const method_override = require("method-override")

//initialize
const app = express()
dotenv.config()
require("./config/db")
require("./controllers/local_signin")

require("./controllers/google.controller")

dotenv.config()
const log = logger.getLogger()

//settings
app.set("views", path.join(__dirname,"views"))
app.set("port",process.env.PORT  || 8080)
app.engine(".hbs" ,engine({
    defaultLayout: "main.hbs",
    layoutsDir: path.join(app.get("views"),"layouts"),
    partialsDir: path.join(app.get("views"),"temp"),
    extname: ".hbs",
    handlebars: allowInsecurePrototypeAccess(Handlebars)

}))
app.set("view engine" ,".hbs")

//middleware
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(session({
    secret: "ffkenfiefg",
    resave: true,
    saveUninitialized: true,
    maxAge: 220000
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use(method_override("_method"))


//global variables
app.use((req,res,next) =>{
    res.locals.success_msn = req.flash("sucessMessage")
    res.locals.error_MSM = req.flash("errorS")
   res.locals.carrito = req.carrito || null
    res.locals.user = req.user || null

    next()
} ) 


//Static files
app.use(express.static(path.join(__dirname,"public")))

//routers
app.use(require("./routers/index.router"))
app.use(require("./routers/products.router"))
app.use(require("./routers/user.router"))
app.use(require("./routers/cart.router"))
app.use(require("./routers/orders.router"))


//listening server
 app.listen(`${app.get("port")}`,() =>{
        log.debug(`Server num: ${process.pid} on port ${process.env.PORT}`)
        })
  

