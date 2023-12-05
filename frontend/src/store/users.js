import csrfFetch from "./csrf"
import { login } from "./session";


const RECEIVE_USER = "/user/ADD_USER";
const DELETE_USER = "/user/DELETE_USER";


export const receiveUser = (user) => {
    return {
        type: RECEIVE_USER,
        user
    }
}

export const deleteUser = () => {
    return {
        type: DELETE_USER
    }
}

export const createUser = ({email, username, password}) => async (dispatch) => {
    const res = await csrfFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({email, username, password})
    })

    let data;
    if (res.ok){
        data = await res.json();
        dispatch(receiveUser(data));
        dispatch(login({email, password}))
    }else {
        data = await res.json();
        throw data;
    }
}

const userReducer = (state = {}, action) => {
    let newState = {...state}
    switch (action.type){
        case RECEIVE_USER:
            return {...newState, user: action.user};
        case DELETE_USER:
            return {...newState, user: null}
        default:
            return state;
    }
}

export default userReducer;