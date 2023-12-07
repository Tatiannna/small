import { useDispatch } from 'react-redux';
import './StoryPreview.css';
import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getTopic } from '../../store/topics';
import { useEffect } from 'react';
import { getUser } from '../../store/users';


const StoryPreview = (props) => {

    const story = props.story;
    const dispatch = useDispatch();

    useEffect( () => {
        dispatch(getTopic(story.topicId));
        dispatch(getUser(story.authorId))
    }, [dispatch, story.topicId])

    const author = useSelector( state => state.users[story.authorId]);
    const topic = useSelector(state => state.topics[story.topicId]);

    return (
        <div className="story-preview">
            <Link to=''>
                <h4>{story.title}</h4>
                <p>{story.detail}</p>
            </Link>
            <p>{author?.username}</p>
            <p>{topic?.name}</p>
        </div>
    );
}

export default StoryPreview;