import React from 'react'
import { connect } from 'react-redux'
import axios from "axios"

import { removeUser } from "../../actions/user"

class Logout extends React.Component {

    componentDidMount(){
        axios.delete("/api/users/logout",{
                headers: {
                    "x-auth": this.props.user.auth.token
                }
            })
            .then(res => {
                if(res.data.success){
                    this.props.history.push("/login")
                    localStorage.removeItem("token")
                    this.props.dispatch(removeUser())
                }
            })
    }

    render(){
        return(
            <React.Fragment></React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Logout)