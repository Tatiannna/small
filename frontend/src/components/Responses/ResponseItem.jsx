import { useSelector } from 'react-redux';
import './ResponseItem.css';
import { getUser } from '../../store/users';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';


const ResponseItem = (props) => {

    const response = props.response;

    const dispatch = useDispatch();
    const users = useSelector(state => state.users);

    useEffect(() => {
        dispatch(getUser(response.userId))
    },[dispatch])

    const commentAuthor = users[response.userId];

    return (
        <div className="response-container">
            <p className="response-author"><span className="write-response-avatar">&#9824; </span>{commentAuthor?.username}</p>
            <p className="response-date">{response?.createdAt.split('T')[0]}</p>
            <p className="response-body">{response?.body}</p>
        </div>
        
    );
}

export default ResponseItem;