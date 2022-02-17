const passport = require("passport")
const dotenv = require("dotenv")
const User =  require("../models/userGoogle")
const log4 =  require("log4js")
const log = log4.getLogger()
dotenv.config()
var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/google/callback"
  },
  async(accessToken, refreshToken, profile, done) => {
  const newUser ={
    googleID: profile.id,
    displayName: profile.displayName,
    firstName: profile.name.givenName,
    lastName: profile.name.familyName,
    image: profile.photos[0].value
  }
  try {
      let user  = await User.findOne({googleID: profile.id})
      if(user){
        return done(null,user)
      }else{
        user =  await User.create(newUser)
        return done(null,user)
      }
  } catch (err) {
      log.error("No se pudo iniciar sesion con Google" , err)
  }
  }
));
passport.serializeUser((user,done)=>{
    return done(null, user.id)
})
passport.deserializeUser((id,done)=>{
    User.findById(id ,(user)=>{
        done(null,user)
    })
})

