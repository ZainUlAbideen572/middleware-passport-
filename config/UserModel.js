const mongoose=require('mongoose')
const schema=new mongoose.Schema({
    username:String,
    password:String,
    email:{type:String}
})
const model=new mongoose.model('credentials',schema)
module.exports=model;