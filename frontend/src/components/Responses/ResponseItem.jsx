import { useSelector } from 'react-redux';
import './ResponseItem.css';
import { getUser } from '../../store/users';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteResponse } from '../../store/responses';
import { updateResponse } from '../../store/responses';


const ResponseItem = (props) => {

    const response = props.response;

    const dispatch = useDispatch();
    const users = useSelector(state => state.users);
    const currentUserId = useSelector(state => state.session.currentUserId)

    const [showResponseMenu, setShowResponseMenu] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [responseBody, setResponseBody] = useState(response?.body);

    useEffect(() => {
        dispatch(getUser(response.userId));
    },[dispatch, response.userId])

    const commentAuthor = users[response.userId];


    const handleSubmit = (e) => {
        e.preventDefault();

        // const updatedResponse = response;
        // updatedResponse.body = responseBody;
        response.body = responseBody;

        dispatch(updateResponse(response));
        setShowEditForm(false);
        setShowResponseMenu(false);

        console.log(response);
    }

    return (
        <div className="response-container">
            
            {!showEditForm &&
                <div>
                    <p className="response-author">
                        <span className="write-response-avatar">&#9824; </span>
                        {commentAuthor?.username} 
                        <span className="response-menu" onClick={() => setShowResponseMenu(!showResponseMenu)}>...</span>
                    </p>
                    <p className="response-date">{response?.createdAt.split('T')[0]}</p>
                    <p className="response-body">{response?.body}</p>
                </div>
            }

            {showEditForm &&
                <div className="write-response-container">
                    <form onSubmit={handleSubmit}>
                        <textarea 
                            cols="39" 
                            rows="5"
                            value={responseBody}
                            onChange={e => setResponseBody(e.target.value)}>
                        </textarea>
                            <button className="edit-response-button">Update</button>
                            <button onClick={() => setShowEditForm(false)} type="button" className="cancel-edit-button">Cancel</button>
                    </form>
                </div>
            }

            {/* {showResponseMenu && < ResponseMenu response={response}/>} */}
            {showResponseMenu && 
                <div className="response-menu-modal">
                    <p className="response-menu-edit"onClick={() => setShowEditForm(true)}>Edit</p>
                    <p className="response-menu-delete"onClick={() => dispatch(deleteResponse(response))}>Delete</p>
                </div>
            }
        </div>
        
    );
}

export default ResponseItem;