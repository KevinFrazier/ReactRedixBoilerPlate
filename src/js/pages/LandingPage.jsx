import React, {setEffect} from 'react'
import {connect} from 'react-redux'
import Login from '../components/authentication/Authentication'
import {Row, Col, Container} from 'react-bootstrap'

export const LandingPage = (props) =>{
    
    return(
      <Container>

        <Row>
          <Col></Col>
          <Col><Login method = "Github"/></Col>
          <Col></Col>
        </Row>
      </Container>



    )
}

export default connect(null, null)(LandingPage)