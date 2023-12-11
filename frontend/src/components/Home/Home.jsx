import Header from "../Header/Header";
import StoryList from "../Story/StoryList";
import './Home.css'
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getStories } from "../../store/stories";
import StayCurious from "./StayCurious";

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
                    <h4>Recommended Topics</h4>
                    <button className='topic-button'>Photography</button>
                    <button className='topic-button'>Self Help</button>
                    <button className='topic-button'>Data Science</button>
                    <button className='topic-button'>BlockChain</button>
                    <button className='topic-button'>Movie Reviews</button>
                    <button className='topic-button'>Cryptocurrency</button>
                    <Link to="/explore-topics"><p className="see-more-topics">See More Topics</p></Link>
                </div>
            </div>
        </>
    )
}
export default Home;


