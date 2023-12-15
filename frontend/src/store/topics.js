import csrfFetch from "./csrf";

const RECEIVE_TOPICS = '/topics/RECEIVE_TOPICS';
const RECEIVE_TOPIC = '/topics/RECEIVE_TOPIC';
const REMOVE_TOPIC = '/topics/REMOVE_TOPIC';


const receiveTopics = (topics) => {
    return {
        type: RECEIVE_TOPICS,
        topics
    }
}
const receiveTopic = (topic) => {
    return {
        type: RECEIVE_TOPIC,
        topic
    }
}

// const removeTopic = (id) => {
//     return {
//         type: REMOVE_TOPIC,
//         id
//     }
// }

export const getTopics = (filter= {}) => async dispatch => {
    let res;

    if(filter.topicName){
        res = await csrfFetch(`/api/stories/topics?topicName=${filter.topicName}`);
    }else{
        res = await csrfFetch('/api/stories/topics');
    }

    let data = await res.json();
    if(res.ok){
        dispatch(receiveTopics(data));
    }else{
        throw data;
    }
}

export const getTopic = (id) => async dispatch => {
    let res = await csrfFetch(`/api/stories/topics/${id}`);


    let data = await res.json();
    if(res.ok){
        dispatch(receiveTopic(data));
    }else{
        throw data;
    }
}

const topicReducer  = (state = {}, action) => {
    let newState = {...state};
    switch (action.type){
        case RECEIVE_TOPICS:
            return action.topics;
        case RECEIVE_TOPIC:
            newState[action.topic.id] = action.topic
            return newState;
        case REMOVE_TOPIC:
            delete newState[action.id]
            return newState;
        default: 
            return state
    }
}

export default topicReducer;