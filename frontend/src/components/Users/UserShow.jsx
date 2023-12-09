import { useSelector } from "react-redux";
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
    user.stories.forEach(storyId => userStories.push(stories[storyId]));

    return (
        <>
            <Header/>
            <div className="username">
                <h1>
                    <span class="user-show-avatar">&#9824; </span>
                    {username}
                </h1>
            </div>
            <StoryList stories={userStories}/>
        </>
    );  
}

export default UserShow;