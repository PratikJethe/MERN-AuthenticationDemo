const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config')
const secretKey = config.get('JWT_SECRET')
const authMiddleware = require('../middleware/authMiddleware')
const {check,validationResult} = require('express-validator')
const User = require('../models/User')


router.post('/register',[
    check('name','Name is Required').not().isEmpty(),
    check('email').not().isEmpty().withMessage('EMAIL REQUIRED').isEmail().withMessage('INVALID EMAIL'),
    check('password','Length Should be More than 5').isLength({
        min:6
    })

],async (req,res)=>{
    const errors =  validationResult(req)
    const {name,email,password} = req.body
    console.log(name,email,password)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    // const user = User({
    //     name:name,
    //     email:email,
    //     password:password
    // })


try {
      const srchuser = await User.findOne({email:email}).select('-password')
      console.log(srchuser)
      if(srchuser){
        return res.status(400).json({errors:[{msg:"USER ALREADY REGISTERD"}]})
      }
      const user = User({
        name:name,
        email:email,
        password:password
    })

      const salt =  await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password,salt)

      await user.save()
      const payload = {
          user:{
              id:user.id
          }
      }
      jwt.sign(payload,secretKey,{
          expiresIn:36000000
      },
      (err,token)=>{
          if(err){
              throw err
          }
       res.cookie('token', token, {
            
            // expires: new Date(Date.now() + expiration),
            maxAge:1000*60*2,
            httpOnly: true,
          });

          return res.json({msg:'SUCCESS_REGISTER'})
      }
      )
} catch (error) {
    console.log(error)
   return res.status(500).json({errors:[{msg:'SERVER ERROR'}]})
}
 

})


router.post('/login',[
    check('email').not().isEmpty().withMessage('EMAIL REQUIRED').isEmail().withMessage('INVALID EMAIL'),
    check('password','INVALID PASSWORD').not().isEmpty()
],async (req,res)=>{
   const errors = validationResult(req)

  if(!errors.isEmpty()){
      return res.status(400).json({errors:errors.array()})
  }
  const {email,password} =req.body;

  try {
      const srchuser = await User.findOne({email:email})
      if(!srchuser){
          return res.status(400).json({errors:[{msg:"INVALID CREDENTIALS"}]})
      }
      
      const payload ={
          user:{
              id:srchuser.id
          }
      }
      const isMatch = await bcrypt.compare(password,srchuser.password)

      if(!isMatch){
        return  res.status(400).json({errors:[{msg:"INVALID CREDENTIALS"}]}) 
      }


      jwt.sign(payload,secretKey,{
        expiresIn:36000000
    },
    (err,token)=>{
        if(err){
            throw err
        }
        res.cookie('token', token, {
            
            // expires: new Date(Date.now() + expiration),
            maxAge:1000*60*100,
            httpOnly: true,
          });


       return  res.json({msg:'SUCCESS_LOGIN'})

    }
    )
      

  } catch (error) {
      console.log(error)
      return res.status(500).json({errors:[{msg:"SERVER_ERROR"}]})
  }



})

router.get('/',authMiddleware,async(req,res)=>{
    try {
        console.log(req.user)
        const user = await User.findById(req.user.id).select('-password')
        return res.json(user)
    } catch (error) {
        console.log(error)
        return res.status(500).json({errors:[{msg:'SERVER_ERROR'}]})
    }
})

router.get('/logout',authMiddleware,async(req,res)=>{
    res.cookie('token', 'EXPIRED TOKEN', {
            
        expires: new Date(Date.now()-1),
        httpOnly: true,
      });
try {
    res.json({
        errors:[
            {
                msg:"LOGOUT SUCCESS"
            }
        ]
    })
} catch (error) {
    console.log(error)
    res.json({
        errors:[
            {
                msg:"SERVER_ERROR"
            }
        ]
    })
}
   
})
module.exports =  router