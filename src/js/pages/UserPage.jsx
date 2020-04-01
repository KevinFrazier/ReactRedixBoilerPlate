import React from 'react';
import {connect} from 'react-redux'
import * as actions from '../redux/actions.js'
import {Spinner, Row, Col, Container} from 'react-bootstrap'
import { useEffect } from 'react';

import ConnectedForm from '../components/articles/Form'
import ConnectedList from '../components/articles/List'
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
                <h2>Logged On</h2>
            </div>
            <div>
            
            <h2>Articles</h2>
            <ConnectedList />
            </div>
            <div>
            <h2>Add a new article</h2>
            <ConnectedForm />
            </div>
            <div>
            <h2>API posts</h2>
            <Post />
            </div>
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

