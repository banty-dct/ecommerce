const mongoose = require('mongoose')
const { User } = require('./User')

const Schema = mongoose.Schema
const orderSchema = new Schema({
    //orderNumber: Number,
    orderDate: {
        type: Date,
        default: Date.now
    }, 
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
    address: {
        address: String,
        city: String, 
        pincode: Number
    },
    total: Number,
    status: String,
    orderItems: [{
        product: Schema.Types.ObjectId,
        quantity: Number, 
        price: Number
    }]
})

orderSchema.pre('save', function(next){
    const order = this 
    order.total = 0
    order.orderItems = []

    User.findOne({_id: order.user}).populate('cartItems.product')
        .then(function(user){
            if(user.cartItems.length > 0){
                user.cartItems.forEach(function(item){
                    order.orderItems.push({
                        product: item.product._id,
                        quantity: item.quantity,
                        price: item.product.price * item.quantity
                    })
                    order.total = order.total + (item.product.price * item.quantity)
                    order.status = "success"
                })
                next()
            }else{
                next()
            }
        })
        .catch(function(err){
            //new Error(err)
            next()
        })
})

const Order = mongoose.model("Order", orderSchema)
module.exports = {
    Order
}