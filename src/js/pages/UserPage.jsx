import React from 'react';
import {connect} from 'react-redux'
import * as actions from '../redux/actions.js'
import {Spinner, Row, Col} from 'react-bootstrap'
import { useEffect } from 'react';

function mapDispatchToProps(dispatch){
    return{
        getGitHubData : token => dispatch(actions.getGithubData(token))
    }
}

function mapStateToProps(state){
    return{
        userData : {user: state.user, repos: state.repos},
        token : state.token
        
    }
}

export const UserPage = (props) => {
    
    
    useEffect(() =>{
        props.getGitHubData(props.token)
    }, [true])
    
    console.log("state: ")
    console.log(props.userData)
    console.log("token: ")
    console.log(props.token)
    return(        
        <div>

            <Row>
            <Col></Col>
            {props.userData.repos ? 
            <div>
                <Col>
                <p>Repos found</p>
                </Col>
            </div>
            :
            <div>
                <Col>
                <Spinner animation = "grow"/>
                </Col>
            </div>
            
            }
            <Col></Col>
            </Row>
        </div>
    )

}

const Form = connect(mapStateToProps, mapDispatchToProps)(UserPage);

export default Form

