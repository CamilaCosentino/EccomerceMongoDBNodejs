const {Schema,model} = require("mongoose")

const UsuarioG = new Schema({
    googleID:{
        type: String,
        required: true
    },
    displayName:{
        type: String,
        required: true
    },
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    image:{
        type: String
    }
},{
    timestamps: true
}
)
module.exports = model("usuarioG", UsuarioG)