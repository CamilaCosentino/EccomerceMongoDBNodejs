const {Schema,model} = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()
const ORDER = new Schema({
    n_pedido:{
        type: Number,
        default: Math.round(Math.random() * 100000 ) + 1 ,
        
        },
          date:{
            type:Date,
            default: Date.now(),
            required: true
        },
    user:{
        type:String
    },
        products:{
        type: Schema.Types.Array
    },
    precioTodal:{
        type: Number

    },
    estado:{
        type: String,
        default:"En proceso"
      }



})

module.exports = model("orders", ORDER)