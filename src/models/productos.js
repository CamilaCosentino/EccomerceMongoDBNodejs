const { Schema,model} = require("mongoose")

const productos = new Schema({
    titulo:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
   
    precio:{
        type: Number,
        required: true
    },
    stock:{
        type: Number,
        required: true
    },
    sku:{
        type: String,
        required: true
    },
    img:{
        type: String, 
    },
    categoria:{
type: String,
required: true
    }
})

const Productos = model('productos' , productos)
module.exports = Productos