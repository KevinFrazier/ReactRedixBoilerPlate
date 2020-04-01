import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducers.js';
import * as middle from './middle';
import * as thunk from 'redux-thunk'

//const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const MIDDLEWARES = Object.values(thunk).concat(Object.values(middle))
const store = createStore(
    rootReducer,
    //storeEnhancers(applyMiddleware(forbiddenWordsMiddleware))
    applyMiddleware(...MIDDLEWARES)
    )
//tips: can pass initial state to createStore -> server side rendering, state preloading

export default store