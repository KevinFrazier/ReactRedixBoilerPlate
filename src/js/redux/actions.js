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
    
    //initialize credentials
    firebase.initializeApp(credentials)

    //for 3rd party OAuth providers (FB, Twitter, etc), in order to keep persistence, you must retrieve the access token of the user
    //firebase doesn't refresh this for you
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE).catch(function (error){
        console.error(error)
    })
    
    firebase.auth().onAuthStateChanged(function(user){
        if(user){

        }
        else{
            console.log("No user is logged on")
        }
    })

    return{type: constants.STARTUP, payload: {startup: true, loggedOn: false, sessionExpired: true}}

    
}

export function login(provider){

    // if(provider == "Google"){
    //     return {type: constants.AUTH.GOOGLE, payload: {status: "attempting"}}
    // }
    // if(provider == "Github"){
    //     return {type: constants.AUTH.GITHUB, payload: {status: "attempting"}}
    // }

    // console.error("PROVIDER: " + provider + " is not a valid provider")
    
    var myProvider = null
    switch(provider){
        case "Google":
            myProvider = new firebase.auth.GoogleAuthProvider();
            break;
        case "Github":
            myProvider = new firebase.auth.GithubAuthProvider();
            myProvider.addScope('repo');
            break;
        default:
            console.error("PROVIDER: " + provider + " is not a valid provider")
            return
            break;
    }
    
    if(myProvider){
                
        // Using a popup.
        myProvider.addScope('profile');
        myProvider.addScope('email');
        
        return function(dispatch){
            
            firebase.auth().signInWithPopup(myProvider).then(function(result) {
                // This gives you a Google Access Token.
                var token = result.credential.accessToken;
                // The signed-in user info.
                var user = result.user;
                console.log("login success:")
                console.log("credentials:")
                console.log(result.credential)
                

                dispatch({type: constants.LOGIN, payload: {status: "success", user: user, token: token, provider: provider, loggedOn : true}})    
            })
            .catch(function(error){
                
            });
        }
        
    }
   
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