const express = require("express")
const _ = require("lodash")
const router = express.Router()

const { Product } = require("../models/Product")

//localhost:3005/api/products
router.get("/",function(req,res){
    Product.find().populate("category").sort({ createdAt: -1 })
        .then(function(products){
            res.send(products)
        })
        .catch(function(err){
            res.send(err)
        })
})

//localhost:3005/api/products/:id
router.get("/:id",function(req,res){
    const id = req.params.id
    Product.findOne({ _id: id })
        .then(function(product){
            res.send({product})
        })
        .catch(function(err){
            res.send(err)
        })
})

module.exports = {
    productRouter: router
}