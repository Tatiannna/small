import { useState } from "react";
import Header from "../Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {getTopics} from '../../store/topics';
import './WriteStory.css';
import {createStory} from '../../store/stories';
import { useNavigate } from "react-router-dom";
import Modal from "../Modal/Modal";



const WriteStory = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const topics = useSelector(state => state.topics);
    const currentUserId = useSelector(state => state.session.currentUserId);
    const username = useSelector(state => state.users[currentUserId]?.username);
    const [showModal, setShowModal] = useState(!currentUserId);

    useEffect(() => {
        dispatch(getTopics());
    }, [dispatch])

    const [title, setTitle] = useState('');
    const [detail, setDetail] = useState('');
    const [body, setBody] = useState('');
    const [topicId, setTopicId] = useState('');
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();

        const story = {
            title,
            detail,
            body,
            topic_id: topicId,
            author_id: currentUserId
        }
        dispatch(createStory(story)).then(() => navigate(`/${username}/${title}`)).catch( err => setErrors(err));
        //navigate(`/${username}/${title}`)
    }

    return (
        <>
            <Header />
            {showModal && (<Modal closeModal={() => setShowModal(false)} formType={'signup'} />)}
            <form onSubmit={handleSubmit}>
                <div className='story-form-container' onClick={()=> setShowModal(!currentUserId)}>
                    {/* {!disabled && <button className="publish" disabled>Publish</button>}
                    {disabled && <button className="publish">Publish</button>} */}
                    <button className="publish pointer">Publish</button>

                    <div className="div-errors">
                        {errors && <p className="story-error" >{Object.values(errors)[0]}</p>}
                        {errors && <p className="story-error" >{Object.values(errors)[1]}</p>}


                        {/* {errors['email'] && <p className="error" > {`email ${errors['email']}`}</p>}
                        {errors['username'] && <p className="error" > {`username ${errors['username']}`}</p>}
                        {errors['password'] && <p className="error" > {`password ${errors['password']}`}</p>}
                        {errors['errors'] && <p className="error" > {errors['errors']}</p>} */}
                    </div>

                    <div className="select-story-topic">
                        <select
                            className='select'
                            onChange={e => setTopicId(e.target.value)}>
                            <option selected disabled>Select Topic</option>
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

export default WriteStory;