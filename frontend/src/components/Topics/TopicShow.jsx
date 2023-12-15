import { useParams } from "react-router-dom";
import Header from "../Header/Header";
import StoryList from "../Story/StoryList";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import './TopicShow.css';
import { useDispatch } from 'react-redux';
import { getTopics } from "../../store/topics";
import { getStories } from "../../store/stories";
import { useEffect } from "react";


const TopicShow = () => {
    const {topicName} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTopics({topicName: topicName}));
    }, [dispatch])

    useEffect(() => {
        dispatch(getStories({topicName: topicName}));
    }, [dispatch])

    const topics = useSelector(state => state.topics);
    console.log(topics);
    const stories = useSelector(state => state.stories);
    console.log(stories);

    return (
        <>
            <Header/>
            <h1 className="topic-title">{topicName}</h1>
            <p className="topic-subtitle">
                Topic 
                <span className="dot"> &#x2022; </span>  
                {Object.values(stories).length} Stories
            </p>
            <div className='topic-show-container'>
                <StoryList stories={stories} />
                <Link to="/explore-topics" ><p className="explore-topics">Explore all Topics</p></Link>
            </div>
        </>
    );
}

export default TopicShow;