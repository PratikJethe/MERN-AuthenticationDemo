const jwt = require('jsonwebtoken')
const config = require('config');

module.exports= function(req,res,next){
    const token = req.cookies.token
console.log(token) 
   if(!token){
       return  res.status(400).json({errors:[{msg:'NO TOKEN'}]})
    }
    try {
        const decoded = jwt.verify(token,config.get('JWT_SECRET'))
        req.user = decoded.user;
        next()
    } catch (error) {
        return res.status(401).json({errors:[{msg:'TOKEN NOT VALID'}]})
    }
}