import { useState } from "react";
import Header from "../Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css'; 
import { useEffect } from "react";
import {getTopics} from '../../store/topics';
import './WriteStory.css';
import {createStory} from '../../store/stories';
import { useNavigate } from "react-router-dom";



const WriteStory = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const topics = useSelector(state => state.topics);
    const currentUserId = useSelector(state => state.session.currentUserId);
    const username = useSelector(state => state.users[currentUserId].username);


    useEffect(() => {
        dispatch(getTopics());
    }, [dispatch])

    const [title, setTitle] = useState('');
    const [detail, setDetail] = useState('');
    const [body, setBody] = useState('');
    const [topic, setTopic] = useState(null);
    const [topicId, setTopicId] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();

        const story = {
            title,
            detail,
            body,
            topic_id: topicId,
            author_id: currentUserId
        }
        dispatch(createStory(story));
        navigate(`/${username}/${title}`)
    }

    return (
        <>
            <Header />
            <form onSubmit={handleSubmit}>
                <div className='story-form-container'>
                    <button className="publish">Publish</button>
                    <div className="select-story-topic">
                        <select
                            onChange={e => setTopicId(e.target.value)}>
                            <option>Select Topic</option>
                            {Object.values(topics).map(
                                mapTopic => 
                                <option 
                                    key={mapTopic.id} 
                                    value={mapTopic.id}>
                                    {mapTopic.name}
                                </option>)}
                        </select>
                    </div>
                    <div className="write-story-title">
                        <textarea
                            value={title}
                            cols="50"
                            rows="2"
                            placeholder="Title..."
                            onChange={e => setTitle(e.target.value)}>
                        </textarea>
                    </div>
                    
                    <div className="write-story-subtitle">
                        <textarea 
                            value={detail}
                            cols="50"
                            rows="3"
                            placeholder="Subtitle..."
                            onChange={e => setDetail(e.target.value)}>
                        </textarea>
                    </div>
                    
                    <div className="write-story-body">
                        <textarea 
                            value={body}
                            cols="50"
                            rows="25"
                            placeholder="Tell your Story..."
                            onChange={e => setBody(e.target.value)}>
                        </textarea>
                    </div>
                    
                    {/* <div style={{ width: 500, height: 300 }}>
                        <div ref={quillRef} />
                    </div> */}
                </div>
            </form>
        </>
    )
}

export default WriteStory;