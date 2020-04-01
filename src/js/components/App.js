import React from "react";
import UserPage from '../pages/UserPage'
import LandingPage from '../pages/LandingPage.jsx'
import * as actions from '../redux/actions'
import {connect} from 'react-redux'

import * as middle from '../redux/middle'

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
  useLocation
} from "react-router-dom";

import {Spinner} from 'react-bootstrap'

function mapStateToProps(state){
  return{
      started : state.startup,
      loggedOn : state.loggedOn
  };
}

function mapDispatchToProps(dispatch){
  return{
      startup: () => dispatch(actions.startup()),
  }
}

class App extends React.Component{

  constructor(props){
    super(props)
  }

  componentDidMount(){
    this.props.startup()    
  }

  renderRoutes(){
    return(
          <Router>
          <div>
            <Switch>
              <Route exact path="/">        
                {this.props.loggedOn ? 
                <Redirect to = "/dashboards"/>
                :
                <LandingPage/>
                }
                

              </Route>
              <Route path="/dashboards">
                
                {this.props.loggedOn ? 
                  <UserPage/>

                  :
                  <div>
                    <Redirect to= "/"/>
                  </div>
                  
                }
                
                
              </Route>
              
            </Switch>
          </div>
          </Router>
        )
  }
  render(props){

    return(
      <div>
      {this.props.started ? 
        //spiner would be here
        this.renderRoutes()
        :
        <p>Attempting</p>
      }
      </div>

      

    )
  }
}
export default connect(
  mapStateToProps,mapDispatchToProps
)(App);