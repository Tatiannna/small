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
                <div>
                    <button className="publish">Publish</button>
                </div>
                <div className='story-form-container'>
                    <div>
                    <textarea 
                            className="write-story-title" 
                            value={title}
                            cols="15"
                            rows="1"
                            placeholder="Title..."
                            onChange={e => setTitle(e.target.value)}>
                        </textarea>
                    </div>
                    
                    <div>
                        <textarea 
                            className="write-story-subtitle" 
                            value={detail}
                            cols="50"
                            rows="4"
                            placeholder="Subtitle..."
                            onChange={e => setDetail(e.target.value)}>
                        </textarea>
                    </div>
                    
                    <div>
                        <textarea 
                            className="write-story-body" 
                            value={body}
                            cols="75"
                            rows="25"
                            placeholder="Tell your Story..."
                            onChange={e => setBody(e.target.value)}>
                        </textarea>
                    </div>

                    <div>
                        <select 
                            className="select-story-topic"
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
                    
                    {/* <div style={{ width: 500, height: 300 }}>
                        <div ref={quillRef} />
                    </div> */}
                </div>
            </form>
        </>
    )
}

export default WriteStory;