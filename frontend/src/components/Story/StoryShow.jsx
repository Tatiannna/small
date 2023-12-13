import Header from '../Header/Header';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getStory } from '../../store/stories';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './StoryShow.css';
import { Link } from 'react-router-dom';
import { clearResponses, getResponses } from '../../store/responses';
import ResponseModal from '../Responses/ResponseModal';
import { useState } from 'react';
import { FaRegMessage } from "react-icons/fa6";


const StoryShow = () => {
    
    const {username, storyTitle} = useParams();
    const dispatch = useDispatch();

    const stories = useSelector(state => state.stories);
    const responses = useSelector(state => state.responses);
    const story = Object.values(stories).find( story => story.title === storyTitle);
    const [showPreviewMenu, setShowPreviewMenu] = useState(false);
    const currentUserId = useSelector(state => state.session.currentUserId)


    const [showResponseModal, setShowResponseModal] = useState(false);
    const isCurrentUsersStory = (currentUserId == story.authorId);


    useEffect(() => {
        dispatch(getStory(story?.id));
        dispatch(clearResponses());
        dispatch(getResponses(story?.id));

    }, [dispatch, story?.id]);

    const topic = useSelector(state => state.topics[story?.topicId]);
    const author = useSelector(state => state.users[story?.authorId]);
    const numResponses = Object.values(responses).length;
    
    return(
        <>
            <Header/>
            <div className="story-container">
                <div className='story-inner-container'>
                    <p className="story-show-title">{story?.title}</p>
                    <p className="story-show-detail">{story?.detail}</p>
                    <div className="story-show-info-container">
                        <div className="story-show-info-container-left">
                            <span className="story-show-avatar">&#9824; </span>
                        </div>
                        <div className="story-show-info-container-right">
                            <Link to={`/${author?.username}`}> <p className="story-show-username">{author?.username}</p></Link>
                            <p className="story-show-info">5 min read <span className="dot">&#x2022; </span>Nov 14</p>
                        </div>
                    </div>
                    <div className="divider">
                        {showResponseModal && < ResponseModal story={story} closeModal={() => setShowResponseModal(false)} />}
                        <p>
                            <span 
                                className="responses" 
                                onClick={()=> setShowResponseModal(!showResponseModal)}>
                                <FaRegMessage /> {numResponses > 0 && numResponses}
                            </span>
                            {currentUserId && <span className="preview-menu" onClick={() => setShowPreviewMenu(!showPreviewMenu)}>...</span>}

                        </p>

                        {showPreviewMenu && isCurrentUsersStory &&
                            <div className="story-menu-modal">
                                <Link to={`/story/${storyTitle}/edit`} state={story}><p className="story-menu-edit">Edit</p></Link>
                                <p className='story-menu-delete' onClick={() => dispatch(deleteStory(props.story.id))}>Delete</p>
                            </div>
                        }
                        {showPreviewMenu && !isCurrentUsersStory && 
                            <div className="story-menu-modal">
                                <p>Report</p>
                            </div>
                        }
                    </div>
                    <p className="story-show-body">{story?.body}</p>
                    <Link to={`/tag/${topic?.name}`}><span className="story-show-topic">{topic?.name}</span></Link>
                </div>
            </div>
        </>
    )
}

export default StoryShow;