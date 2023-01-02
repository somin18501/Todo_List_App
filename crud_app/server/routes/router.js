const express = require('express')
const route = express.Router()
const services = require('../services/render') // by using this we create seperate file for callback functions
const controller = require('../controller/controller')

/** 
* @description Root Router
* @method GET /
*/
route.get('/',/*(req,res)=>{res.render('index')}*/services.homeRoutes)

/** 
* @description add user
* @method GET /add-user
*/
route.get('/add-user',services.add_user)

/** 
* @description update user
* @method GET /update-user
*/
route.get('/update-user',services.update_user)

// API
route.post('/api/users',controller.create)
route.get('/api/users',controller.find)
route.put('/api/users/:id',controller.update) // url parameter id
route.delete('/api/users/:id',controller.delete)

module.exports = route