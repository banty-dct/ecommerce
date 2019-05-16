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

//localhost:3005/api/payment/razorpay/capture/:payment_id/:amount
router.get('/razorpay/capture/:payment_id/:amount',userAuth,(req, res) => {
    const payment_id = req.params.payment_id
    const amount = Number(req.params.amount * 100)
    instance.payments.capture(payment_id, amount)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.send(err)
        })
})

module.exports = {
    paymentRouter: router
}