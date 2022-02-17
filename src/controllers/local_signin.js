const passport  = require("passport")

const LocalStrategy = require("passport-local").Strategy
const User = require("../models/usuariosLocal")


passport.use("signin",new LocalStrategy({
    usernameField:"email",
},
async(email,password,done)=>{
const user = await User.findOne({email:email})
if(!user){
    return done(null,false,{message:"El email ingresado no pertenece a un usuario existente"})
}
const match = await user.comparePassword(password)
if(!match){
    return done(null,false,{message:"Contraseña incorrecta"})
}
return done(null,user,{message:"Registrado "})
}
   ))

passport.serializeUser((user,done)=>{
    return done(null, user.id)
})
passport.deserializeUser((id,done)=>{
    User.findById(id ,(err,user)=>{
        done(err,user)
    })
})