const express = require("express")
const _ = require("lodash")
const router = express.Router()

const { Order } = require("../../models/Order")

const { userAuth } = require("../../middlewares/auth")
const { modAccess, adminAccess } = require("../../middlewares/access")

//localhost:3005/api/admin/orders/:id
router.put("/:id",userAuth,modAccess,function(req,res){
    const id = req.params.id
    const body = _.pick(req.body,["orderDate","address","total","status","orderItems"])
    Order.findByIdAndUpdate(id,body,{new: true, runValidators: true})
        .then(function(order){
            res.send(order)
        })
        .catch(function(err){
            res.send(err)
        })
})

//localhost:3005/api/admin/orders/:id
router.delete("/:id",userAuth,adminAccess,function(req,res){
    const id = req.params.id
    Order.findByIdAndDelete(id)
        .then(function(order){
            if(order){
                res.send(order)
            }else{
                res.status("404").send({
                    notice: "page not found"
                })
            }
        })
        .catch(function(err){
            res.send(err)
        })
})

module.exports = {
    adminOrderRouter: router
}