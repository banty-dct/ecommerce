import React from 'react'
import { connect } from 'react-redux'

class Home extends React.Component {

    componentDidMount(){        
        document.title = "Home"
    }

    render(){
        return (
            <React.Fragment>
                
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