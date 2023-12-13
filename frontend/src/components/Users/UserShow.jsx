import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Header from "../Header/Header";
import StoryList from "../Story/StoryList";
import './UserShow.css'


const UserShow = (props) => {
    const {username} = useParams();

    const users = useSelector(state => state.users);
    const stories = useSelector(state => state.stories);
    const user = Object.values(users).find(user => user.username === username);


    const userStories = [];
    if (user.stories && user.stories.length > 0){
        user.stories.forEach(storyId => {
            userStories.push(stories[storyId])
        });
    }
   
    return (
        <>
            <Header/>
            <div className="username">
                <h1>
                    <span className="user-show-avatar">&#9824; </span>
                    {username}
                </h1>
            </div>
            { userStories.length > 0 && <StoryList stories={userStories}/>}
        </>
    );  
}

export default UserShow;