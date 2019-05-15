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
            categories: [],
            filteredCategories: [],
            searchValue: "",
            deleteLoading: {
                id: '',
                status: false
            },
            formMsg: {
                css: '',
                msg: ''
            }
        }
    }

    componentDidMount(){
        document.title = "All Categories"
        axios.get("/api/categories")
            .then(res => {
                this.setState(() => ({
                    isLoaded: true,
                    categories: res.data,
                    filteredCategories: res.data
                }))
            })
    }

    searchCategory = (e) => {
        const value = e.target.value.toLowerCase()
        this.setState((prevState) => ({
            searchValue: value,
            filteredCategories: prevState.categories.filter(category => category.name.toLowerCase().includes(value))
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
                axios.delete(`/api/admin/categories/${id}`,{
                        headers: { 'x-auth': this.props.user.auth.token }
                    })
                    .then(res => {
                        if(res.data.category){
                            this.setState((prevState) => ({
                                deleteLoading: {
                                    id: '',
                                    status: false
                                },
                                categories: prevState.categories.filter(category => category._id !== id),
                                filteredCategories: prevState.filteredCategories.filter(category => category._id !== id)
                            }))
                        }else{
                            this.setState(() => ({
                                deleteLoading: {
                                    id: '',
                                    status: false
                                },
                                formMsg: {
                                    css: 'danger',
                                    msg: 'Something Went Wrong !'
                                }
                            }))
                        }
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
                                <h1>Categories - { this.state.filteredCategories.length }</h1>
                            </div>
                            <div className="col-6">
                                <div className="rightBtn">
                                    <Link to="/admin/categories/add">Add Category</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                { this.state.isLoaded ? 
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                { this.state.formMsg.msg && <p className={`text-${this.state.formMsg.css}`}>{ this.state.formMsg.msg }</p> }
                            </div>
                            <div className="col-md-6">
                                <form>
                                    <input className="form-control search" 
                                           type="text" 
                                           placeholder="Search Products" 
                                           onChange={this.searchCategory} 
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
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { this.state.filteredCategories.length ? (
                                        this.state.filteredCategories.map((category, index) => {
                                            return (
                                            <tr key={category._id}>
                                                <td>{ index + 1 }</td>
                                                <td>{ category.name }</td>
                                                <td>
                                                    <Link title="Edit" to={`/admin/categories/edit/${category._id}`}>
                                                        <i className="fa fa-pencil text-dark"></i>
                                                    </Link>
                                                    { this.props.user.auth.role === 'admin' && 
                                                        <button title="delete"
                                                                onClick={() => {
                                                                    this.handleDelete(category._id)
                                                                }}
                                                        >   
                                                        { this.state.deleteLoading.id === category._id && this.state.deleteLoading.status ? <i className="fa fa-spin text-danger fa-spinner"></i> : <i className="fa fa-trash text-danger"></i> }
                                                        </button>
                                                    }
                                                </td>
                                            </tr>
                                            )
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="3" className="text-center"> No Category Found </td>
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