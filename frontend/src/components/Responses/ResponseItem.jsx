import { useSelector } from 'react-redux';
import './ResponseItem.css';
import { getUser } from '../../store/users';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteResponse } from '../../store/responses';
import { updateResponse } from '../../store/responses';
import { Link } from 'react-router-dom';


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

    const responseAuthor = users[response.userId];
    const isUsersResponse = (currentUserId == response.userId);

    const handleSubmit = (e) => {
        e.preventDefault();

        // const updatedResponse = response;
        // updatedResponse.body = responseBody;
        response.body = responseBody;

        dispatch(updateResponse(response));
        setShowEditForm(false);
        setShowResponseMenu(false);
    }

    const date = (createdDateTime) => {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        let createdDate = createdDateTime.split('T')[0]
        let month = createdDate.split('-')[1];
        let day = createdDate.split('-')[2];

        if(day < 10){
            day = day.split('')[1];
        }

        return `${monthNames[month-1]} ${day}`;
    }


    return (
        <div className="response-container">
            
            {!showEditForm &&
                <div>
                    <p className="response-author">
                        <span className="write-response-avatar">&#9824; </span>
                        <Link to={`/user/${responseAuthor?.username}`}><p>{responseAuthor?.username}</p> </Link>
                        {currentUserId && <span className="response-menu pointer" onClick={() => setShowResponseMenu(!showResponseMenu)}>...</span>}
                    </p>
                    <p className="response-date">{date(response?.createdAt)}</p>
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

            {showResponseMenu && isUsersResponse &&
                <div className="response-menu-modal">
                    <p className="response-menu-edit"onClick={() => setShowEditForm(true)}>Edit</p>
                    <p className="response-menu-delete"onClick={() => dispatch(deleteResponse(response))}>Delete</p>
                </div>
            }

            {showResponseMenu && !isUsersResponse &&
                <div className="response-menu-modal">
                    <p className="response-menu-report">Report</p>               
                </div>
            }
        </div>
        
    );
}

export default ResponseItem;