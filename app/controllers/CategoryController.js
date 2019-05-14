const express = require("express")
const _ = require("lodash")
const router = express.Router()

const { Category } = require("../models/Category")

//localhost:3000/categories
router.get("/",function(req,res){
    Category.find()
        .then(function(categories){
            res.send(categories)
        })
        .catch(function(err){
            res.send(err)
        })
})

module.exports = {
    categoryRouter: router
}