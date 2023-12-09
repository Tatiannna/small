import { useDispatch, useSelector } from "react-redux";
import Header from "../Header/Header";
import { useEffect } from "react";
import { getTopics } from "../../store/topics";
import { Link } from "react-router-dom";
import './TopicIndex.css';

const TopicIndex = () => {

    const topics = useSelector(state => state.topics);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTopics);
    }, []);

    return (
        <>
            <Header/>
            <h1 className='explore-topics'>Explore Topics</h1>
            <div className="topics-container">
                {Object.values(topics).map(topic => <Link to={`/tag/${topic.name}`}>{topic.name}</Link>)}
            </div>
        </>
    );
}

export default TopicIndex;