import { useParams } from 'react-router-dom';
import Header from '../Header/Header';

const StoryShow = () => {
    //const {username} = useParams();
    //const {storyTitle} = useParams();

    //const stories = Object.values(useSelector(state => state.stories));
    //const users = Object.values(useSelector(state => state.users));

    //const story = stories.find( story => story.title === storyTitle && username === users[story.author_id].username);
    //console.log(story);
    
    // const { story } = useParams();  

    return(
        <>
            <Header/>
            <h1>Story Show</h1>
        </>
    )
}
export default StoryShow;