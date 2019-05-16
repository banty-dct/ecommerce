import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux'

import Form from './Form'

class Add extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            submitLoading: false,
            errors: {}
        }
    }

	componentDidMount(){
        document.title = "Add Product"
	}

    handleSubmit = (formData) => {
        this.setState(() => ({ submitLoading: true }))
        axios.post('/api/admin/products', formData, {
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
                                <h1>Add Product</h1>
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
                    <Form title="Add" 
                            handleSubmit={this.handleSubmit}
                            submitLoading={this.state.submitLoading} 
                            errors={this.state.errors}
                    />
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