import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import userReducer from './users';
import storyReducer from './stories';
import topicReducer from './topics';


const rootReducer = combineReducers({
    session: sessionReducer,
    user: userReducer,
    stories: storyReducer,
    topics: topicReducer
});


const configureStore = (initialState = {}) => {
    return createStore(rootReducer, initialState, applyMiddleware(thunk));
};

export default configureStore;
