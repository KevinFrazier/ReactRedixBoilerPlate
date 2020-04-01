import React from 'react'
import {connect} from 'react-redux'
import * as actions from '../../redux/actions'

function mapStateToProps(state){
    return{
        loggedOn : state.loggedOn,
    };
}

function mapDispatchToProps(dispatch){
    return{
        attemptLogin: loginMethod => dispatch(actions.login(loginMethod))
    }
}
export const Login = (props) =>{
    
    return (
        <button onClick = {() => props.attemptLogin(props.method)}> {props.loggedOn ? "Logged On" :"Not Logged"} </button>
    )
}

export default connect(
    mapStateToProps,mapDispatchToProps
)(Login)