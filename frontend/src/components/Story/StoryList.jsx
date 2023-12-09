import StoryPreview from './StoryPreview';

const StoryList = ({stories}) => {

    return(
        <>
             <ul>
                {Object.values(stories).map(story => <StoryPreview key={story.id} story={story}/>)}
            </ul>
        </>
        
    );
}

export default StoryList;