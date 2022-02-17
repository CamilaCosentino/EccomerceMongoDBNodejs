const Producto = require("../models/productos")
const Carrito = require("../models/carrito")
const Order =require("../models/orders")
const nodemailer = require("nodemailer")
const dotenv = require("dotenv")
const logger = require("log4js")
dotenv.config()
const log = logger.getLogger()
const OrderCtl = {}
OrderCtl.saveOrds = async(req,res) =>{
const CarT = await Carrito
.find({user:req.user.id})
.populate("productos")

console.log(CarT);
const ProdO= () =>{
  let titulo = null
  let precioC = null
  let cantidad = null
  let stock = null
  let img = null
  let precioT = null
  let id = null
  let cartO = []
CarT.forEach(async element => {
titulo = element.productos.titulo
img = element.productos.img
cantidad = elemenst.cantidad
stock = element.productos.stock - cantidad
precioC = element.precioCart
precioT += precioC
id = element.productos._id
cartO.push({
  id,
  titulo,
  img,
  cantidad,
  precioC

})


});
return {cartO,titulo , cantidad,stock, precioT,precioC, id}

}
const datos = ProdO().cartO
const titulo = ProdO().titulo
const stock = ProdO().stock
const cantidad = ProdO().cantidad
const precioC = ProdO().precioC
const precioT = ProdO().precioT
const id = ProdO().id
await Producto.findByIdAndUpdate({_id:id},{stock})
const newO = {
  products: datos,
  user: req.user.id,
  precioTodal: precioT,
  estado:"Completado"
}
const order = await Order.create(newO)

 async function main() {
  
    let testAccount = await nodemailer.createTestAccount();
  
   
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    });
  log.warn(datos)
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: `${req.user.email}`, // list of receivers
      subject: "Nuevo Pedido", // Subject line
      html: `<h1>Numero de orden:${order.n_pedido}</h1> <p>Fecha: ${order.date} </p>
      <h2> Productos </h2> <span>x${cantidad}</span>  <h3>${titulo}</h3>  <p>$${precioC}</p> <span>Precio total: ${order.precioTodal}</span>`   , 
   
    });
    
    console.log("Message sent: %s", info.messageId);

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
   
  }
  
  main().catch(console.error);
  const accountSid = process.env.TWILIO_ACCOUNTID
const authToken = process.env.TWILIO_AUTHTOKEN; 
const client = require('twilio')(accountSid, authToken); 
 
client.messages 
      .create({         
        
         body: `Numero Pedido: ${order.n_pedido} - Products-`,
         messagingServiceSid: 'MGfb65e13e9a2481627b33cc81fc1add22',
         to: `${req.user.tel}` 
       }) 
      .then(message => console.log(message.sid)) 
      .done();
      const client2 = require('twilio')(accountSid, authToken); 
client2.messages
      .create({
         from: 'whatsapp:+14155238886',
         body:`Numero Pedido: ${order.n_pedido} - Products: Titulo:${titulo} - Cantidad de unidad: ${cantidad} - Precio Unitario: $ ${precioC}  -Precio total:$ ${order.precioTodal}`, 
         to: `whatsapp:${req.user.tel}`
       })
      .then(message => console.log(message.sid));
res.redirect("/profile")

}
OrderCtl.delelreOrd = async(req,res) =>{
  const id = req.params.id
 await Order.findByIdAndDelete({_id:id})
 req.flash('sucessMessage' ,'La orden se eliminó correctamente')
  res.redirect("/profile")

}
OrderCtl.viewO = async(req,res) =>{
  const id = req.params.id 
 const orderD = await Order.findById({_id:id})
 
 const p = orderD.products
 console.log(p);

 console.log(orderD)

 res.render('cart/pedidoD',{order:orderD, prod:p})
}









module.exports = OrderCtl