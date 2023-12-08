import Header from "../Header/Header";
import StoryList from "../Story/StoryList";
import './Home.css'
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getStories } from "../../store/stories";

const Home = () => {
    const dispatch = useDispatch();
    const stories = useSelector(state => state.stories)

    useEffect( () => {
        dispatch(getStories());
    }, [dispatch])

    return(
        <>
            <Header />
            <Link to='/explore-topics'>Explore topics</Link>
            <StoryList stories={stories} />
        </>
    )
}
export default Home;


