const {Schema,model} = require("mongoose")
const bcrypt = require("bcrypt-nodejs")
const { schema } = require("./carrito")
const Usuarios = new Schema({
    avatar:{
        type: String,
        required: true
    },
    nombre:{
        type: String,
        required:true
    },
    apellido:{
        type: String,
        required: true
    },
    direccion:{
        type: String,
        required: true,
    },
    tel:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
        
    },
    password:{
        type: String,
        required: true
    }
   
  
    
},{
    timestamps:true
})
Usuarios.methods.hashPassword = async password =>{
    const salt =  await bcrypt.genSaltSync(10)
    return await  bcrypt.hashSync(password, salt)
     
  }
Usuarios.methods.comparePassword = async function(password){
    return await bcrypt.compareSync(password,this.password)
}


module.exports = model(process.env.DB_COLLECTION_1 ,Usuarios)