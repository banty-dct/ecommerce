const express = require("express")
const _ = require("lodash")
const router = express.Router()

const { User } = require("../models/User")

const { userAuth } = require("../middlewares/auth")

//localhost:3000/register
router.post("/register",function(req,res){
    const body = _.pick(req.body,["username","email","password"])
    const user = new User(body)
    user.save()
        .then(function(user){
            res.send({
                user,
                notice: "Successfully registered"
            })
        })
        .catch(function(err){
            res.send({
                err,
                notice: "Failed to register"
            })
        })
})

//localhost:3000/login
router.post("/login",function(req,res){
    const body = _.pick(req.body,["username_email","password"])

    User.findByCredentials(body.username_email,body.password)
        .then(function(user){
            if(user.tokens.length < 3){
                return user.generateToken()
            }else{
                res.send({notice: "Already logged in 3 times"})
            }
        })
        .then(function(token){
            res.setHeader("x-auth",token).send({
                notice: "Successfully logged in"
            })
        })
        .catch(function(err){
            res.send(err)
        })
})

//localhost:3000/logout
router.delete("/logout",userAuth,function(req,res){
    const { user, token } = req
    User.findByIdAndUpdate(user._id,{ tokens: [] })
        .then(function(){
            res.send("Successfully logged out")
        })
        .catch(function(err){
            res.send({
                err,
                notice: "Invalid token"
            })
        })
})

module.exports = {
    userRouter: router
}