import React from "react";
import * as actions from '../redux/actions'
import {connect} from 'react-redux'
import * as middle from '../redux/middle'

import PageRouter from '../components/routing/PageRouter'
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

  render(props){

    return(
      <div>
      {this.props.started ? 
        //spiner would be here
        <PageRouter/>
        :
        <Spinner
        animation = 'grow'
        />
      }
      </div>

      

    )
  }
}
export default connect(
  mapStateToProps,mapDispatchToProps
)(App);