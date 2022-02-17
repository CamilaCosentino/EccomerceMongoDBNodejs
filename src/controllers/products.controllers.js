const ProductosCtl = {}
const Productos =require("../models/productos")
const Carrito = require("../models/carrito")
ProductosCtl.renderniños =async (req,res) =>{
const nenes = await Productos.find({"categoria": "Niños"})
if(req.user == undefined){
    res.render("products/productosninos",{Productos:nenes})
}else{
    const carrito = await Carrito.findOne({user:req.user.id}).sort({date:-1})
    const existPro = carrito.producto_id
    const u = existPro.length === 0
    res.render("products/productosninos",{Productos:nenes, pedidos: existPro, carrito:carrito, data: u})
}


}

ProductosCtl.renderMujeres =async (req,res) =>{
    const mujer = await Productos.find({"categoria": "Mujer"})
   
if(req.user == undefined){
    res.render("products/productosmujer",{Productos:mujer})
}else{
    const carrito = await Carrito.findOne({user:req.user.id}).sort({date:-1})
    const existPro = carrito.producto_id
    const u = existPro.length === 0
    res.render("products/productosmujer",{Productos:mujer, pedidos: existPro, carrito:carrito, data: u})
}



    

    }
    ProductosCtl.renderHombres =async (req,res) =>{
        const hombre = await Productos.find({"categoria": "Hombre"})
        if(req.user == undefined){
            res.render("products/productoshombre",{Productos:hombre})
        }else{
            const carrito = await Carrito.findOne({user:req.user.id}).sort({date:-1})
            const existPro = carrito.producto_id
            const u = existPro.length === 0
            res.render("products/productoshombre",{Productos:hombre, pedidos: existPro, carrito:carrito, data: u})
        }
        
      
        

        }
module.exports = ProductosCtl