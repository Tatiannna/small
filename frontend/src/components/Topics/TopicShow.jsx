import { useParams } from "react-router-dom";
import Header from "../Header/Header";
import StoryList from "../Story/StoryList";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import './TopicShow.css';

const TopicShow = () => {
    const {topicName} = useParams();

    const stories = useSelector(state => state.stories);
    const topics = useSelector(state => state.topics);

    const currentTopic = Object.values(topics).find( topic => topic.name === topicName);
    const topicStories = Object.values(stories).filter(story => story.topicId === currentTopic.id);

    return (
        <>
            <Header/>
            <h1 className="topic-title">{topicName}</h1>
            <p className="topic-subtitle">
                Topic 
                <span className="dot"> &#x2022; </span>  
                {topicStories.length} Stories
            </p>
            <StoryList stories={topicStories} />
            <Link to="/explore-topics" ><p className="explore-topics">Explore all Topics</p></Link>
        </>
    );
}

export default TopicShow;