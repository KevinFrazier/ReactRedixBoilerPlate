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

export class Post extends React.Component{
    constructor(props){
        super(props)

    }

    componentDidMount(){
        console.log("getting data")
        this.props.getData()
    }

    render(){

        console.log("fetchedData: " + this.props.fetchedData)
        if(this.props.fetchedData){
            
            const aggregateArticles = this.props.articles[0]
            console.log("this.props.articles:")
            console.log(Object.values(aggregateArticles))
            
            return (
                <ul>
                {Object.values(aggregateArticles).map(el => (
                    <li key={el.id}>{el.title}</li>
                ))}
                </ul>
            );
        }

        return(
            <div><p>fetching Data!</p></div>
        )
    }

     
}

export default connect(
    mapStateToProps,mapDispatchToProps
)(Post)