import './StoryPreview.css';
import {Link} from 'react-router-dom';

const StoryPreview = (props) => {
    const story = props.story;
    console.log(story);


    return (
        <div className="story-preview">
            <h4>{story.title}</h4>
            <p>{story.detail}</p>
            <p>{story.authorId}</p>
            <p>{story.topicId}</p>
        </div>
    );
}

export default StoryPreview;