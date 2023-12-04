import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import logger from 'redux-logger';



const rootReducer = combineReducers({
    session: sessionReducer
});


const configureStore = (initialState = {}) => {
    return createStore(rootReducer, initialState, applyMiddleware(thunk, logger));
};

export default configureStore;
