import * as constants from './constants/action-types'


export function addArticle(payload){
    return {type: constants.ADD_ARTICLE, payload}
}

export function getData(){
    return function(dispatch){
        console.log("fetching")
        //console.log(this.store.getState())
        return fetch("https://jsonplaceholder.typicode.com/posts")
        .then(response => response.json())
        .then(json => {
            dispatch({ type: "DATA_LOADED", payload: json });
        });
    };
}
