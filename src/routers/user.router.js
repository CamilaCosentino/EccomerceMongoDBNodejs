const {Router} =  require("express")
const router = Router()

const passport = require("passport")
const path = require("path")


const {
    Signup,
    Profile,
    Logout,
    UpdateUser,
    UpdateUserP,
    uploads
} =require("../controllers/user.controller")

const auth =require("../controllers/auth.controller")
const multer = require("multer")



router.get("/signin",(req,res) =>{
    res.render("user/signin")
 
})
router.get("/signup", (req,res) =>{
    res.render("user/signup")
})

router.post("/signin",passport.authenticate("signin",{
    successRedirect:"/profile",
    failureRedirect:"/signin",
    failureFlash:true,
 
    
}))
router.post("/signup",multer({
  uploads
}).single("avatar"),Signup) 
router.get("/profile",auth,Profile)
router.get("/logout",auth,Logout)
//Proximamame
/*
router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/signin' }),
  function(req, res) {
  
    res.redirect('/');
  });*/
router.get("/updateUser/:id", auth , UpdateUser)
router.put("/updateUser/:id",multer({
    uploads
}).single("imagen"), UpdateUserP )
module.exports =  router