import csrfFetch from "./csrf";


const RECEIVE_CLAPS = '/claps/RECEIVE_CLAPS';
const RECEIVE_CLAP = '/claps/RECEIVE_CLAP';
const REMOVE_CLAP = '/claps/REMOVE_CLAP';
const REMOVE_CLAPS = '/claps/REMOVE_CLAPS';


const receiveClaps = (claps) => {
    return {
        type: RECEIVE_CLAPS,
        claps
    }
}

const receiveClap = (clap) => {
    return {
        type: RECEIVE_CLAP,
        clap
    }
}

const removeClap = (id) => {
    return {
        type: REMOVE_CLAP,
        id
    }
}

export const removeClaps = () => {
    return {
        type: REMOVE_CLAPS
    }
}

export const getClaps = (storyId) => async (dispatch) => {
    const res = await csrfFetch(`/api/stories/${storyId}/claps`);

    let data = await res.json();
    if (res.ok){
        dispatch(receiveClaps(data))
    }else{
        throw(data)
    }
}

export const createClap = (clap) => async (dispatch) => {
    const res = await csrfFetch(`/api/stories/${clap.storyId}/claps`, {
        method: "POST",
        body: JSON.stringify(clap)
    });

    let data = await res.json();
    if (res.ok){
        dispatch(receiveClap(data))
    }else{
        throw(data)
    }
}

export const deleteClap = (clap) => async (dispatch) => {
    const res = await csrfFetch(`/api/stories/${clap.storyId}/claps/${clap.id}`, {
        method: "DELETE"
    });

    if (res.ok){
        dispatch(removeClap(clap.id))
    }else{
        throw(res)
    }
}


const clapsReducer = (state = {}, action) => {
    let newState = {...state}
    switch(action.type){
        case RECEIVE_CLAPS:
            newState = {};
            return {...action.claps}
        case RECEIVE_CLAP:
            newState[action.clap.id] = action.clap;
            return newState;
        case REMOVE_CLAP:
            delete newState[action.id];
            return newState;
        case REMOVE_CLAPS:
            return {};
        default:
            return state;
    }
}

export default clapsReducer;