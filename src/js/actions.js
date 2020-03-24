import * as constants from './constants/action-types'
import { $CombinedState } from 'redux';

export function addArticle(payload){
    return {type: constants.ADD_ARTICLE, payload}
}


//Fetch GET data as a json from url
export function getData(){
    return function(dispatch){
        console.log("fetching")
        //console.log(this.store.getState())
        return fetch("https://react-redux-tutorial-7fcec.firebaseio.com/articles/.json",{
            method: 'GET',
            mode: 'cors',
            //body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
        })

        .then(response => response.json())
        .then(json => {
            dispatch({ type: constants.DATA_LOADED, payload: json });
        });
    };
}

/*
pushes data into new ID Key in Firebase RDB
*/
export function postData(data){
    return function(dispatch){
        console.log("fetching")
        //console.log(this.store.getState())
        return fetch("https://react-redux-tutorial-7fcec.firebaseio.com/articles.json",{
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
        })

        .then(response => response.json())
        .then(json => {
            dispatch({ type: constants.POST_DATA, payload: data });
        });
    };
}