const mongoose = require('mongoose')
//const { User } = require('./User')

const Schema = mongoose.Schema
const orderSchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now
    }, 
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    status: String,
    payment: {
        amount: Number,
        amount_refunded: Number,
        bank: String,
        captured: Boolean,
        card_id: String,
        contact: String,
        created_at: Date,
        currency: String,
        description: String,
        email: String,
        entity: String,
        error_code: String,
        error_description: String,
        fee: Number,
        id: String,
        international: Boolean,
        invoice_id: String,
        method: String,
        order_id: String,
        refund_status: String,
        status: String,
        tax: Number,
        vpa: String,
        wallet: String,
        notes: Array
    }
})

// const orderSchema = new Schema({
//     orderDate: {
//         type: Date,
//         default: Date.now
//     }, 
//     user: {
//         type: Schema.Types.ObjectId, 
//         ref: 'User'
//     },
//     address: {
//         address: String,
//         city: String, 
//         pincode: Number
//     },
//     total: Number,
//     status: String,
//     orderItems: [{
//         product: Schema.Types.ObjectId,
//         quantity: Number, 
//         price: Number
//     }]
// })

// orderSchema.pre('save', function(next){
//     const order = this 
//     order.total = 0
//     order.orderItems = []

//     User.findOne({_id: order.user}).populate('cartItems.product')
//         .then(function(user){
//             if(user.cartItems.length > 0){
//                 user.cartItems.forEach(function(item){
//                     order.orderItems.push({
//                         product: item.product._id,
//                         quantity: item.quantity,
//                         price: item.product.price * item.quantity
//                     })
//                     order.total = order.total + (item.product.price * item.quantity)
//                     order.status = "success"
//                 })
//                 next()
//             }else{
//                 next()
//             }
//         })
//         .catch(function(err){
//             //new Error(err)
//             next()
//         })
// })

const Order = mongoose.model("Order", orderSchema)
module.exports = {
    Order
}