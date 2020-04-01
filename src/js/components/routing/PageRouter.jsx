import React from "react";
import * as actions from '../../redux/actions'
import {connect} from 'react-redux'
import * as middle from '../../redux/middle'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
  useLocation
} from "react-router-dom";

import LandingPage from '../../pages/LandingPage.jsx'
import UserPage from '../../pages/UserPage'

function mapStateToProps(state){
  return{
      started : state.startup,
      loggedOn : state.loggedOn,
      user: state.user,
      token: state.token,
  };
}

function mapDispatchToProps(dispatch){
  return{
      
  }
}

export const PageRouter = (props) => {

    console.log("PageRouter:")
    console.log("props:")
    console.log(props)

    return(
          <Router>
          <div>
            <Switch>

                {/* add this home directory aka the LandingPage */}
                <Route exact path = "/">
                    {props.loggedOn ?  <Redirect to = "/dashboards"/> :<LandingPage/>}
                </Route>

                {props.loggedOn ? 
                <div>
                    <Route path="/dashboards">
                        <UserPage/>
                    </Route>
                    <Route path = "/user">
                        <div>
                            <h2>User: {props.user.email}</h2>
                        </div>
                        
                    </Route>
                </div>:null}

                {/* if not logged on, do not Route to other pages, 404 */}
                <Route path = "*">
                    <Redirect to = "/"/>
                </Route>
                
              
            </Switch>
          </div>
          </Router>
        )
}
export default connect(
  mapStateToProps,mapDispatchToProps
)(PageRouter);