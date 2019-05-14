const express = require("express")
const _ = require("lodash")
const router = express.Router()

const { User } = require("../models/User")

const { userAuth } = require("../middlewares/auth")

//localhost:3005/api/users/register
router.post("/register",function(req,res){
    const body = _.pick(req.body,["fullname","username","email","password"])
    body.passUpdate = true
    const user = new User(body)
    user.save()
        .then(function(user){
            res.send(user)
        })
        .catch(function(err){
            res.send(err)
        })
})

//localhost:3005/api/api/users/login
router.post("/login",function(req,res){
    const body = _.pick(req.body,["username_email","password"])
    User.findByCredentials(body.username_email,body.password)
        .then(function(user){
            return user.generateToken()
        })
        .then(function(user){
            res.send(user)
        })
        .catch(function(err){
            res.send(err)
        })
})

//localhost:3005/api/users/logout
router.delete("/logout",userAuth,function(req,res){
    const { user } = req
    User.findByIdAndUpdate(user._id,{ tokens: [] })
        .then(function(){
            res.send("successfully logged out")
        })
        .catch(function(err){
            res.send(err)
        })
})

//localhost:3005/api/users/token/:id
router.get("/token/:id",function(req,res){
    const token = req.params.id
    User.findOne({"tokens.token": token})
        .then(function(user){
            res.send({id: user._id, role: user.role, token})
        })
        .catch(function(err){
            res.send(err)
        })
})

module.exports = {
    userRouter: router
}