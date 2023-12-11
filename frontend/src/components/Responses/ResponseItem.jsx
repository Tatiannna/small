import { useSelector } from 'react-redux';
import './ResponseItem.css';
import { getUser } from '../../store/users';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ResponseMenu from './ResponseMenu';


const ResponseItem = (props) => {

    const response = props.response;

    const dispatch = useDispatch();
    const users = useSelector(state => state.users);

    const [showResponseMenu, setShowResponseMenu] = useState(false);

    useEffect(() => {
        dispatch(getUser(response.userId))
    },[dispatch])

    const commentAuthor = users[response.userId];

    const openResponseMenu = () => {
        
    }

    return (
        <div className="response-container">
            <p className="response-author">
                <span className="write-response-avatar">&#9824; </span>
                {commentAuthor?.username} 
                <span className="response-menu" onClick={() => setShowResponseMenu(!showResponseMenu)}>...</span>
            </p>
            <p className="response-date">{response?.createdAt.split('T')[0]}</p>
            <p className="response-body">{response?.body}</p>
            {showResponseMenu && < ResponseMenu response={response}/>}
        </div>
        
    );
}

export default ResponseItem;