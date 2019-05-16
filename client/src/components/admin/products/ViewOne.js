import React from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"

import { Spinner } from "../../commons/Spinner"

class ViewOne extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isLoaded: false,
            product: {}
        }
    }

    componentDidMount(){
        const id = this.props.match.params.id
        axios.get(`/api/products/${id}`)
            .then(res => {
                this.setState(() => ({
                    isLoaded: true,
                    product: res.data.product
                }))
                console.log(res.data)
            })
    }

    render(){
        const { image, name, description, availabeDateTime, codEligible, price, stock } = this.state.product
        return(
            <div className="admin">
                { this.state.isLoaded ?
                <React.Fragment>
                    <div className="headTitle">
                        <div className="container">
                            <div className="row">
                                <div className="col-6">
                                    <h1>{ name }</h1>
                                </div>
                                <div className="col-6">
                                    <div className="rightBtn">
                                        <Link to="/admin/products">Go Back</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> 
                    <div className="productView">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-5">
                                    <div className="img">
                                        <img src={`http://localhost:3005/uploads/${image}`} alt="" />
                                    </div>
                                </div>
                                <div className="col-md-7">
                                    <div className="content">
                                        <table className="table table-hover table-bordered">
                                            <tbody>
                                                <tr><th>Name</th><td>{ name }</td></tr>
                                                <tr><th>Description</th><td>{ description }</td></tr>
                                                <tr><th>Available Date</th><td>{ availabeDateTime }</td></tr>
                                                <tr><th>COD Eligible</th><td>{ codEligible ? 'Yes' : 'No' }</td></tr>
                                                <tr><th>Price</th><td>{ price }</td></tr>
                                                <tr><th>Stock</th><td>{ stock }</td></tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> 
                </React.Fragment> : <div className="text-center mt-5 mb-5"><Spinner /></div> }
            </div>
        )
    }
}

export default ViewOne