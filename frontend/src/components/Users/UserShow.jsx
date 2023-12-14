import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Header from "../Header/Header";
import StoryList from "../Story/StoryList";
import './UserShow.css';
import { useEffect } from "react";
import { getStories } from "../../store/stories";
import { useState } from "react";


const UserShow = () => {
    const {username} = useParams();
    const dispatch = useDispatch();

    const currentUserId = useSelector(state => state.session.currentUserId);
    const stories = useSelector(state => state.stories);
    const users = useSelector(state => state.users);
    const [userStories, setUserStories] = useState({});

    
    useEffect(() => {
        let temp = {};
        Object.values(stories).forEach( story => {
            if (username === users[story.authorId]?.username) temp[story.id] = story;
        });
        setUserStories(temp);

    },[stories, currentUserId, username, users])

    useEffect( () => {
        dispatch(getStories(username));
    }, [dispatch, username])
   
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