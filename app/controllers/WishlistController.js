const express = require("express")
const _ = require("lodash")
const router = express.Router()

const { User } = require("../models/User")

const { userAuth } = require("../middlewares/auth")

//localhost:3005/api/wishlists
router.get("/",userAuth,function(req,res){
    const { user } = req
    if(user){
        res.send(user.wishlists)
    }else{
        res.send({})
    }
})

//localhost:3005/api/wishlists
router.post("/",userAuth,function(req,res){
    const { user } = req
    const body = _.pick(req.body,["product"])
    User.findByIdAndUpdate(user._id,{$push: {wishlists: body}}, {new: true, runValidators: true})
        .then(function(user){
            res.send(user.wishlists)
        })
        .catch(function(err){
            res.send(err)
        })
})

//localhost:3005/api/wishlists/:id
router.delete("/:id",userAuth,function(req,res){
    const { user } = req
    const id = req.params.id
    User.findByIdAndUpdate(user._id,{$pull: {wishlists: {_id: id}}}, {new: true})
        .then(function(user){
            res.send(user.wishlists)
        })
        .catch(function(err){
            res.send(err)
        })
})

module.exports = {
    wishlistRouter: router
}