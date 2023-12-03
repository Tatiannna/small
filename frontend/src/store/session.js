import csrfFetch from "./csrf";

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

    if (res.ok){
        let data = await res.json();
        dispatch(setUser(data))
    }else{
        throw res;
    }
}

export const logout = (userId) => async (dispatch) => {
    const res = await csrfFetch('/api/session', {
        method: "DELETE"
    })

    if (res.ok){
        dispatch(removeUser())
    }else{
        throw res;
    }
}


const sessionReducer = (state = {}, action) => {
    let newState = {...state}
    switch(action.type){
        case SET_USER:
            return {...newState, user: action.user}
        case REMOVE_USER:
            return {...newState, user: null}
        default:
            return state;
    }
}

export default sessionReducer;