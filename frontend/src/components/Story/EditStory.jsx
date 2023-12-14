import { useState } from "react";
import Header from "../Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css'; 
import { useEffect } from "react";
import {getTopics} from '../../store/topics';
import './EditStory.css';
import {updateStory} from '../../store/stories';
import { getStory } from "../../store/stories";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "../Modal/Modal";


const EditStory = (props) => {

    const {state} = useLocation();
    const story = state;
    console.log(story);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const topics = useSelector(state => state.topics);
    const currentUserId = useSelector(state => state.session.currentUserId);
    // const story = useSelector(state => state.stories[props.story.id])
    const username = useSelector(state => state.users[currentUserId]?.username);

    if (currentUserId !== story?.authorId){
        navigate('/');
    }
    // console.log();

    useEffect(() => {
        dispatch(getStory(story?.id))
        dispatch(getTopics());
    }, [dispatch, story?.id])

    const [title, setTitle] = useState(story?.title);
    const [detail, setDetail] = useState(story?.detail);
    const [body, setBody] = useState(story?.body);
    const [topic, setTopic] = useState('');
    const [topicId, setTopicId] = useState(story?.TopicId);
    const [showModal, setShowModal] = useState(!currentUserId);



    const handleSubmit = (e) => {
        e.preventDefault();

        const editedStory = {
            id: story.id,
            title,
            detail,
            body,
            topic_id: topicId,
            author_id: currentUserId
        }
        dispatch(updateStory(editedStory));
        navigate(`/${username}/${title}`);
    }

    return (
        <>
            <Header />
            {showModal && (<Modal closeModal={() => setShowModal(false)} formType={'signup'} />)}
            <form onSubmit={handleSubmit}>
                <div className='story-form-container' onClick={()=> setShowModal(!currentUserId)}>
                    <button className="publish">Publish</button>
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
                </div>
            </form>
        </>
    )
}

export default EditStory;