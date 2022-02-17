const auth = (req,res,next)=>{
    if(req.isAuthenticated()) return next()
    req.flash("errorMessage","No esta autorizado")
    res.redirect("/signin")
    
}
module.exports = auth