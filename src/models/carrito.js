const {Schema,model} = require("mongoose")
const dotenv = require("dotenv")


dotenv.config()

const CartSchema = new Schema({

productos:{
    type:Schema.Types.ObjectId,
    ref:"productos"
    
  
},
cantidad:{
type: Number,
default: 1
},
user:{
  type: String
  
},
precioCart:{
  type: Number
}

      
}

)
CartSchema.plugin(require("mongoose-autopopulate"))

 const Carrito = model(process.env.DB_COLLECTION_3, CartSchema)
 module.exports = Carrito