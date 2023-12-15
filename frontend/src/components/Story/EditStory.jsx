import { useState } from "react";
import Header from "../Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {getTopics} from '../../store/topics';
import './WriteStory.css';
import {updateStory} from '../../store/stories';
import { getStory } from "../../store/stories";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "../Modal/Modal";


const EditStory = () => {

    const {state} = useLocation();
    const story = state;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const topics = useSelector(state => state.topics);
    const currentUserId = useSelector(state => state.session.currentUserId);
    const username = useSelector(state => state.users[currentUserId]?.username);

    if (currentUserId !== story?.authorId){
        navigate('/');
    }

    useEffect(() => {
        dispatch(getStory(story?.id))
        dispatch(getTopics());
    }, [dispatch, story?.id])

    const [title, setTitle] = useState(story?.title);
    const [detail, setDetail] = useState(story?.detail);
    const [body, setBody] = useState(story?.body);
    const [topicId, setTopicId] = useState(story?.topicId);
    const [showModal, setShowModal] = useState(!currentUserId);
    const [disabled, setDisabled] = useState(true);




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
                    {!disabled && <button className="publish" disabled>Publish</button>}
                    {disabled && <button className="publish">Publish</button>}

                    <div className="select-story-topic">
                        <select
                            className='select'
                            onChange={e => setTopicId(e.target.value)}>
                            <option
                                key={topicId} 
                                value={topicId}>
                            {topics[topicId]?.name}</option>
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
                            placeholder="Title"
                            onChange={e => setTitle(e.target.value)}>
                        </textarea>
                    </div>
                    
                    <div className="write-story-subtitle">
                        <textarea 
                            value={detail}
                            cols="50"
                            rows="3"
                            placeholder="Subtitle"
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

export default EditStory;