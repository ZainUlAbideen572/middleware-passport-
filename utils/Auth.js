function tokenauth(req,res,next){
    const tokens=req.headers.authorization.split()
    const authtokens=tokens[0]
    const valid=jwt.verify(authtokens,'secret')
    if(valid){
        next()
    }else{
        res.status(400)
        res.send('error')
    }
}
module.exports={
    tokenauth
}