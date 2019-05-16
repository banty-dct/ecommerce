import React from 'react'
import { connect } from 'react-redux'
import axios from "axios"

import { Spinner } from "./commons/Spinner"

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

    render(){
        return (
            <div className="products">
                <div className="container">
                    <div className="row">
                        { this.state.isLoaded ? 
                            <React.Fragment>
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
                                                    <button className="btn add">Add to Cart</button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }) }
                            </React.Fragment> : 
                            <div className="text-center mt-5 mb-5"><Spinner /></div>
                        }
                    </div>
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