import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux'

import Form from './Form'
import { Spinner } from "../../commons/Spinner"

class Add extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            submitLoading: false,
            errors: {},
            product: {},
            isLoaded: false
        }
    }

	componentDidMount(){
        document.title = "Edit Product"
        const id = this.props.match.params.id
        axios.get(`/api/products/${id}`)
            .then(res => {
                if(res.data.product){
                    this.setState(() => ({
                        product: res.data.product,
                        isLoaded: true
                    }))
                }
            })
	}

    handleSubmit = (formData) => {
        this.setState(() => ({ submitLoading: true }))
        const id = this.props.match.params.id
        axios.put(`/api/admin/products/${id}`, formData, {
                headers: { 'x-auth': this.props.user.auth.token }
            })
            .then(res => {
                if(res.data.errors){
                    this.setState(() => ({
                        errors: res.data.errors,
                        submitLoading: false
                    }))
                }else{
                    this.props.history.push('/admin/products')
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    render(){
        return (
            <div className="admin">
                <div className="headTitle">
                    <div className="container">
                        <div className="row">
                            <div className="col-6">
                                <h1>Edit Product</h1>
                            </div>
                            <div className="col-6">
                                <div className="rightBtn">
                                    <Link to="/admin/products">Go Back</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">        
                    { this.state.isLoaded ?             
                    <Form title="Update" 
                            handleSubmit={this.handleSubmit}
                            submitLoading={this.state.submitLoading} 
                            errors={this.state.errors}
                            product={this.state.product}
                    /> : <div className="text-center mt-5 mb-5"><Spinner /></div>
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
  
  export default connect(mapStateToProps)(Add)