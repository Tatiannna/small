import "./ResponseModal.css";
import { useState } from "react";
import ResponseItem from "./ResponseItem";
import { useDispatch, useSelector } from "react-redux";
import { createResponse, getResponses } from "../../store/responses";
import { useEffect } from "react";


const ResponseModal = (props) => {

    const dispatch = useDispatch();
    const [responseBody, setResponseBody] = useState('');

    const responses = useSelector(state => state.responses);
    const currentUserId = useSelector(state => state.session.currentUserId);
    const currentUser = useSelector(state => state.users[currentUserId]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const response = {
            body: responseBody,
            user_id: currentUserId,
            story_id: props.story.id
        }

        dispatch(createResponse(response));
        response = responses[response.id]
        setResponseBody('');
    }

    return(
        <div className="response-modal-overlay">
            <div className="response-modal">
                <h3>Responses({Object.values(responses).length})
                    <span id="x" onClick={() => props.closeModal()}> &#215; 
                    </span>
                </h3>
                
                <div className="write-response-container">
                    <p><span className="write-response-avatar">&#9824; </span> {currentUser?.username}</p>
                    <form onSubmit={handleSubmit}>
                        <textarea 
                            cols="39" 
                            rows="5"
                            placeholder="What are your thoughts?"
                            value={responseBody}
                            onChange={e => setResponseBody(e.target.value)}>
                        </textarea>
                        <button className="submit-response-button">Respond</button>
                    </form>
                </div>
                <div className="all-responses-container">
                    {Object.values(responses).map(response => <ResponseItem key={responses.id} response={response}/>)}
                </div>
                <div className='response-bottom'></div>
            </div>
        </div>
    )
}

export default ResponseModal;