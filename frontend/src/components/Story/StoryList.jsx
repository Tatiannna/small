import {useDispatch, useSelector} from 'react-redux';
import { getStories } from '../../store/stories';
import { useEffect } from 'react';
import StoryPreview from './StoryPreview'


const StoryList = () => {
    const dispatch = useDispatch();
    const stories = useSelector(state => state.stories)

    useEffect( () => {
        dispatch(getStories());
    }, [dispatch])

    //console.log((stories));

    return(
        <ul>
            {Object.values(stories).map(story => <StoryPreview key={story.id} story={story}/>)}
        </ul>
    );
}

export default StoryList;