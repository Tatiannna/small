import csrfFetch from "./csrf";

const RECEIVE_STORIES = "/stories/RECEIVE_STORIES";
const RECEIVE_STORY = "/stories/RECEIVE_STORY";
const REMOVE_STORY = "/stories/REMOVE_STORY";

const receiveStories = (stories) => {
    return {
        type: RECEIVE_STORIES,
        stories
    }
}

const receiveStory = (story) => {
    return {
        type: RECEIVE_STORY,
        story
    }
}


const removeStory = (id) => {
    return {
        type: REMOVE_STORY,
        id
    }
}


export const getStories = () => async dispatch => {
    const res = await csrfFetch('/api/stories');

    let data = await res.json();
    if (res.ok){
        dispatch(receiveStories(data));
    }else{
        throw data;
    }
}

export const getStory = (id) => async dispatch => {
    const res =  await csrfFetch(`/api/stories/${id}`);

    let data = await res.json();
    if(res.ok){
       dispatch(receiveStory(data));
    }else{
        throw data;
    }
}

export const createStory = (story) => async dispatch => {
    const res =  await csrfFetch(`/api/stories/`, {
        method: "POST",
        body: JSON.stringify(story)
    });

    let data = await res.json();
    if(res.ok){
       dispatch(receiveStory(data));
    }else{
        throw data;
    }

}

export const updateStory= (story) => async dispatch => {
    const res =  await csrfFetch(`/api/stories/${story.id}`, {
        method: "PATCH",
        body: JSON.stringify(story)
    });

    let data = await res.json();
    if(res.ok){
       dispatch(receiveStory(story));
    }else{
        throw data;
    }
}

export const deleteStory = (id) => async dispatch => {
    const res =  await csrfFetch(`/api/stories/${id}`, {
        method: "DELETE",
    });

    let data = await res.json();
    if(res.ok){
       dispatch(removeStory(data));
    }else{
        throw data;
    }
}

const storyReducer = (state = {}, action) => {
    let newState = {...state};

    switch (action.type){
        case RECEIVE_STORIES:
            return {...newState, ...action.stories};
        case RECEIVE_STORY:
            newState[action.story.id] = action.story;
            return newState;
        case REMOVE_STORY:
            delete newState[action.id]
            return newState;
        default:
            return state;
    }
}

export default storyReducer;