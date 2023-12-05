import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import userReducer from './users';


const rootReducer = combineReducers({
    session: sessionReducer,
    user: userReducer
});


const configureStore = (initialState = {}) => {
    return createStore(rootReducer, initialState, applyMiddleware(thunk));
};

export default configureStore;
