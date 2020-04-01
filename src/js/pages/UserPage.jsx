import React from 'react';
import {connect} from 'react-redux'
import * as actions from '../redux/actions.js'
import {Spinner, Row, Col, Container} from 'react-bootstrap'
import { useEffect } from 'react';

import ConnectedForm from '../components/articles/Form'
import ConnectList from '../components/articles/List'
import Post from '../components/articles/Post'

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

            <Container>
            <Col></Col>
            {props.userData.repos ? 
            <div>
            <div>
            <a>Repos found</a>
            </div>
            <div>
            <a>Articles</a>
            <ConnectList/>
            </div>
            <div><a>Form</a></div>
            <ConnectedForm/>
            
            <a>Fetched Articles</a>
            <Post/>
            </div>
            :
            <div>
                <Col>
                <Spinner animation = "grow"/>
                </Col>
            </div>
            
            }
            <Col></Col>
            </Container>
        </div>
    )

}

const Form = connect(mapStateToProps, mapDispatchToProps)(UserPage);

export default Form

