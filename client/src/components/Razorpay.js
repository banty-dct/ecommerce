import React, { Component } from "react"
import axios from "axios"

class Razorpay extends Component {
    constructor(props) {
        super(props)
        this.state = {
            payment_amount: 0,
            refund_id: 0
        }
        this.paymentHandler = this.paymentHandler.bind(this)
        this.refundHandler = this.refundHandler.bind(this)
    }

    paymentHandler(e) {
        e.preventDefault()

        const payment_amount = this.state.payment_amount
        const self = this
        const options = {
            key: "rzp_test_4cAeaqD37r9WVp",
            amount: payment_amount * 100,
            name: 'Payments',
            description: 'Donate yourself some time',

            handler(response) {
                const paymentId = response.razorpay_payment_id
                const url = `http://localhost:3005/payments/capture/${paymentId}/${payment_amount}`
                fetch(url, {
                        method: 'get',
                        headers: {
                            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                        }
                    })
                    .then(resp =>
                        resp.json()
                    )
                    .then(function(data) {
                        console.log('Request succeeded with JSON response', data)
                        self.setState({
                            refund_id: response.razorpay_payment_id
                        })
                    })
                    .catch(function (error) {
                        console.log('Request failed', error)
                    })
            },

            prefill: {
                name: 'Shashank Shekhar',
                email: 'ss@localtrip.in',
            },
            notes: {
                address: 'Goa,India',
            },
            theme: {
                color: '#9D50BB',
            }
        }
        const rzp1 = new window.Razorpay(options)

        rzp1.open()
    }

    refundHandler(e) {
        e.preventDefault()
        const refund_id = this.state.refund_id
        const url = `http://localhost:3005/payments/refund/${refund_id}`
        fetch(url, {
                method: 'get',
                headers: {
                    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                }
            })
            .then(resp =>
                resp.json()
            )
            .then(function (data) {
                console.log('Request succeeded with JSON response', data)
                alert("Refund Succeeded", )
            })
            .catch(function (error) {
                console.log('Request failed', error)
            })
    }

    render(){
        const { payment_amount, refund_id } = this.state
        return (
            <div className="wrapper">
                <form action="#" onSubmit={this.paymentHandler}>
                    <input
                        type="number"
                        value={payment_amount}
                        className="pay_amount"
                        placeholder="Amount in INR"
                        onChange={e =>
                        this.setState({ payment_amount: e.target.value })
                        }
                    />
                    <button type="submit">Pay Now</button>
                </form>
                <form action="#" onSubmit={this.refundHandler}>
                    <input
                        value={refund_id}
                        type="text"
                        onChange={e => this.setState({ refund_id: e.target.value })}
                    />
                    <button type="submit">Refund Now</button>
                </form>
            </div>
        )
    }
}

export default Razorpay