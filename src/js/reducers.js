import * as constants from './constants/action-types'
const initialState = {
    articles: [],
    remoteArticles: [],
    db : null,
    lastPost : null,
    fetchedData : false
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
    
    if(action.type === constants.CONFIG){
        return Object.assign({}, state, {
            db : action.payload
        } )
    }

    if(action.type == constants.POST_DATA){
        return Object.assign({}, state, {
            lastPost : action.payload
        })
    }
    return state
}

export default rootReducer