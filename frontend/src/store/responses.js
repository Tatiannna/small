import csrfFetch from "./csrf";

const RECEIVE_RESPONSES = "/responses/RECEIVE_RESPONSES";
const RECEIVE_RESPONSE = "/responses/RECEIVE_RESPONSE";
const CLEAR_RESPONSES = "/responses/CLEAR_RESPONSES";

const receiveResponses = (responses) => {
    return {
        type: RECEIVE_RESPONSES,
        responses
    }
}

const receiveResponse = (response) => {
    return {
        type: RECEIVE_RESPONSE,
        response
    }
}

export const clearResponses = () => {
    return {
        type: CLEAR_RESPONSES
    }
}



export const getResponses = (storyId) => async (dispatch) => {
    const res = await csrfFetch(`/api/stories/${storyId}/responses`)
    
    let data = await res.json();
    if (res.ok){
        dispatch(receiveResponses(data));
    }else {
        throw(data);
    }
}

export const createResponse = (response) => async (dispatch) => {
    const res = await csrfFetch(`/api/stories/${response.storyId}/responses`, {
        method: "POST",
        body: JSON.stringify(response)
    })
    
    let data = await res.json();
    if (res.ok){
        dispatch(receiveResponse(data));
    }else {
        throw(data);
    }
}

const responseReducer = (state = {}, action) => {
    let newState = {...state}
    switch(action.type){
        case RECEIVE_RESPONSES:
            return {...newState, ...action.responses}
        case RECEIVE_RESPONSE:
            return {...newState, ...action.response}
        case CLEAR_RESPONSES:
            newState = {};
            return newState;
        default:
            return state;
    }
}

export default responseReducer;