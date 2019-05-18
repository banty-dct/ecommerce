const express = require("express")
const _ = require("lodash")
const router = express.Router()
const uuid = require("uuid")

const { User } = require('../models/User')
const { Order } = require('../models/Order')

const { userAuth } = require("../middlewares/auth")

//localhost:3005/api/orders
router.post("/",userAuth,function(req,res){
    const body = _.pick(req.body,["product","amount"])
    body.user = req.user._id
    body.orderId = uuid()
    const order = new Order(body) 
    order.save()
        .then(function(order){
            res.send(order)
        })
        .catch(function(err){
            res.send(err)
        })
})

//localhost:3005/api/orders/:id
router.put("/:id",userAuth,function(req,res){
    const id = req.params.id
    const body = _.pick(req.body,["product","payment","paymentStatus"])
    body.user = req.user._id
    Order.findOneAndUpdate({
            orderId: id, 
            product: body.product,
            user: body.user
        },body,{new: true, runValidators: true})
        .then(function(order){
            res.send(order)
        })
        .catch(function(err){
            res.send(err)
        })
})
// router.post("/",userAuth,function(req,res){
//     const { user } = req
//     const order = new Order() 
//     order.user = user._id 
//     order.address = user.addresses[0]

//     order.save()
//         .then(function(order){
//             if(order.status == 'success'){
//                 User.findOneAndUpdate({_id: order.user},{ cartItems: [] })
//                     .then(function(user){
//                         res.send(order)
//                     })
//                     .catch(function(err){
//                         res.send(err)
//                     })
//             }else{
//                 res.send({})
//             }       
//         })
//         .catch(function(err){
//             res.send(err)
//         })
// })

//localhost:3000/orders
router.get("/",userAuth,function(req,res){
    const user = req.user._id
    Order.find({user}).populate("product").sort({ createdAt: -1 })
        .then(function(orders){
            res.send(orders)
        })
        .catch(function(err){
            res.send(err)
        })
})

//localhost:3000/orders/:id
router.get("/:id",userAuth,function(req,res){
    const id = req.params.id
    const user = req.user._id
    Order.findOne({user, orderId: id}).populate("product")
        .then(function(orders){
            res.send(orders)
        })
        .catch(function(err){
            res.send(err)
        })
})

module.exports = {
    orderRouter: router
}