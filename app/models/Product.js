const mongoose = require("mongoose")
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema
const productSchema = new Schema({
    name:{
        type: String,
        required: [true, "name is required"]
    },
    price:{
        type: Number,
        min: 1,
        required: [true, "price is required"]
    }, 
    description: {
        type: String,
        required: [true, "description is required"]
    }, 
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    availabeDateTime: {
        type: Date,
        required: [true, "available date is required"]
    },
    codEligible: {
        type: Boolean,
        default: true
    },
    stock:{
        type: Number,
        min: 0,
        required: [true, "stock is required"]
    },
    image: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

productSchema.plugin(uniqueValidator, { message: '{PATH} already exists' })

const Product = mongoose.model("Product",productSchema)
module.exports = {
    Product
}