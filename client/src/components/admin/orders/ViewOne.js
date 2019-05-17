import React from 'react'
import { connect } from 'react-redux'
import axios from "axios"

import { Spinner } from "../../commons/Spinner"

class AdminOrderViewOne extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            order: {},
            isLoaded: false
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
                    order: res.data,
                    isLoaded: true
                }))
            })
    }

    refundHandler = () => {
        if(this.state.order.payment.id){
            axios.get(`/api/admin/payment/razorpay/refund/${this.state.order.payment.id}`,{
                headers: {
                        "x-auth": this.props.user.auth.token
                    }
                })
                .then(res => {
                    this.updateOrder({
                        refundStatus: true,
                        refund: res.data
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
                    order: res.data
                }))
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
                    { this.state.isLoaded ? 
                        <div>
                            <div className="text-right">
                                { this.state.order.refundStatus === false && this.state.order.payment.id &&
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
                                                <td>{ this.state.order.user.fullname }</td>
                                            </tr>
                                            <tr>
                                                <th>Username</th>
                                                <td>{ this.state.order.user.username }</td>
                                            </tr>
                                            <tr>
                                                <th>Email</th>
                                                <td>{ this.state.order.user.email }</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    
                                    <h2>Order Details</h2>
                                    <table className="table table-hover table-bordered noLimit">
                                        <tbody>
                                            <tr>
                                                <th>Order Id</th>
                                                <td>{ this.state.order.orderId }</td>
                                            </tr>
                                            <tr>
                                                <th>Order Date</th>
                                                <td>{ this.state.order.createdAt }</td>
                                            </tr>
                                            <tr>
                                                <th>Product Name</th>
                                                <td>{ this.state.order.product.name }</td>
                                            </tr>
                                            <tr>
                                                <th>Product Amount</th>
                                                <td>{ this.state.order.amount }</td>
                                            </tr>
                                            <tr>
                                                <th>Payment Status</th>
                                                <td>{ this.state.order.paymentStatus ? 'Paid' : 'Failed' }</td>
                                            </tr>
                                            <tr>
                                                <th>Refund Status</th>
                                                <td>{ this.state.order.refundStatus ? 'Refunded' : 'Not initiated' }</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    
                                    { this.state.order.refundStatus &&
                                    <React.Fragment>
                                        <h2>Refund Details</h2>
                                        <table className="table table-hover table-bordered noLimit">
                                            <tbody>
                                                <tr>
                                                    <th>Refund Id</th>
                                                    <td>{ this.state.order.refund.id }</td>
                                                </tr>
                                                <tr>
                                                    <th>Refund Date</th>
                                                    <td>{ this.state.order.refund.created_at }</td>
                                                </tr>
                                                <tr>
                                                    <th>Refund Amount</th>
                                                    <td>{ this.state.order.refund.amount / 100 }</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </React.Fragment>
                                    }
                                </div>
                                { this.state.order.paymentStatus && 
                                <div className="col-md-6">
                                    <h2>Payment Details</h2>
                                    <table className="table table-hover table-bordered noLimit">
                                        <tbody>
                                            <tr>
                                                <th>Payment Id</th>
                                                <td>{ this.state.order.payment.id }</td>
                                            </tr>
                                            <tr>
                                                <th>Amount Received</th>
                                                <td>{ this.state.order.payment.amount / 100 }</td>
                                            </tr>
                                            <tr>
                                                <th>Amount Refunded</th>
                                                <td>{ this.state.order.payment.amount_refunded / 100 }</td>
                                            </tr>
                                            <tr>
                                                <th>Razorpay Fee</th>
                                                <td>{ this.state.order.payment.fee / 100 }</td>
                                            </tr>
                                            <tr>
                                                <th>TAX</th>
                                                <td>{ this.state.order.payment.tax / 100 }</td>
                                            </tr>
                                            <tr>
                                                <th>Bank</th>
                                                <td>{ this.state.order.payment.bank && this.state.order.payment.bank }</td>
                                            </tr>
                                            <tr>
                                                <th>Payment Captured</th>
                                                <td>{ this.state.order.payment.captured ? 'Yes' : 'No' }</td>
                                            </tr>
                                            <tr>
                                                <th>Contact Number</th>
                                                <td>{ this.state.order.payment.contact }</td>
                                            </tr>
                                            <tr>
                                                <th>Bank</th>
                                                <td>{ this.state.order.payment.bank }</td>
                                            </tr>
                                            <tr>
                                                <th>Method</th>
                                                <td>{ this.state.order.payment.method }</td>
                                            </tr>
                                            <tr>
                                                <th>VPA</th>
                                                <td>{ this.state.order.payment.vpa && this.state.order.payment.vpa }</td>
                                            </tr>
                                            <tr>
                                                <th>Wallet</th>
                                                <td>{ this.state.order.payment.wallet && this.state.order.payment.wallet }</td>
                                            </tr>

                                            <tr>
                                                <th>Status</th>
                                                <td>{ this.state.order.payment.status }</td>
                                            </tr>
                                            <tr>
                                                <th>Card Id</th>
                                                <td>{ this.state.order.payment.card_id && this.state.order.payment.card_id }</td>
                                            </tr>
                                            <tr>
                                                <th>Refund Status</th>
                                                <td>{ this.state.order.payment.refund_status && this.state.order.payment.refund_status }</td>
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