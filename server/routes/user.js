const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 12;
const User = require('../db/models/User');


router.put('/settings', (req,res)=>{
  let id = req.user.id
  let {oldPass,newPass} = req.body;
  return User
  .where({id})
  .fetchAll()
  .then(user=>{
    bcrypt.compare(oldPass, user.models[0].attributes.password)
    .then(result=>{
      if(result){
        bcrypt.genSalt(saltRounds, (err,salt)=>{
          bcrypt.hash(newPass, salt, (err, hashedPassword)=>{
            if(err){
              return res.status(500)
            }
            return User.where({id})
            .save({password: hashedPassword}, {patch: true})
            .then(user=>{
              res.json({message: 'success'})
            })
          })
        })
      }else {
        res.json({message: 'wrong existing password'})
      }
    })
  })
})

module.exports = router;