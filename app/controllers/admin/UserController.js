const express = require("express")
const _ = require("lodash")
const router = express.Router()

const { User } = require("../../models/User")

const { userAuth } = require("../../middlewares/auth")
const { modAccess, adminAccess } = require("../../middlewares/access")

//localhost:3005/api/admin/users
router.get("/",userAuth,modAccess,function(req,res){
    User.find()
        .then(function(users){
            res.send(users)
        })
        .catch(function(err){
            res.send(err)
        })
})

//localhost:3005/api/admin/users/:id
router.get("/:id",userAuth,modAccess,function(req,res){
    const id = req.params.id
    User.findOne({_id: id})
        .then(function(user){
            res.send(user)
        })
        .catch(function(err){
            res.send(err)
        })
})

//localhost:3005/api/admin/users/:id
router.put("/:id",userAuth,adminAccess,function(req,res){
    const id = req.params.id
    const body = _.pick(req.body,["username","email","roles","allowAccess","cartItems","addresses","wishlists"])
    User.findOneAndUpdate({_id: id},body,{new: true, runValidators: true})
        .then(function(user){
            res.send(user)
        })
        .catch(function(err){
            res.send(err)
        })
})

//localhost:3005/api/admin/users/:id
router.delete("/:id",userAuth,adminAccess,function(req,res){
    const id = req.params.id
    User.findByIdAndDelete(id)
        .then(function(user){
            if(user){
                res.send(user)
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
    adminUserRouter: router
}