const express = require("express")
const _ = require("lodash")
const router = express.Router()

const { Category } = require("../models/Category")

//localhost:3005/api/categories
router.get("/",function(req,res){
    Category.find().sort({ createdAt: -1 })
        .then(function(categories){
            res.send(categories)
        })
        .catch(function(err){
            res.send(err)
        })
})

//localhost:3005/api/categories/:id
router.get("/:id",function(req,res){
    const id = req.params.id
    Category.findOne({ _id: id })
        .then(function(category){
            res.send({category})
        })
        .catch(function(err){
            res.send(err)
        })
})

module.exports = {
    categoryRouter: router
}