import React from 'react'
import { connect } from 'react-redux'

class Home extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isLoaded: false
        }
    }

    componentDidMount(){
        this.props.user.auth !== 'false' ? this.setState(() => ({ isLoaded: true})) : this.props.history.push("/login")
        document.title = "Home"
    }

    render(){
        return (
            <React.Fragment>
                { this.state.isLoaded &&
                    <div className="app">
                        <div className="wrapper">
                            
                        </div>
                    </div>
                }
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Home)