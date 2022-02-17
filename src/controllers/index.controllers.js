const indexControl = {}
const Productos  = require("../models/productos")
const Carrito =  require("../models/carrito")
 indexControl.renderIndex = async (req,res) =>{
   const all = await Productos.find()
  
 

      res.render("index",{ todo:all})
  

 
    }

 
 indexControl.renderAbout = async (req,res) =>{
     
   if(req.user == undefined){
      res.render("about")
  }else{

      
      res.render("about")
  }
    
 
    }


 indexControl.renderContact = async (req,res) =>{

      

       if(req.user == undefined){
           res.render("contact")
       }else{
           const carrito = await Carrito.findOne({user:req.user.id}).sort({date:-1})
           const existPro = carrito.producto_id
           const u = existPro.length === 0
           res.render("contact",{ pedidos: existPro, carrito:carrito, data: u})
       }
 }


module.exports = indexControl