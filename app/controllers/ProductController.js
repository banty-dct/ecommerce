const express = require("express")
const _ = require("lodash")
const router = express.Router()

const { Product } = require("../models/Product")

//localhost:3005/api/products
router.get("/",function(req,res){
    Product.find()
        .then(function(products){
            res.send(products)
        })
        .catch(function(err){
            res.send(err)
        })
})

module.exports = {
    productRouter: router
}