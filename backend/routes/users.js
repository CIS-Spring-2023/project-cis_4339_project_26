// route for the users
const express = require('express')
const router = express.Router()

const org = process.env.ORG

//importing data model schemas
const { users } = require('../models/models')

//POST 
router.post('/', (req, res, next) => {
    
    let user = req.body.UserName
    let pass = req.body.Password
    users.find({ UserName: user, Password: pass },  (error, data) => {
      if (error) {
        return next(error)
      } else {
        return res.json(data)
      }
    })
})

//GET new user
// router.get('/', (req, res, next) => {
    
//     users.find({ UserName: 'Hulk', Password: 'smash' },  (error, data) => {
//       if (error) {
//         return next(error)
//       } else {
//         return res.json(data)
//       }
//     })
// })


module.exports = router