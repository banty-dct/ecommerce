import React from 'react' 
import axios from 'axios'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { saveUser, authStatus } from '../../actions/user'

class Login extends React.Component {
    constructor(props) {
        const formStatus = props.user.formStatus
        super(props) 
        this.state = {
            username_email: '',
            password: '',
            formStatus: {
                status: formStatus ? formStatus.status : '',
                msg: formStatus ? formStatus.msg : '',
                css: formStatus ? formStatus.css : ''
            },
            submitBtn: 'Login'
        }
    }

    componentDidMount(){
        document.title = "Login"
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            username_email: this.state.username_email,
            password: this.state.password
        }        
        this.setState(() => ({
            submitBtn: ''
        }))
        this.props.dispatch(authStatus(false, '', ''))

        axios.post(`/api/users/login`, formData)
            .then(response => {
                if (response.data === "invalid credentials") {
                    this.setState(() => ({
                        formStatus: {
                            status: true,
                            msg: "invalid credentials",
                            css: 'danger'
                        },
                        password: '',
                        submitBtn: 'Login'
                    }))
                } else {
                    this.props.dispatch(saveUser(response.data))
                    localStorage.setItem('token', JSON.stringify(response.data.token))
                    response.data.role === "admin" || response.data.role === "moderator" ? this.props.history.push("/admin/") : this.props.history.push("/")
                }
            })
    }

    handleChange = (e) => {
        e.persist()
        this.setState(() => ({
            [e.target.name]: e.target.value
        }))
    }

    componentWillMount(){
        document.title = "Login"
    }

    render() {
        return (
            <React.Fragment>
                <div className="loginBlock">
                    <div>
                        <h2>Login </h2>
                        <form onSubmit={this.handleSubmit}>
                            
                            <input type="text"
                                name="username_email"
                                value={this.state.username_email}
                                onChange={this.handleChange}
                                className="form-control"
                                placeholder="Username / Email"
                            />
                        
                            <input type="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                                className="form-control"
                                placeholder="Password"
                            />      

                            { this.state.formStatus.status && <p className={`formStatus text-${this.state.formStatus.css}`}>{ this.state.formStatus.msg }</p> }

                            <div className="loginFooter">
                                <button type="submit" className="btn">
                                    {this.state.submitBtn === 'Login' ? 'Login' : <i className="fa fa-spin fa-spinner"></i>}
                                </button>
                                <Link to="/register">Create an account</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}   

export default connect(mapStateToProps)(Login)