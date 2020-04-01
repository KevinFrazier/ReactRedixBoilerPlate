import React from 'react';
import {connect} from 'react-redux'
import * as actions from '../../redux/actions'

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
        
        this.props.getData()
    }

    render(){

        
        if(this.props.fetchedData){
            
            const aggregateArticles = this.props.articles[0]
            
            
            
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