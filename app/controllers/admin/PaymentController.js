const express = require("express")
const _ = require("lodash")
const router = express.Router()
const Razorpay = require('razorpay')

const { userAuth } = require("../../middlewares/auth")
const { adminAccess } = require("../../middlewares/access")

const { Razorpay_Api } = require("../../../config/apiKey")
const instance = new Razorpay({
    key_id: Razorpay_Api.key_id,
    key_secret: Razorpay_Api.key_secret
})

//localhost:3005/api/admin/payment/razorpay/refund/:payment_id
router.get('/razorpay/refund/:payment_id',userAuth,adminAccess,(req, res) => {
    const payment_id = req.params.payment_id
    instance.payments.refund(payment_id)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.send(err)
        })
})

module.exports = {
    adminPaymentRouter: router
}