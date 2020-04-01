import * as constants from '../constants/action-types'
import { $CombinedState } from 'redux';
import * as firebase from 'firebase/app'
import 'firebase/auth';

const credentials = require('../firebase/credentials.json')

export function addArticle(payload){
    return {type: constants.ADD_ARTICLE, payload}
}

//startup credentials
export function startup(){

    console.log("attempting startup")
    
    firebase.initializeApp(credentials)
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE).catch(function (error){
        console.error(error)
    })
    
    return {type: constants.STARTUP, payload: {startup: true}}
}

export function login(provider){

    if(provider == "Google"){
        return {type: constants.AUTH.GOOGLE, payload: {status: "attempting"}}
    }
    if(provider == "Github"){
        return {type: constants.AUTH.GITHUB, payload: {status: "attempting"}}
    }

    console.error("PROVIDER: " + provider + " is not a valid provider")
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

export function getGithubData(token){

    console.log("getGithubData")
    return function(dispatch){
        
        return fetch("https://api.github.com/user/repos",{
            method: 'GET',
            mode: 'cors',
            //body: JSON.stringify(data),
            headers: {
                "Authorization": "token " + token,
                'Content-Type': 'application/json'
              },
        })

        .then(response => response.json())
        .then(json => {
            //var fs = require('fs')
            //fs.writeFile("./local_storage/githubData.json", json)
            dispatch({ type: constants.GITHUB.GET, payload: {repos: json} });
        })
        .catch(error => {
            console.error("FETCH FAIL: " + error)
        });
        
    }
}