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

const StoryShow = () => {
    
    const {username, storyTitle} = useParams();
    const dispatch = useDispatch();

    const stories = useSelector(state => state.stories);
    const responses = useSelector(state => state.responses);
    const story = Object.values(stories).find( story => story.title === storyTitle);

    const [showResponseModal, setShowResponseModal] = useState(false);

    useEffect(() => {
        dispatch(getStory(story.id));
        dispatch(clearResponses());
        dispatch(getResponses(story.id));

    }, [dispatch, story.id]);

    const topic = useSelector(state => state.topics[story.topicId]);
    const author = useSelector(state => state.users[story.authorId]);
    
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
                            <Link to=''> <p className="story-show-username">{author?.username}</p></Link>
                            <p className="story-show-info">5 min read <span className="dot">&#x2022; </span>Nov 14</p>
                        </div>
                    </div>
                    <div className="divider">
                        {showResponseModal && < ResponseModal story={story} closeModal={() => setShowResponseModal(false)} />}
                        <span className="responses" onClick={()=> setShowResponseModal(!showResponseModal)}>Responses</span>
                    </div>
                    <p className="story-show-body">{story?.body}</p>
                    <Link to=''><span className="story-show-topic">{topic?.name}</span></Link>
                </div>
            </div>
        </>
    )
}

export default StoryShow;