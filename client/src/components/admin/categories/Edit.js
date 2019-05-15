import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux'

import Form from './Form'
import { Spinner } from '../../commons/Spinner'

class Edit extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            submitLoading: false,
            errors: {},
            isLoaded: false,
            category: {}
        }
    }

	componentDidMount(){
        document.title = "Edit Category"        
        const id = this.props.match.params.id
        axios.get(`/api/categories/${id}`, {
                headers: { 'x-auth': this.props.user.auth.token }
            })
            .then(res => {
                if(res.data.category){
                    this.setState(() => ({
                        category: res.data.category,
                        isLoaded: true
                    }))
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleSubmit = (formData) => {
        this.setState(() => ({ submitLoading: true }))
        const id = this.props.match.params.id
        axios.put(`/api/admin/categories/${id}`, formData, {
                headers: { 'x-auth': this.props.user.auth.token }
            })
            .then(res => {
                if(res.data.errors){
                    this.setState(() => ({
                        submitLoading: false,
                        errors: res.data.errors
                    }))
                }else{
                    this.props.history.push('/admin/categories')
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
                                    <h1>Edit Category</h1>
                                </div>
                                <div className="col-6">
                                    <div className="rightBtn">
                                        <Link to="/admin/categories">Go Back</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    { this.state.isLoaded ? (
                    <React.Fragment>
                        <div className="container">
                            <Form title="Update" 
                                  handleSubmit={this.handleSubmit}
                                  submitLoading={this.state.submitLoading} 
                                  errors={this.state.errors}
                                  category={this.state.category}
                            />
                        </div>
                    </React.Fragment>
                    ) : <div className="text-center mt-5 mb-5"><Spinner /></div> 
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}
  
export default connect(mapStateToProps)(Edit)