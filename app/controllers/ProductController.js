const express = require("express")
const _ = require("lodash")
const router = express.Router()

const { Product } = require("../models/Product")

//localhost:3000/products
router.get("/",function(req,res){
    Product.find()
        .then(function(products){
            res.send(products)
        })
        .catch(function(err){
            res.send({
                err,
                notice: "Failed to get products"
            })
        })
})

module.exports = {
    productRouter: router
}