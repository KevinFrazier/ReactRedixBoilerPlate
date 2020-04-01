import * as constants from '../constants/action-types'
const initialState = {
    articles: [],
    remoteArticles: [],
    db : null,
    lastPost : null,
    fetchedData : false,
    loggedOn: false,
    user: null,
    startup: false,
    files: null,

}

//where the states come from
function rootReducer(state = initialState, action){
    
    if(action.type === constants.ADD_ARTICLE){
        return Object.assign({}, state,{
            articles: state.articles.concat(action.payload)
        });
    }

    if(action.type === constants.DATA_LOADED){

        return Object.assign({}, state,{
            remoteArticles: state.remoteArticles.concat(action.payload),
            fetchedData: true,
        })
    }
    
    if(action.type == constants.POST_DATA){
        return Object.assign({}, state, {
            lastPost : action.payload
        })
    }

    if(action.type == constants.STARTUP){
        console.log("updating startup state")
        return Object.assign({},state, {startup : true})
    }
    if(action.type == constants.LOGIN){
        
        console.log("action payload:")
        console.log(action.payload)
        return Object.assign({},state, action.payload)
    }
    if(action.type == constants.GITHUB.GET){
        return Object.assign({},state, action.payload)
    }
    
    return state

    
}

export default rootReducer