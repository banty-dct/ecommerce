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
    description: String, 
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    availabeDateTime: Date,
    codEligible: {
        type: Boolean,
        default: true 
    },
    stock:{
        type: Number,
        min: 0
    },
    image: String
})

productSchema.plugin(uniqueValidator, { message: '{PATH} already exists' })

const Product = mongoose.model("Product",productSchema)
module.exports = {
    Product
}