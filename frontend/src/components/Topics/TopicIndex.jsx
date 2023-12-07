import { useDispatch, useSelector } from "react-redux";
import Header from "../Header/Header";
import { useEffect } from "react";
import { getTopics } from "../../store/topics";
import { Link } from "react-router-dom";

const TopicIndex = () => {

    const topics = useSelector(state => state.topics);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTopics);
    }, []);


    return (
        <>
            <Header/>
            <h1>Explore Topics</h1>
            {Object.values(topics).map(topic => <Link to={`/tag/${topic.name}`}>{topic.name}</Link>)}
        </>
    );

}

export default TopicIndex;