import csrfFetch from "./csrf";

const RECEIVE_TOPICS = '/topics/RECEIVE_TOPICS';
const RECEIVE_TOPIC = '/tpoics/RECEIVE_TOPIC';
const REMOVE_TOPIC = '/tpoics/REMOVE_TOPIC';


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

const removeTopic = (id) => {
    return {
        type: REMOVE_TOPIC,
        id
    }
}

export const getTopics = () => async dispatch => {
    const res = await csrfFetch('/api/stories/topics');

    let data = await res.json();
    if(res.ok){
        dispatch(receiveTopics(data));
    }else{
        throw data;
    }
}

export const getTopic = (id) => async dispatch => {
    const res = await csrfFetch(`/api/stories/topics/${id}`);

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
            return {...newState, ...action.topics};
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