const express = require("express")
const _ = require("lodash")
const router = express.Router()
const Razorpay = require('razorpay')

const { userAuth } = require("../middlewares/auth")

const { Razorpay_Api } = require("../../config/apiKey")
const instance = new Razorpay({
    key_id: Razorpay_Api.key_id,
    key_secret: Razorpay_Api.key_secret
})

//localhost:3005/api/payment/razorpay/payment_capture/:payment_id/:amount
router.get('/razorpay/payment_capture/:payment_id/:amount',userAuth,(req, res) => {
    const payment_id = req.params.payment_id
    const amount = Number(req.params.amount) * 100
    instance.payments.capture(payment_id, amount)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.send(err)
        })
})

//localhost:3005/api/payment/razorpay/create_order
// router.post('/razorpay/create_order',userAuth,(req, res) => {
//     const body = _.pick(req.body,["amount","currency","receipt","payment_capture","paymentId"])
//     const paymentId = body.paymentId
//     delete body.paymentId
//     body.amount = body.amount * 100
//     instance.orders.create(body)
//         .then(data => {
//             res.send({data, paymentId})
//         })
//         .catch(err => {
//             res.send(err)
//         })
// })

module.exports = {
    paymentRouter: router
}