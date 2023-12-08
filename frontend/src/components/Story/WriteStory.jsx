import { useState } from "react";
import Header from "../Header/Header";
import { useDispatch } from "react-redux";


const handleSubmit = (e) => {
    e.preventDefault();
}

const WriteStory = () => {

    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [detail, setDetail] = useState('');
    const [body, setBody] = useState('');
    const [topic, setTopic] = useState('');


    return (
        <>
            <Header />
            <h1> Write Story</h1>

            <form onSubmit={handleSubmit}>
                <input type="text"
                    placeholder="Title"
                    className="write-story-title" 
                    value={title} 
                    onChange={e => setTitle(e.target.value)}/>
                <select value={topic} onChange={e => setTopic(e.target.value)}>
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                </select>
                <textarea className="write-story-input" value={detail} onChange={e => setDetail(e.target.value)}></textarea>
                <textarea className="write-story-input" value={body} onChange={e => setBody(e.target.value)}></textarea>
            </form>
        </>
    )
}

export default WriteStory;