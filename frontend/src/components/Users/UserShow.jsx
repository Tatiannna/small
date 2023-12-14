import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Header from "../Header/Header";
import StoryList from "../Story/StoryList";
import './UserShow.css';
import { useEffect } from "react";
import { getStories } from "../../store/stories";
import { useState } from "react";


const UserShow = (props) => {
    const {username} = useParams();
    const dispatch = useDispatch();

    const currentUserId = useSelector(state => state.session.currentUserId);
    const users = useSelector(state => state.users);
    const stories = useSelector(state => state.stories);
    const user = Object.values(users).find(user => user.username === username);
    const [userStories, setUserStories] = useState({});

    
    useEffect(() => {
        let temp = {};
        Object.values(stories).forEach( story => {
            if (currentUserId === story.authorId) temp[story.id] = story;
        });
        setUserStories(temp);

    },[stories])

    useEffect( () => {
        dispatch(getStories(username));
    }, [dispatch])
   
    return (
        <>
            <Header/>
            <div className="username">
                <h1>
                    <span className="user-show-avatar">&#9824; </span>
                    {username}
                </h1>
            </div>
            <div className='user-show-body'>
                <h3 className='stories-heading'>Stories</h3>
                {<StoryList stories={userStories}/>}
            </div>
        </>
    );  
}

export default UserShow;