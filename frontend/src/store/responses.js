import csrfFetch from "./csrf";

const RECEIVE_RESPONSES = "/responses/RECEIVE_RESPONSES";
const RECEIVE_RESPONSE = "/responses/RECEIVE_RESPONSE";
const CLEAR_RESPONSES = "/responses/CLEAR_RESPONSES";
const REMOVE_RESPONSE = "/responses/REMOVE_RESPONSE";
// const EDIT_RESPONSE = "/responses/EDIT_RESPONSE";


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

// const editResponse = (response) => {
//     return {
//         type: RECEIVE_RESPONSE,
//         response
//     }
// }

export const clearResponses = () => {
    return {
        type: CLEAR_RESPONSES
    }
}


const removeResponse = (id) => {
    return {
        type: REMOVE_RESPONSE,
        id
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

export const deleteResponse = (resp) => async (dispatch) => {
    const res = await csrfFetch(`/api/stories/${resp.storyId}/responses/${resp.id}`, {
        method: "DELETE",
    })
    
    if (res.ok){
        dispatch(removeResponse(resp.id));
    }else {
        throw(data);
    }
}

export const updateResponse = (response) => async dispatch => {
    const res = await csrfFetch(`/api/stories/${response.storyId}/responses/${response.id}`, {
        method: "PATCH",
        body: JSON.stringify(response)
    })

    let data = await res.json()
    if (res.ok){
        dispatch(receiveResponse(data))
    }else{
        throw data;
    }
}

const responseReducer = (state = {}, action) => {
    let newState = {...state}
    switch(action.type){
        case RECEIVE_RESPONSES:
            return {...newState, ...action.responses}
        case RECEIVE_RESPONSE:
            newState[action.response.id] = action.response;
            return newState;
        case CLEAR_RESPONSES:
            newState = {};
            return newState;
        case REMOVE_RESPONSE:
            delete newState[action.id]
            return newState;
        default:
            return state;
    }
}

export default responseReducer;