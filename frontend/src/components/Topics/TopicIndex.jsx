import { useDispatch, useSelector } from "react-redux";
import Header from "../Header/Header";
import { useEffect } from "react";
import { getTopics } from "../../store/topics";
import { Link } from "react-router-dom";
import './TopicIndex.css';

const TopicIndex = () => {

    const topicObjects = useSelector(state => state.topics);
    const topics = Object.values(topicObjects);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTopics());
    }, [dispatch]);

    const col1 = [];
    const col2 = [];
    const col3 = [];

    const createTopicColumns = () => {
        const topicColumnMax = Math.floor(Object.values(topics).length / 3);

        for(let i = 0; i < topicColumnMax; i++){
            col1.push(topics[i])
        }

        for(let i = topicColumnMax; i < 2*topicColumnMax; i++){
            col2.push(topics[i])
        }

        for(let i = 2*topicColumnMax; i < topics.length; i++){
            col3.push(topics[i])
        }
    }

    createTopicColumns();

    return (
        <>
            <Header/>
            <h1 className='explore-topics'>Explore Topics</h1>
            <div className="topics-container">
                <div className='topic-col-1'>
                    {col1.map(topic => <Link to={`/tag/${topic.name}`} key={`topic.id`}><p>{topic.name}</p></Link>)}
                </div>
                <div className='topic-col-3'>
                    {col2.map(topic => <Link to={`/tag/${topic.name}`} key={`topic.id`}><p>{topic.name}</p></Link>)}
                </div>
                <div className='topic-col-3'>
                    {col3.map(topic => <Link to={`/tag/${topic.name}`} key={`topic.id`}><p>{topic.name}</p></Link>)}
                </div>
            </div>
        </>
    );
}

export default TopicIndex;