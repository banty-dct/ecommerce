import React from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { connect } from 'react-redux'

import { Spinner } from "../../commons/Spinner"

class ViewAll extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isLoaded: false,
            products: [],
            filteredProducts: [],
            searchValue: "",
            deleteLoading: {
                id: '',
                status: false
            }
        }
    }

    componentDidMount(){
        document.title = "View All Products"
        axios.get("/api/products")
            .then(res => {
                this.setState(() => ({
                    isLoaded: true,
                    products: res.data,
                    filteredProducts: res.data
                }))
            })
    }

    searchProduct = (e) => {
        const value = e.target.value.toLowerCase()
        this.setState((prevState) => ({
            searchValue: value,
            filteredProducts: prevState.products.filter(product => product.name.toLowerCase().includes(value))
        }))
    }

    handleDelete = (id) => {
        if(this.props.user.auth.role === 'admin'){
            if(window.confirm("Are you sure")){
                this.setState(() => ({
                    deleteLoading: {
                        id, status: true
                    }
                }))
                axios.delete(`/api/admin/products/${id}`,{
                        headers: { 'x-auth': this.props.user.auth.token }
                    })
                    .then(res => {
                        console.log(res.data)
                        // if(res.data.expense){
                        //     this.setState((prevState) => ({
                        //         deleteLoading: {
                        //             id: '',
                        //             status: false
                        //         },
                        //         expenses: prevState.expenses.filter(expense => expense._id !== id),
                        //         filteredExpenses: prevState.filteredExpenses.filter(expense => expense._id !== id)
                        //     }))
                        // }else{
                        //     this.setState(() => ({
                        //         deleteLoading: {
                        //             id: '',
                        //             status: false
                        //         },
                        //         formMsg: {
                        //             css: 'danger',
                        //             msg: 'Something Went Wrong !'
                        //         }
                        //     }))
                        // }
                    })
            }
        }else{
            window.alert(`You don't have permission to delete`)
        }
    }

    render(){
        return (
            <div className="admin">
                <div className="headTitle">
                    <div className="container">
                        <div className="row">
                            <div className="col-6">
                                <h1>Products - { this.state.filteredProducts.length }</h1>
                            </div>
                            <div className="col-6">
                                <div className="rightBtn">
                                    <Link to="/admin/products/add">Add Product</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                { this.state.isLoaded ? 
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                
                            </div>
                            <div className="col-md-6">
                                <form>
                                    <input className="form-control search" 
                                           type="text" 
                                           placeholder="Search Products" 
                                           onChange={this.searchProduct} 
                                           value={this.state.searchValue} 
                                        />
                                </form>
                            </div>
                        </div>
                        <div className="tableCover">
                            <table className="table table-hover table-bordered">
                                <thead>
                                    <tr>
                                        <th>Sl. No.</th>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Category</th>
                                        <th>Available Time</th>
                                        <th>Stock</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { this.state.filteredProducts.length ? (
                                        this.state.filteredProducts.map((product, index) => {
                                            return (
                                            <tr key={product._id}>
                                                <td>{ index + 1 }</td>
                                                <td>{ product.name }</td>
                                                <td>{ product.price }</td>
                                                <td>{ product.category }</td>
                                                <td>{ product.availabeDateTime }</td>
                                                <td>{ product.stock }</td>
                                                <td>
                                                    <Link title="Edit" to={`/admin/products/edit/${product._id}`}>
                                                        <i className="fa fa-pencil text-dark"></i>
                                                    </Link>
                                                    <Link title="View" to={`/admin/products/view/${product._id}`}>
                                                        <i className="fa fa-book text-primary"></i>
                                                    </Link>
                                                    { this.props.user.auth.role === 'admin' && 
                                                        <button title="delete"
                                                                onClick={() => {
                                                                    this.handleDelete(product._id)
                                                                }}
                                                        >   
                                                        { this.state.deleteLoading.id === product._id && this.state.deleteLoading.status ? <i className="fa fa-spin text-danger fa-spinner"></i> : <i className="fa fa-trash text-danger"></i> }
                                                        </button>
                                                    }
                                                </td>
                                            </tr>
                                            )
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="7" className="text-center"> No Product Found </td>
                                        </tr>
                                    )}
                                    
                                </tbody>
                            </table>
                        </div>
                    </div> : <div className="text-center mt-5 mb-5"><Spinner /></div>
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
  
  export default connect(mapStateToProps)(ViewAll)