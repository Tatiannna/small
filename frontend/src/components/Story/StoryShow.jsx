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
import { PiHandsClapping } from "react-icons/pi";
import { deleteStory } from '../../store/stories';
import { createClap, getClaps, removeClaps } from '../../store/claps';
import { PiHandsClappingFill } from "react-icons/pi";
import Modal from '../Modal/Modal';

const StoryShow = () => {
    
    const {storyTitle} = useParams();
    const dispatch = useDispatch();

    const stories = useSelector(state => state.stories);
    const story = Object.values(stories).find( story => story.title === storyTitle);
    const topic = useSelector(state => state.topics[story?.topicId]);
    const author = useSelector(state => state.users[story?.authorId]);

    const responses = useSelector(state => state.responses);
    const numResponses = Object.values(responses).length;

    const users = useSelector(state => state.users);
    const currentUserId = useSelector(state => state.session.currentUserId);
    const currentUser = users[currentUserId];
    const isCurrentUsersStory = (currentUserId == story?.authorId);

    const [showPreviewMenu, setShowPreviewMenu] = useState(false);
    const [showResponseModal, setShowResponseModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);


    const claps = useSelector(state => state.claps);
    const [numClaps, incrementNumClaps] = useState(Object.values(claps).length);
    const [iconClassName, setIconClassName] = useState('clapped-false');
    
    useEffect(() => {
        dispatch(getStory(story?.id));
        dispatch(clearResponses());
        dispatch(removeClaps());
        dispatch(getClaps(story?.id));
        dispatch(getResponses(story?.id));

    }, [dispatch, story?.id]);

    useEffect(() => {
        dispatch(getClaps(story.id));
    }, [dispatch, numClaps])


    const currentUserHasClapped = () => {
        if(currentUserId){
            const hasClapped = currentUser.clappedStories.includes(story.id);
            if(hasClapped){
                setIconClassName('clapped-true');
                return true;
            }
            return false;
        }else{
            return false;
        }  
    }

    useEffect( () => {
        currentUserHasClapped();
    }, [])

    const clap = (e) => {
        
        if(!currentUserId){
            setShowLoginModal('true');
        }
        else{
            if (iconClassName === 'clapped-false'){
                setIconClassName('clapped-true');
            }

            const clap = {
                user_id: currentUserId,
                story_id: story.id
            }
            dispatch(createClap(clap));
            incrementNumClaps((prevValue) => prevValue + 1);
        }
    }
    
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
                            <Link to={`/user/${author?.username}`}> <p className="story-show-username">{author?.username}</p></Link>
                            <p className="story-show-info">5 min read <span className="dot">&#x2022; </span>Nov 14</p>
                        </div>
                    </div>
                    <div className="divider">
                        {showResponseModal && < ResponseModal story={story} closeModal={() => setShowResponseModal(false)} />}
                        {showLoginModal && < Modal formType={'login'} closeModal={() => setShowLoginModal(false)}/>}

                        <p>
                            <span 
                                className="responses" 
                                onClick={()=> setShowResponseModal(!showResponseModal)}>
                                <FaRegMessage /> {numResponses > 0 && numResponses}
                            </span>
                            <span
                                className={iconClassName}
                                onClick={clap}>
                                {<PiHandsClappingFill />}
                            </span>
                            <span>
                                {numClaps > 0 && numClaps}
                            </span>
                            {currentUserId && <span className="preview-menu" onClick={() => setShowPreviewMenu(!showPreviewMenu)}>...</span>}
                        </p>

                        {showPreviewMenu && isCurrentUsersStory &&
                            <div className="story-menu-modal">
                                <Link to={`/story/${storyTitle}/edit`} state={story}><p className="story-menu-edit">Edit</p></Link>
                                <p className='story-menu-delete' onClick={() => dispatch(deleteStory(story?.id))}>Delete</p>
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