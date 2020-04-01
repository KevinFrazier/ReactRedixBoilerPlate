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