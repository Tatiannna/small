import csrfFetch from "./csrf"
import { login } from "./session";


const RECEIVE_USER = "/user/ADD_USER";

const receiveUser = (user) => {
    return {
        type: RECEIVE_USER,
        user
    }
}


export const createUser = ({email, username, password}) => async (dispatch) => {
    const res = await csrfFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({email, username, password})
    })

    console.log(res)

    if (res.ok){
        let data = await res.json();
        console.log("about to dispatch receiveuser")
        dispatch(receiveUser(data));
        dispatch(login({email, password}))
    }
}

const userReducer = (state = {}, action) => {
    let newState = {...state}
    switch (action.type){
        case RECEIVE_USER:
            return {...newState, user: action.user};
        default:
            return state;
    }
}

export default userReducer;