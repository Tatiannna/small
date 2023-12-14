import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import userReducer from './users';
import storyReducer from './stories';
import topicReducer from './topics';
import responseReducer from './responses';
import clapsReducer from './claps';
import logger from 'redux-logger';

const rootReducer = combineReducers({
    session: sessionReducer,
    users: userReducer,
    stories: storyReducer,
    topics: topicReducer,
    responses: responseReducer,
    claps: clapsReducer
});


const configureStore = (initialState = {}) => {
    return createStore(rootReducer, initialState, applyMiddleware(thunk, logger));
};

export default configureStore;
