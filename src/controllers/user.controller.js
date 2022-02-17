const UserControls = {}
const User = require("../models/usuariosLocal")
const bcrypt = require("bcrypt-nodejs")
const nodemailer =  require("nodemailer")
const logger=  require("../logs/log4")
const log = logger.getLogger()
const Carrito = require("../models/carrito")
const Order = require("../models/orders")
const multer = require("multer")
const uploads = multer.diskStorage({
    destination: "src/public/uploads/",
    filename:(req,file, cb)=>{
        cb(null,file.originalname)
    }
})
UserControls.Signup= async(req,res) =>{
    const  errors = []
    const {nombre,apellido,direccion,tel,email, password} = req.body
const avatar = req.file
  

if(!avatar.length === 0){
    errors.push({text:"Debes poner una imagen"})
}
    if(tel[0] !== "+"){
        errors.push({text:"El telefono tiene que tener como primer digito el simbolo +"})
    }
    
    if(tel.length < 14){
        errors.push({text:"El telefono tiene que estar compuesto por 14 digitos"})
    }
    if(password.length < 8){
        errors.push({text:"La contraseña tiene que tener al menos 8 caracteres"})
    }
   
    if(errors.length > 0){
        res.render("user/signup",{errors,nombre,apellido,direccion,email})
    }else{
        const user = await User.findOne({email})
        if(user){
            req.flash("errorS","El email ya esta en uso")
            res.redirect("signup")
    
    
        }
            const newUser  ={
                avatar:req.file.originalname,
                nombre,
                apellido,
                direccion,
                tel,
                email,
                password: encryptPass(password)
            }       
         
            console.log(newUser)
            const userR = await User.create(newUser)
            const newCart = {
            user: userR.id
            }
            await Carrito.create(newCart)
            res.redirect("/signin")
            const main = async () => {
                const transporter = nodemailer.createTransport({
                  host: 'smtp.ethereal.email',
                  port: 587,
                  auth: {
                    user: 'eula.shanahan79@ethereal.email',
                    pass: 'G5DcNVMn4z655qWS9s'
                  }
                });
                let info = await transporter.sendMail({
                  from: 'eula.shanahan79@ethereal.email',
                  to: `${email}`,
                  subject: "  Nuevo registro ✔",
                  text:`avatar:${req.body.avatar}, nombre:${req.body.nombre}, apellido:${req.body.apellido}, direccion: ${req.body.direccion}, telefono: ${req.body.tel} , email:${email}, contraseña: ${req.body.password} `, 
                  html: `
             
                  <table class="table table-hover">
                  <thead><tr>
                  <th scope="col">Avatar</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Apellido</th>
                  <th scope="col">Dirección</th>
                  <th scope="col">Telefono</th>
                  <th scope="col">Email</th>
                  <th scope="col">Contraseña</th>
                  </tr></thead>
                  <tbody>
                  <tr class="table-primary">
                  
                  <td>${userR.avatar}</td>
                  <td>${userR.nombre}</td>
                  <td>${userR.apellido}</td>
                  <td>${userR.direccion}</td>
                  <td>${userR.tel}</td>
                  <td>${userR.email}</td>
                  <td>${userR.password}</td>
                </tr> </tbody> </table>`,
                });
                log.debug("Message sent: %s", info.messageId)
               log.debug("Preview URL: %s", nodemailer.getTestMessageUrl(info))
                
              }
              main().catch(console.error)
            
          
        }
        
    }
    const encryptPass = password =>{
        const salt  =  bcrypt.genSaltSync(10)
        return  bcrypt.hashSync(password,salt,null)
      }

UserControls.Profile = async (req,res) =>{
const orders =  await Order.find({user:req.user.id,estado:"Completado"}).sort({date:-1})



 
res.render("user/profile",{user: req.user , pedidosU:orders,id:req.user.id})
}
UserControls.Logout = (req,res) =>{
req.logout()
req.flash("sucessMessage","Se ha cerrado la session correctamente")
res.redirect("/")
}
UserControls.UpdateUser  = async(req,res) =>{
    const user = await User.findById({_id:req.user.id})
  const{nombre,apellido,direccion,email, tel, avatar} = user
    if( user.id !== req.params.id ){
        req.flash("errorS","No esta autorizado")
        res.redirect("/signin")

    }
    res.render("user/edit_profile",{nombre,apellido,direccion,email,avatar, tel,id:user.id})

}
UserControls.UpdateUserP = async(req,res) =>{
    const {avatar,nombre, apellido, direccion, tel, password} =  req.body
 if(tel.length < 14){
        req.flash("errorS","El telefono tiene que estar compuesto por 14 digitos")
    }
    if(tel[0] !== "+"){
        req.flash("errorS","El telefono tiene que tener como primer digito el simbolo +")
    
    }
    if(password.length < 8){
        req.flash("errorS","La contraseña tiene que tener al menos 8 caracteres")

    }


    const user = await User.findByIdAndUpdate(req.params.id,{
        avatar,
        nombre,
        apellido,
        direccion,
        tel,
        
        password: encryptPass(password)
    })
    req.flash("successMessage",`El usuario se actualizo con éxito`)
    res.redirect("/profile")
} 

module.exports =  UserControls, uploads