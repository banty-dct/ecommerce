const express = require("express")
const _ = require("lodash")
const router = express.Router()

const { User } = require("../models/User")

const { userAuth } = require("../middlewares/auth")

//localhost:3000/address
router.get("/",userAuth,function(req,res){
    const { user } = req
    if(user){
        res.send(user.addresses)
    }else{
        res.send({})
    }
})

//localhost:3000/address
router.post("/",userAuth,function(req,res){
    const { user } = req
    const body = _.pick(req.body,["address","city","pincode"])
    User.findByIdAndUpdate(user._id,{$push: {addresses: body}}, {new: true, runValidators: true})
        .then(function(user){
            res.send(user.addresses)
        })
        .catch(function(err){
            res.send(err)
        })
})

//localhost:3000/address/:id
router.delete("/:id",userAuth,function(req,res){
    const { user } = req
    const id = req.params.id
    User.findByIdAndUpdate(user._id,{$pull: {addresses: {_id: id}}}, {new: true})
        .then(function(user){
            res.send({
                address: user.addresses,
                notice: "Deleted"
            })
        })
        .catch(function(err){
            res.send(err)
        })
})

//localhost:3000/address/:id
router.put("/:id",userAuth,function(req,res){
    const { user } = req
    const id = req.params.id
    const body = _.pick(req.body,["city","address","pincode"])
    User.findOneAndUpdate({"addresses._id": id},{$set: { 
            "addresses.$.city": body.city,
            "addresses.$.address": body.address,
            "addresses.$.pincode": body.pincode
        }}, {new: true, runValidators: true})
        .then(function(user){
            res.send({
                address: user.addresses, 
                notice: "Updated"
            })
        })
        .catch(function(err){
            res.send(err)
        })
})

module.exports = {
    addressRouter: router
}