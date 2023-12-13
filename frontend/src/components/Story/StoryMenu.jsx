import { useDispatch, useSelector } from 'react-redux';
import './StoryMenu.css';
import { deleteStory, updateStory} from '../../store/stories';
import { Link } from 'react-router-dom';


const StoryMenu = (props) => {

    const story = props.story;
    const dispatch = useDispatch();
    const storyTitle = story.title;
    

    const currentUserId = useSelector(state => state.session.currentUserId);
    const username = useSelector(state => state.users[currentUserId].username);

    return (
             <div className="story-menu-modal">
                <Link to={`/story/${storyTitle}/edit`} state={story}><p className="story-menu-edit">Edit</p></Link>
                <p className='story-menu-delete' onClick={() => dispatch(deleteStory(props.story.id))}>Delete</p>
            </div>
    );
}

export default StoryMenu;