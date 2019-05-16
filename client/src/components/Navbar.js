import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const Navbar = (props) => {
    return (
        <React.Fragment>
            <header className="header">
                <div className="container">
                    <nav className="navbar navbar-expand-lg">
                        <Link to="/" className="navbar-brand">
                            Ecommerce
                        </Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarMenu">
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarMenu">
                            <ul className="navbar-nav ml-auto">  
                                <li className="nav-item">
                                    <Link to="/" className="nav-link">Home</Link>
                                </li>
                                { props.user.auth.role === "customer" ?
                                    <React.Fragment>                                        
                                        {/* <li className="nav-item">
                                            <Link to="/cart" className="nav-link">Cart</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/wishlists" className="nav-link">Wishlists</Link>
                                        </li> */}
                                        <li className="nav-item">
                                            <Link to="/orders" className="nav-link">Orders</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/logout" className="nav-link logout">Logout</Link>
                                        </li>
                                    </React.Fragment> : 
                                    props.user.auth.role === "admin" || props.user.auth.role === "moderator" ?
                                    <React.Fragment>                                        
                                        <li className="nav-item">
                                            <Link to="/admin/products" className="nav-link">Products</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/admin/categories" className="nav-link">Categories</Link>
                                        </li>
                                        {/* <li className="nav-item">
                                            <Link to="/admin/users" className="nav-link">Users</Link>
                                        </li> */}
                                        <li className="nav-item">
                                            <Link to="/admin/orders" className="nav-link">Orders</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/logout" className="nav-link logout">Logout</Link>
                                        </li>
                                    </React.Fragment> : 
                                    <React.Fragment>
                                        <li className="nav-item">
                                            <Link to="/login" className="nav-link">Login</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/register" className="nav-link">Register</Link>
                                        </li>
                                    </React.Fragment>
                                }
                            </ul>
                        </div>
                    </nav>
                </div>
            </header>
    </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Navbar)