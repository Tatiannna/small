import { useState } from "react";
import Header from "../Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css'; 
import { useEffect } from "react";
import getTopics from '../../store/topics';
import './WriteStory.css';



const WriteStory = () => {

    const { quill, quillRef } = useQuill();

    const dispatch = useDispatch();
    
    const topics = useSelector(state => state.topics);

    // useEffect(() => {
    //     dispatch(getTopics());
    // }, [dispatch])

    const [title, setTitle] = useState('');
    const [detail, setDetail] = useState('');
    const [body, setBody] = useState('');
    const [topic, setTopic] = useState('');

    // useEffect(() => {
    //     if (quill) {
    //       quill.clipboard.dangerouslyPasteHTML('<p>Write Your Story</p>');
    //       quill.on('text-change', (delta, oldDelta, source) => {
    //         console.log('Text change!');
    //         console.log(quill.getText()); // Get text only
    //         // console.log(quill.getContents()); // Get delta contents
    //         // console.log(quill.root.innerHTML); // Get innerHTML using quill
    //         // console.log(quillRef.current.firstChild.innerHTML); // Get innerHTML using quillRef
    //         //setBody(quill.getText);
    //       });
    //     }
    // }, [quill]);

    console.log("hello test");

    const handleSubmit = (e) => {
        e.preventDefault();

    }

    return (
        <>
            <Header />

            <form onSubmit={handleSubmit}>
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
                            value={topic} 
                            onChange={e => setTopic(e.target.value)}>
                            <option>Select Topic</option>
                            {Object.values(topics).map(topic => <option key={topic.id}>{topic.name}</option>)}
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