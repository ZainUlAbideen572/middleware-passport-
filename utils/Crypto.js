const bcrypt=require('bcrypt')
const gethash=(plaintext)=>{
    return bcrypt.hash(plaintext,5)
}
const verify=(plaintext,hash)=>{
    return bcrypt.compare(plaintext,hash)
}
module.exports={
    gethash,verify
}