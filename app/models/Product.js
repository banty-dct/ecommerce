const mongoose = require("mongoose")

const Schema = mongoose.Schema
const productSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        min: 1
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

const Product = mongoose.model("Product",productSchema)
module.exports = {
    Product
}