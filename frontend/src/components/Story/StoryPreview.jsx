import { useDispatch } from 'react-redux';
import './StoryPreview.css';
import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getTopic } from '../../store/topics';
import { useEffect } from 'react';
import { getUser } from '../../store/users';
import { useState } from 'react';


const StoryPreview = (props) => {

    const story = props.story;
    const storyTitle = story.title;

    const dispatch = useDispatch();

    useEffect( () => {
        dispatch(getTopic(story?.topicId));
        dispatch(getUser(story?.authorId))
    }, [dispatch, story?.topicId])

    const author = useSelector( state => state.users[story?.authorId]);
    const topic = useSelector(state => state.topics[story?.topicId]);
    const currentUserId = useSelector(state => state.session.currentUserId);
    const [showPreviewMenu, setShowPreviewMenu] = useState(false);
    const isCurrentUsersStory = (currentUserId == story.authorId);
    console.log('currentuserid: ', currentUserId, ' storyauthorid: ', story.authorId);
    
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

                {/* {showPreviewMenu && isCurrentUsersStory && <StoryMenu story={story}/>} */}

                {showPreviewMenu && isCurrentUsersStory &&
                    <div className="story-menu-modal">
                        <Link to={`/story/${storyTitle}/edit`} state={story}><p className="story-menu-edit">Edit</p></Link>
                        <p className='story-menu-delete' onClick={() => dispatch(deleteStory(props.story.id))}>Delete</p>
                    </div>}

                {showPreviewMenu && !isCurrentUsersStory && 
                    <div className="story-menu-modal">
                        <p>Report</p>
                    </div>
                }
            </p>
        </div>
    );
}

export default StoryPreview;