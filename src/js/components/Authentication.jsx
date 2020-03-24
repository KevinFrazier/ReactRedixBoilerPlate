import React from 'react';
import {connect} from 'react-redux'
import * as actions from '../actions'

function mapStateToProps(state){
    return{
        articles: state.remoteArticles.slice(0,10),
        fetchedData : state.fetchedData
    };
}

function mapDispatchToProps(dispatch){
    return{
        getData: () => dispatch(actions.getData())
    }
}

export class Login extends React.Component{
    constructor(props){
        super(props)

        this.handleLogin = this.handleLogin.bind(this)
    }

    componentDidMount(){
        
    }

    handleLogin(){

    }

    render(){

        return (
            <button onClick = {this.handleLogin}> </button>
        )
    }

     
}

export default connect(
    mapStateToProps,mapDispatchToProps
)(Login)