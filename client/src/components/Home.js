import React from 'react'
import { connect } from 'react-redux'
import axios from "axios"

import { Spinner } from "./commons/Spinner"
import { Razorpay_Api } from "../config/apiKey"

class Home extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            products: [],
            isLoaded: false
        }
    }

    componentDidMount(){        
        document.title = "Home"
        axios.get("/api/products")
            .then(res => {
                console.log(res.data)
                this.setState(() => ({
                    products: res.data,
                    isLoaded: true
                }))
            })
    }

    buyProduct = (product) => {
        if(this.props.user.auth === "false"){
            window.alert("Login to buy")
        }else{
            const self = this
            const options = {
                key: Razorpay_Api.key_id,
                amount: product.price * 100,
                name: 'Ecommerce',
                description: product.name,
    
                handler(response) {
                    const paymentId = response.razorpay_payment_id
                    axios.get(`/api/payment/razorpay/capture/${paymentId}/${product.price}`, {
                            headers: { "x-auth": self.props.user.auth.token }
                        })
                        .then(res => {
                            self.saveOrder({
                                product,
                                payment: res.data
                            })
                        })
                        .catch(err => {
                            console.log(err)
                        })
                },    
                prefill: {
                    name: self.props.user.auth.fullname,
                    email: self.props.user.auth.email,
                },
                theme: {
                    color: '#363349',
                }
            }
            const rzp1 = new window.Razorpay(options)    
            rzp1.open()
        }
    }

    saveOrder = (formData) => {
        axios.post("/api/orders", formData,{
                headers: { "x-auth": this.props.user.auth.token }
            })
            .then(res => {
                if(res.data.payment){
                    window.alert("Successfully Paid")
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    render(){
        return (
            <div className="products">
                <div className="container">                    
                    { this.state.isLoaded ? 
                        <div className="row">
                            { this.state.products.map(product => {
                                return (
                                    <div className="col-md-4" key={product._id}>
                                        <div className="productItem">
                                            <div className="img">
                                                <img src={`http://localhost:3005/uploads/${product.image}`} alt="" />
                                            </div>
                                            <div className="details">
                                                <h2>{ product.name }</h2>
                                                <div className="price">Rs. <b>{ product.price }</b></div>
                                                <button className="btn add"
                                                        onClick={() => {
                                                            this.buyProduct(product)
                                                        }}                                                
                                                >Buy Now</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }) }
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

export default connect(mapStateToProps)(Home)