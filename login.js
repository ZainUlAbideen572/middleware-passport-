const express=require('express')
const app=express()
const port=4000
const bodyparser=require('body-parser')
const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/middleware')
const UserModel=require('./config/UserModel')
const bcrypt =require('bcrypt')
const cors=require('cors')
var passport=require('passport')
require('./config/passport')
const jwt=require('jsonwebtoken')
// app.use(express.Urlencoded({extended:true}))
app.use(express.json()) 
app.use(cors())  
app.use(passport.initialize())
 app.post('/register',(req,res)=>{
    const user=new UserModel({
        username:req.body.username,
        password:bcrypt.hashSync(req.body.password,5)
       
    })
    user.save().then(user=>
        {
            res.send({
                succcess:true,
                messages:"created successfully",
                user:{
                    id:user._id,
                    username:user.username
                }
            })
        }).catch(err=>
            {
            res.send({
                message:"something went wrong ",
                error:err
            })
        })
    })  
    app.post('/login',(req,res)=>{
        UserModel.findOne({username:req.body.username}).then(user=>{
            if(!user){
                return res.status(401).send({
                    succcess:'false',
                    message:"invalid user"
                })
            }
            if(!bcrypt.compareSync(req.body.password,user.password)){
                return res.status(401).send({
                    succcess:'false',
                    message:"invalid password"
                })
            }
            const payload={
                username:user.username,
                id:user._id
            }
            const token=jwt.sign(payload,'Random string',{expiresIn:'1d'})
            return res.status(200).send({
                succcess:'true',
                // message:"invalid password"
                token:'Bearer'  +token
            })
            
        })
    })  
    app.get('/Protected',passport.authenticate('jwt',{session:false}),(req,res)=>{
        return  res.status(200).send({
            success:true,
            user:{
                id:req.user._id,
                username:req.user.username
            }
        })
    })                                
app.listen(port,()=>{
    console.log('server is running on'+port)
})