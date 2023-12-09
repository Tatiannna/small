import csrfFetch from "./csrf";

const RECEIVE_RESPONSES = "/responses/RECEIVE_RESPONSES"

const receiveResponses = (responses) => {
    return {
        type: RECEIVE_RESPONSES,
        responses
    }
}

const getResponses = (storyId) => async (dispatch) => {
    const res = await csrfFetch(`/api/stories/${storyId}/responses`)

    let data = await res.json();
    if (res.ok){
        dispatch(receiveResponses(data));
    }
}

const responseReducer = (state = {}, action) => {
    let newState = {...state}
    switch(action.type){
        case RECEIVE_RESPONSES:
            return {...newState, ...action.responses}
        default:
            return state;
    }
}

export default responseReducer;