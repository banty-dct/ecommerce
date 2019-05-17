import React from 'react'
import { connect } from 'react-redux'
import axios from "axios"

import { Spinner } from "../commons/Spinner"

class OrderView extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            order: {},
            isLoaded: false
        }
    }

    componentDidMount(){        
        document.title = "View Order"
        const id = this.props.match.params.id
        axios.get(`/api/orders/${id}`,{
                headers: { "x-auth": this.props.user.auth.token }
            })
            .then(res => {
                this.setState(() => ({
                    order: res.data,
                    isLoaded: true
                }))
                console.log(res.data)
            })
    }

    render(){
        return (
            <div className="singleOrder">
                { this.state.isLoaded ? 
                    <div className="container"> 
                        <h1>My Orders</h1> 
                        <div className="row">
                            <div className="col-md-6">

                            </div>
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

export default connect(mapStateToProps)(OrderView)