import { useDispatch } from 'react-redux';
import './StoryPreview.css';
import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getTopic } from '../../store/topics';
import { useEffect } from 'react';
import { getUser } from '../../store/users';
import { useState } from 'react';
import StoryMenu from './StoryMenu';


const StoryPreview = (props) => {

    const story = props.story;
    const dispatch = useDispatch();

    useEffect( () => {
        dispatch(getTopic(story?.topicId));
        dispatch(getUser(story?.authorId))
    }, [dispatch, story?.topicId])

    const author = useSelector( state => state.users[story?.authorId]);
    const topic = useSelector(state => state.topics[story?.topicId]);
    const [showPreviewMenu, setShowPreviewMenu] = useState(false);
    
    return (
        <div className="story-preview">
            <Link to={`/${author?.username}`}>
                <p className="preview-author">
                    <span className="preview-avatar">&#9824; </span>
                    {author?.username}
                </p>
            </Link>
            <Link to={`/${author?.username}/${story?.title}`}>
                <p className="preview-title">{story?.title}</p>
                <p className="preview-detail">{story?.detail}</p>
            </Link>
            <p>
                <span className="preview-date">Dec 4</span>
                <span className="dot"> &#x2022; </span> 
                <span className="preview-time">5 min read </span>
                <span className="dot">&#x2022; </span> 
                <Link to={`/tag/${topic?.name}`}>
                    <span className="preview-topic">{topic?.name}</span>
                </Link>
                <span className="preview-menu" onClick={() => setShowPreviewMenu(!showPreviewMenu)}>...</span>
                {showPreviewMenu && <StoryMenu story={story}/>}
            </p>
        </div>
    );
}

export default StoryPreview;