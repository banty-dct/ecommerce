import React from 'react'
import axios from 'axios'
import { Spinner } from '../../commons/Spinner'

class Form extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            name: '',
            price: '',
            description: '',
            category: '',
            availabeDateTime: '',
            codEligible: '',
            stock: '',
            image: '',

            errors: {},
            isLoaded: false,

            categories: []
        }
    }

    componentDidMount(){
        
    }

    handleSubmit = (e) => {
        
    }

    handleChange = (e) => {
        e.persist()
        this.setState(() => ({
            [e.target.name]: e.target.value
        }))
    }

    render(){
        return (
            <div>
                { this.state.isLoaded ?
                    <form className="form" onSubmit={this.handleSubmit}>
                        <div className="row">                                
                            <div className="col-md-3">
                                <label className="label">Name</label>
                            </div>
                            <div className="col-md-4">
                                <input type="text" 
                                       className="form-control field" 
                                       placeholder="Enter Product Name" 
                                       name="name" 
                                       value={this.state.name}
                                       onChange={this.handleChange}
                                    />
                            </div>
                            <div className="col-md-5">
                                
                            </div>                                
                            <div className="col-md-3">
                                <label className="label">Category</label>
                            </div>
                            <div className="col-md-4">
                                
                            </div>
                            <div className="col-md-5">
                                
                            </div>
                            <div className="col-md-3">

                            </div>
                            <div className="col-md-4">
                                <button className="btn">
                                    { this.props.submitLoading ? <i className="fa fa-spin fa-spinner"></i> : (`${this.props.title} Product`)}
                                </button>
                            </div>
                        </div>
                    </form>
                    : <div className="text-center mt-5 mb-5"><Spinner /></div> 
                }
            </div>
        )
    }
}

export default Form