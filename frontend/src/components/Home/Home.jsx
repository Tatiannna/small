import Header from "../Header/Header";
import StoryList from "../Story/StoryList";
import './Home.css'
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getStories } from "../../store/stories";
import StayCurious from "./StayCurious";
import RecommendedTopics from "./RecommendedTopics";

const Home = () => {
    const dispatch = useDispatch();
    const stories = useSelector(state => state.stories)

    useEffect( () => {
        dispatch(getStories());
    }, [dispatch])

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


