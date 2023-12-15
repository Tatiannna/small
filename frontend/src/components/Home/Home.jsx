import Header from "../Header/Header";
import StoryList from "../Story/StoryList";
import './Home.css'
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getStories } from "../../store/stories";
import StayCurious from "./StayCurious";
import RecommendedTopics from "./RecommendedTopics";
import { getTopics } from "../../store/topics";

const Home = () => {
    const dispatch = useDispatch();
    const topic = 'Software Engineering';

    const stories = useSelector(state => state.stories);
    const topics = useSelector(state => state.topics);

    useEffect( () => {
        dispatch(getStories({topicName: topic}));
        dispatch(getTopics({topicName: topic}));
    }, [dispatch, topic])

    return(
        <>
            <Header />
            <StayCurious />
            <div className="home-container">
                <div className="home-container-left">
                    <StoryList stories={stories} />
                </div>
                <div className="home-container-right">
                    <RecommendedTopics />
                </div>
            </div>
        </>
    )
}
export default Home;


