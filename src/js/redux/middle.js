import * as constants from '../constants/action-types'
import * as firebase from 'firebase/app'

const forbiddenWords = ['spam', 'money']

export function forbiddenWordsMiddleware({dispatch}){
    return function(next){
        return function(action){
            if(action.type == constants.ADD_ARTICLE){
                
                const foundWord = forbiddenWords.filter(word =>
                    action.payload.title.includes(word)
                );

                if(foundWord.length){
                    return dispatch({ type: "FOUND_BAD_WORD"});
                }

            }

            return next(action)
            
        
        }
    }
}

export function authenticationMiddleware({dispatch}){
    return function(next){
        return function(action){

            if(action.type == constants.AUTH.GOOGLE){
                
                // Using a popup.
                var provider = new firebase.auth.GoogleAuthProvider();
                provider.addScope('profile');
                provider.addScope('email');
                
                firebase.auth().signInWithPopup(provider).then(function(result) {
                    // This gives you a Google Access Token.
                    var token = result.credential.accessToken;
                    // The signed-in user info.
                    var user = result.user;
                    console.log("login success")
                    dispatch({type: constants.LOGIN, payload: {status: "success", user: user, token: token, provider: provider, loggedOn : true}})
                }).catch(function(error){
                    
                });
                
            }
            if(action.type == constants.AUTH.GITHUB){
        
                // With popup.
                var provider = new firebase.auth.GithubAuthProvider();
                provider.addScope('profile');
                provider.addScope('email');
                provider.addScope('repo');
                
                firebase.auth().signInWithPopup(provider).then(function(result) {
                // This gives you a GitHub Access Token.
                    var token = result.credential.accessToken;
                    // The signed-in user info.
                    var user = result.user;
                    console.log("login success")
                    dispatch({type: constants.LOGIN, payload: {status: "success", user: user, token: token, provider: provider, loggedOn : true}})

                }).catch(function(error) {
                    // Handle Errors here.
                    
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // The email of the user's account used.
                    var email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    var credential = error.credential;

                    // if (errorCode === 'auth/account-exists-with-different-credential') {
                    //     alert('You have signed up with a different provider for that email.');
                    //     // Handle linking here if your app allows it.
                        
                    // } else {
                    //     console.error(error);
                    // }
                });
        
            }

            return next(action)
        
        }
    }
}