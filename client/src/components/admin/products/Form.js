import React from 'react'
import axios from 'axios'
import Select from 'react-select'
import DatePicker from "react-datepicker"

import { Spinner } from '../../commons/Spinner'

class Form extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            name: '',
            category: null,
            price: '',
            description: '',
            availabeDateTime: new Date(),
            codEligible: null,
            stock: '',
            image: '',

            isLoaded: false,
            categories: []
        }
    }

    componentDidMount(){        
        axios.get("/api/categories")
            .then(res => {
                this.setState(() => ({ 
                    categories: res.data.map(category => ({value: category._id, label: category.name})),
                    isLoaded: true
                }))
            })        
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('image', this.state.image)
        formData.append('name', this.state.name)
        formData.append('category', this.state.category ? this.state.category.value : null)
        formData.append('price', this.state.price)
        formData.append('description', this.state.description)
        formData.append('availabeDateTime', this.state.availabeDateTime)
        formData.append('codEligible', this.state.codEligible ? this.state.codEligible.value : null)
        formData.append('stock', this.state.stock)
        this.props.handleSubmit(formData)
    }

    handleChange = (e) => {
        e.persist()
        this.setState(() => ({
            [e.target.name]: e.target.value
        }))
    }

    // handleValueLabel = (array) => {
    //     return array.map(key => {return {value: key, label: key}})
    // }

    handleCategorySelect = (option) => {
        this.setState(() => ({
            category: option
        }))
    }

    handleCODSelect = (option) => {
        this.setState(() => ({
            codEligible: option
        }))
    }

    handleDate = (date) => {
        this.setState(() => ({
            availabeDateTime: date
        }))
    }

    handleFileChange = (e) => {
        e.persist()
        this.setState(() => ({
            [e.target.name]: e.target.files[0]
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
                                       placeholder="Enter Name" 
                                       name="name" 
                                       value={this.state.name}
                                       onChange={this.handleChange}
                                    />
                            </div>
                            <div className="col-md-5">
                                { this.props.errors.name && <p className="text-danger">{ this.props.errors.name.message }</p> }
                            </div>                                
                            <div className="col-md-3">
                                <label className="label">Category</label>
                            </div>
                            <div className="col-md-4">
                                <Select options={this.state.categories} 
                                        value={this.state.category} 
                                        onChange={this.handleCategorySelect} 
                                />
                            </div>
                            <div className="col-md-5">
                                { this.props.errors.category && <p className="text-danger">{ this.props.errors.category.message }</p> }
                            </div>
                            <div className="col-md-3">
                                <label className="label">Price</label>
                            </div>
                            <div className="col-md-4">
                                <input type="text" 
                                       className="form-control field" 
                                       placeholder="Enter Price" 
                                       name="price" 
                                       value={this.state.price}
                                       onChange={this.handleChange}
                                    />
                            </div>
                            <div className="col-md-5">
                                { this.props.errors.price && <p className="text-danger">{ this.props.errors.price.message }</p> }
                            </div>  
                            <div className="col-md-3">
                                <label className="label">Description</label>
                            </div>
                            <div className="col-md-4">
                                <textarea className="form-control field"
                                          placeholder="Enter Description" 
                                          name="description"
                                          value={this.state.description}
                                          onChange={this.handleChange} 
                                          rows="5" >
                                </textarea>
                            </div>
                            <div className="col-md-5">
                                { this.props.errors.description && <p className="text-danger">{ this.props.errors.description.message }</p> }
                            </div>
                            <div className="col-md-3">
                                <label className="label">COD Available</label>
                            </div>
                            <div className="col-md-4">
                                <Select options={[{value: true, label: 'Yes'}, {value: false, label: 'No'}]} 
                                        value={this.state.codEligible} 
                                        onChange={this.handleCODSelect} 
                                />
                            </div>
                            <div className="col-md-5">
                                { this.props.errors.codEligible && <p className="text-danger">{ this.props.errors.codEligible.message }</p> }
                            </div>
                            <div className="col-md-3">
                                <label className="label">Stock</label>
                            </div>
                            <div className="col-md-4">
                                <input type="text" 
                                       className="form-control field" 
                                       placeholder="Enter Stock" 
                                       name="stock" 
                                       value={this.state.stock}
                                       onChange={this.handleChange}
                                    />
                            </div>
                            <div className="col-md-5">
                                { this.props.errors.stock && <p className="text-danger">{ this.props.errors.stock.message }</p> }
                            </div> 
                            <div className="col-md-3">
                                <label className="label">Available On</label>
                            </div>
                            <div className="col-md-4">
                                <DatePicker selected={this.state.availabeDateTime}
                                            onChange={this.handleDate}
                                            dateFormat="d/M/Y"
                                />
                            </div>
                            <div className="col-md-5">
                                { this.props.errors.availabeDateTime && <p className="text-danger">{ this.props.errors.description.message }</p> }
                            </div> 
                            <div className="col-md-3">
                                <label className="label">Image</label>
                            </div>
                            <div className="col-md-4">
                                <input type="file" 
                                       className="form-control field" 
                                       name="image" 
                                       onChange={this.handleFileChange}
                                    />
                            </div>
                            <div className="col-md-5">
                                { this.props.errors.image && <p className="text-danger">{ this.props.errors.image.message }</p> }
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