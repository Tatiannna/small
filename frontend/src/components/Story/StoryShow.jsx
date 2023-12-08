import Header from '../Header/Header';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getStory } from '../../store/stories';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const StoryShow = () => {
    
    const {username, storyTitle} = useParams();
    const dispatch = useDispatch();

    const stories = useSelector(state => state.stories);
    const story = Object.values(stories).find( story => story.title === storyTitle);

    useEffect(() => {
        dispatch(getStory(story.id))
    }, [dispatch, story.id]);

    const topic = useSelector(state => state.topics[story.topicId]);
    const author = useSelector(state => state.users[story.authorId]);
    
    return(
        <>
            <Header/>
            <h2>{story?.title}</h2>
            <h4>{story?.detail}</h4>
            <h5>{author?.username}</h5>
            <p>{story?.body}</p>
            <p>{topic?.name}</p>
        </>
    )
}
export default StoryShow;