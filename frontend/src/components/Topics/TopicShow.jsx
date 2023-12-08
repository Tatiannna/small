import { useParams } from "react-router-dom";
import Header from "../Header/Header";
import StoryList from "../Story/StoryList";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


const TopicShow = () => {
    const {topicName} = useParams();

    const stories = useSelector(state => state.stories);
    const topics = useSelector(state => state.topics);

    const currentTopic = Object.values(topics).find( topic => topic.name === topicName);
    const topicStories = Object.values(stories).filter(story => story.topicId === currentTopic.id);
    console.log("topicstories: ", topicStories);

    return (
        <>
            <Header/>
            <p>Topic Show</p>
            <h1>{topicName}</h1>
            <StoryList stories={topicStories} />
            <Link to="/explore-topics">See all Topics</Link>
        </>
    );

}

export default TopicShow;