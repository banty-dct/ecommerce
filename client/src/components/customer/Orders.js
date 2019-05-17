import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from "axios"

import { Spinner } from "../commons/Spinner"

class Orders extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            orders: [],
            isLoaded: false
        }
    }

    componentDidMount(){        
        document.title = "Orders"
        axios.get("/api/orders",{
                headers: { "x-auth": this.props.user.auth.token }
            })
            .then(res => {
                console.log(res.data)
                this.setState(() => ({
                    orders: res.data,
                    isLoaded: true
                }))
            })
    }

    render(){
        return (
            <div className="orders admin">
                <h1>My Orders</h1>
                <div className="container">                    
                    { this.state.isLoaded ? 
                        <table className="table table-hover table-bordered">
                            <thead>
                                <tr>
                                    <th>Sl. No.</th>
                                    <th>Image</th>
                                    <th>Product</th>
                                    <th>Amount</th>
                                    <th>Order Id</th>
                                    <th>Order Date</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                { this.state.orders.map((order, index) => {
                                    return (
                                        <tr key={order._id}>    
                                            <td>{index + 1}</td>
                                            <td><img src={`http://localhost:3005/uploads/${order.product.image}`} alt="" /></td>
                                            <td>{ order.product.name }</td>
                                            <td>{ order.amount }</td>
                                            <td>{ order.orderId }</td>
                                            <td>{ order.createdAt }</td>
                                            <td>{ order.paymentStatus }</td>
                                            <td>{ order.payment.id ? 
                                                <Link className="btn" to={`/orders/${order.orderId}`}>View</Link> : 
                                                <button className="btn">Pay Now</button> }</td>
                                        </tr>
                                    )
                                }) }
                            </tbody>
                        </table> : <div className="text-center mt-5 mb-5"><Spinner /></div>
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

export default connect(mapStateToProps)(Orders)