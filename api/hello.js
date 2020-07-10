const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
router.get('/hello',authMiddleware,(req,res)=>{
   return res.send('HELLO')
})

module.exports =  router