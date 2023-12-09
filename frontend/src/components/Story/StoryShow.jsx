import Header from '../Header/Header';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getStory } from '../../store/stories';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './StoryShow.css';
import { Link } from 'react-router-dom';

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
            <div class="story-container">
                <p class="story-show-title">{story?.title}</p>
                <p class="story-show-detail">{story?.detail}</p>
                <div class="story-show-info-container">
                    <div class="story-show-info-container-left">
                        <span class="story-show-avatar">&#9824; </span>
                    </div>
                    <div class="story-show-info-container-right">
                        <Link to=''> <p class="story-show-username">{author?.username}</p></Link>
                        <p class="story-show-info">5 min read <span className="dot">&#x2022; </span>Nov 14</p>
                    </div>
                </div>
                <div className="divider"></div>
                <p class="story-show-body">{story?.body}</p>
                <Link to=''><span class="story-show-topic">{topic?.name}</span></Link>
            </div>
        </>
    )
}
export default StoryShow;