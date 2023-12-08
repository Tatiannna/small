import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Header from "../Header/Header";
import StoryList from "../Story/StoryList";


const UserShow = (props) => {
    const {username} = useParams();


    const users = useSelector(state => state.users);
    const stories = useSelector(state => state.stories);


    const user = Object.values(users).find(user => user.username === username);
    //console.log(user.stories);

    const userStories = [];

    user.stories.forEach(storyId => userStories.push(stories[storyId]));

    console.log("stories: ", stories);
    return (
        <>
            <Header/>
            <h1>{username}</h1>
            <StoryList stories={userStories}/>
        </>
    );  
}

export default UserShow;