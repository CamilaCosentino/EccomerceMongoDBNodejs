const logger = require("log4js")

const Carrito = require('../models/carrito')
const Producto = require('../models/productos')
const log = logger.getLogger()
const CartCtl = {}
CartCtl.renderCart = async(req,res,next) =>{
  let  CarritoUser = await Carrito
  .find({user:req.user.id})
  .populate("productos")

const DatosA = () =>{
let titulo = null
let id = null
let img = null
let precioCart = null
let cantidad = null
let precioT = 0
let prodA =[]
   CarritoUser.forEach(element => {
    
    id = element.id
    titulo = element.productos.titulo
    img = element.productos.img
    precioCart = element.precioCart
    cantidad = element.cantidad
    precioT += precioCart
    let prods = {
      id, 
      titulo,
      img,
      precioCart,
      cantidad,

    }
    prodA.push(prods)
 
   });

   return {prodA, precioT}

  }


const array = DatosA().prodA
const precio = DatosA().precioT

res.render("cart/cart",{data:array,precio}) 
  
}
CartCtl.addCart = async(req,res) =>{

  const findP =  await Producto.findById({_id:req.body.id})
  const newP = {
    productos:findP._id, 
    precioCart: findP.precio,
    user: req.user.id
  }

  
  
  const C = await Carrito.create(newP)

   res.redirect('/cart')


  
}
CartCtl.updateS = async(req,res) =>{

const cartS = await Carrito.findById({_id:req.params.id})
const cantidad  = cartS.cantidad + 1
const id = cartS.productos

const P = await Producto.findById({_id:id})
const precio = P.precio * cantidad
await Carrito.updateOne({_id:cartS._id},{cantidad:cantidad,precioCart: precio})
res.redirect("/cart")


}
CartCtl.updateR = async(req,res) =>{

  const cartS = await Carrito.findById({_id:req.params.id})
  const cantidad  = cartS.cantidad - 1
  const id = cartS.productos
  
  const P = await Producto.findOne({_id:id})
  const precio = P.precio / 1
  await Carrito.updateOne({_id:cartS._id},{cantidad:cantidad,precioCart: precio})
  res.redirect("/cart")
  
  
  }
CartCtl.deleteI =async(req,res) =>{
const id = req.params.id
log.info(id)
await Carrito.findByIdAndDelete({_id:id})
res.redirect("/cart")
}

module.exports = CartCtl