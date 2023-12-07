import { useDispatch } from 'react-redux';
import './StoryPreview.css';
import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux';

const StoryPreview = (props) => {
    const story = props.story;

    const dispatch = useDispatch;
    const author = useSelector( state => state.user);
    const topic = useSelector(state => state.topics);

    //console.log(story);

    return (
        <div className="story-preview">
            <Link to=''>
                <h4>{story.title}</h4>
                <p>{story.detail}</p>
            </Link>
            <p>{story.authorId}</p>
            <p>{story.topicId}</p>
        </div>
    );
}

export default StoryPreview;