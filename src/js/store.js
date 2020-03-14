import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducers.js';
import { forbiddenWordsMiddleware } from './middle';
import thunk from 'redux-thunk'

//const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    //storeEnhancers(applyMiddleware(forbiddenWordsMiddleware))
    applyMiddleware(forbiddenWordsMiddleware, thunk)
    )
//tips: can pass initial state to createStore -> server side rendering, state preloading

export default store