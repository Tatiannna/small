import csrfFetch from "./csrf";
import {deleteUser, receiveUser} from "./users";

const SET_USER = '/session/SET_USER';
const REMOVE_USER = '/session/REMOVE_USER';



const setUser = user => {
    return ({
        type: SET_USER,
        user
    })
}

const removeUser = () => {
    return ({type: REMOVE_USER})
}

export const login = ({email, password}) => async (dispatch) => {
    const res = await csrfFetch('/api/session', {
        method: "POST",
        body: JSON.stringify({email, password})
    })

    let data;
    if (res.ok){
        data = await res.json();
        dispatch(setUser(data));
        dispatch(receiveUser(data));
    }else{
        data = await res.json();
        throw data;
    }
}

export const logout = () => async (dispatch) => {
    const res = await csrfFetch('/api/session', {
        method: "DELETE"
    })

    if (res.ok){
        dispatch(removeUser());
        dispatch(deleteUser())
    }else{
        throw res;
    }
}


const sessionReducer = (state = {}, action) => {
    let newState = {...state}
    switch(action.type){
        case SET_USER:
            newState = action.user;
            return newState;
        case REMOVE_USER:
            newState.user = null;
            return newState;
        default:
            return state;
    }
}

export default sessionReducer;