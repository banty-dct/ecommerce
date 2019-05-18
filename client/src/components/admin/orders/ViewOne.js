import React from 'react'
import { connect } from 'react-redux'
import axios from "axios"

import { Spinner } from "../../commons/Spinner"

class AdminOrderViewOne extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            order: {
                data: {},
                status: false
            },
            payment: {
                data: {},
                status: false
            },
            refund: {
                data: {},
                status: false
            }
        }
    }

    componentDidMount(){        
        document.title = "View Order"
        const id = this.props.match.params.id
        axios.get(`/api/admin/orders/${id}`,{
                headers: { "x-auth": this.props.user.auth.token }
            })
            .then(res => {
                this.setState(() => ({
                    order: {
                        data: res.data,
                        status: true
                    }
                }))
                if(res.data.razorpay.payment.status){
                    this.fetchPayment(res.data.razorpay.payment.id)
                }
                if(res.data.razorpay.refund.status && res.data.razorpay.payment.status){
                    this.fetchRefund({
                        payment_id: res.data.razorpay.payment.id, 
                        refund_id: res.data.razorpay.refund.id
                    })
                }
            })
        
    }

    fetchPayment = (id) => {
        axios.get(`/api/admin/payment/razorpay/fetch_payment/${id}`,{
                headers: { "x-auth": this.props.user.auth.token }
            })
            .then(res => {
                this.setState(() => ({
                    payment: {
                        data: res.data,
                        status: true
                    }
                }))
            })
    }

    fetchRefund = (data) => {
        axios.get(`/api/admin/payment/razorpay/fetch_refund/${data.refund_id}/${data.payment_id}`,{
                headers: { "x-auth": this.props.user.auth.token }
            })
            .then(res => {
                this.setState(() => ({
                    refund: {
                        data: res.data,
                        status: true
                    }
                }))
            })
    }

    refundHandler = () => {
        if(this.state.payment.data.id){
            axios.get(`/api/admin/payment/razorpay/refund/${this.state.payment.data.id}`,{
                    headers: { "x-auth": this.props.user.auth.token }
                })
                .then(res => {
                    this.setState(() => ({
                        refund: {
                            data: res.data,
                            status: true
                        }
                    }))
                    this.updateOrder({
                        razorpay: {
                            payment: {
                                id: this.state.payment.data.id,
                                status: true
                            },
                            refund: {
                                id: res.data.id,
                                status: true
                            },
                            status: "Refunded"
                        }
                    })
                })

        }
    }

    updateOrder = (data) => {
        const id = this.props.match.params.id
        axios.put(`/api/admin/orders/${id}`, data,{
                headers: { "x-auth": this.props.user.auth.token }
            })
            .then(res => {
                this.setState(() => ({
                    order: {
                        data: res.data,
                        status: true
                    }
                }))
                this.fetchPayment(res.data.razorpay.payment.id)
                window.alert("Successfully Refunded")
            })
            .catch(err => {
                console.log(err)
            })
    }

    render(){
        return (
            <div className="orders admin view">
                <div className="container">               
                    { this.state.order.status ? 
                        <div>
                            <div className="text-right">
                                { this.state.order.data.razorpay.refund.status === false && this.state.payment.status &&
                                    <button className="btn btn-info"
                                            onClick={() => {
                                                this.refundHandler()
                                            }}
                                        >Refund Now</button> }
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <h2>User Details</h2>
                                    <table className="table table-hover table-bordered noLimit">
                                        <tbody>
                                            <tr>
                                                <th>Fullname</th>
                                                <td>{ this.state.order.data.user.fullname }</td>
                                            </tr>
                                            <tr>
                                                <th>Username</th>
                                                <td>{ this.state.order.data.user.username }</td>
                                            </tr>
                                            <tr>
                                                <th>Email</th>
                                                <td>{ this.state.order.data.user.email }</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    
                                    <h2>Order Details</h2>
                                    <table className="table table-hover table-bordered noLimit">
                                        <tbody>
                                            <tr>
                                                <th>Order Id</th>
                                                <td>{ this.state.order.data.orderId }</td>
                                            </tr>
                                            <tr>
                                                <th>Order Date</th>
                                                <td>{ this.state.order.data.createdAt }</td>
                                            </tr>
                                            <tr>
                                                <th>Product Name</th>
                                                <td>{ this.state.order.data.product.name }</td>
                                            </tr>
                                            <tr>
                                                <th>Product Amount</th>
                                                <td>{ this.state.order.data.amount }</td>
                                            </tr>
                                            <tr>
                                                <th>Payment Status</th>
                                                <td>{ this.state.order.data.razorpay.status }</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    
                                    { this.state.refund.status &&
                                    <React.Fragment>
                                        <h2>Refund Details</h2>
                                        <table className="table table-hover table-bordered noLimit">
                                            <tbody>
                                                <tr>
                                                    <th>Refund Id</th>
                                                    <td>{ this.state.refund.data.id }</td>
                                                </tr>
                                                <tr>
                                                    <th>Refund Date</th>
                                                    <td>{ this.state.refund.data.created_at }</td>
                                                </tr>
                                                <tr>
                                                    <th>Refund Amount</th>
                                                    <td>{ this.state.refund.data.amount / 100 }</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </React.Fragment>
                                    }
                                </div>
                                { this.state.payment.status && 
                                <div className="col-md-6">
                                    <h2>Payment Details</h2>
                                    <table className="table table-hover table-bordered noLimit">
                                        <tbody>
                                            <tr>
                                                <th>Payment Id</th>
                                                <td>{ this.state.payment.data.id }</td>
                                            </tr>
                                            <tr>
                                                <th>Amount Received</th>
                                                <td>{ this.state.payment.data.amount / 100 }</td>
                                            </tr>
                                            <tr>
                                                <th>Amount Refunded</th>
                                                <td>{ this.state.payment.data.amount_refunded / 100 }</td>
                                            </tr>
                                            <tr>
                                                <th>Razorpay Fee</th>
                                                <td>{ this.state.payment.data.fee / 100 }</td>
                                            </tr>
                                            <tr>
                                                <th>TAX</th>
                                                <td>{ this.state.payment.data.tax / 100 }</td>
                                            </tr>
                                            <tr>
                                                <th>Bank</th>
                                                <td>{ this.state.payment.data.bank }</td>
                                            </tr>
                                            <tr>
                                                <th>Payment Captured</th>
                                                <td>{ this.state.payment.data.captured ? 'Yes' : 'No' }</td>
                                            </tr>
                                            <tr>
                                                <th>Contact Number</th>
                                                <td>{ this.state.payment.data.contact }</td>
                                            </tr>
                                            <tr>
                                                <th>Method</th>
                                                <td>{ this.state.payment.data.method }</td>
                                            </tr>
                                            <tr>
                                                <th>VPA</th>
                                                <td>{ this.state.payment.data.vpa }</td>
                                            </tr>
                                            <tr>
                                                <th>Wallet</th>
                                                <td>{ this.state.payment.data.wallet }</td>
                                            </tr>

                                            <tr>
                                                <th>Status</th>
                                                <td>{ this.state.payment.data.status }</td>
                                            </tr>
                                            <tr>
                                                <th>Card Id</th>
                                                <td>{ this.state.payment.data.card_id }</td>
                                            </tr>
                                            <tr>
                                                <th>Refund Status</th>
                                                <td>{ this.state.payment.data.refund_status }</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                }
                            </div>
                        </div> : <div className="text-center mt-5 mb-5"><Spinner /></div>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(AdminOrderViewOne)