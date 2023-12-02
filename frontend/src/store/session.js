import csrfFetch from "./csrf";

const RECEIVE_SESSION = '/session/RECEIVE_SESSION';
const REMOVE_SESSION= '/session/REMOVE_SESSION';



const receiveSession = user => {
    type: RECEIVE_SESSION,
    user
}

const removeSession = userId => {
    type: RECEIVE_SESSION,
    userId
}




export const createSession = (user) => async (dispatch) => {
    const res = await csrfFetch('/api/session', {
        method: "POST",
        body: JSON.stringify(user)
    })

    if (res.ok){
        let data = await res.json();
        dispatch(receiveSession(user))
    }else{
        console.log("Something went wrong")
    }
}

export const deleteSession = (userId) => async (dispatch) => {
    const res = await csrfFetch('/api/session', {
        method: "DELETE"
    })

    if (res.ok){
        // let data = await res.json();
        dispatch(deleteSession(userId))
    }else{
        throw res;
    }
}




const sessionReducer = (state = {}, action) => {
    let newState = {...state}
    switch(action.type){
        case RECEIVE_SESSION:
            newState[action.user.id] = action.user;
            return newState;
        case REMOVE_SESSION:
            delete newState[action.userId]
            return newState;
        default:
            return state;
    }
}

export default sessionReducer;